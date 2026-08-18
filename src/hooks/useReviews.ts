"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Review, ReviewsResponse } from "@/data/reviews";

type ReviewQuery = {
  limit: number;
  rating?: number;
  mediaOnly?: boolean;
};

export function useReviews({
  limit,
  rating = 0,
  mediaOnly = false,
}: ReviewQuery) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [totalFiltered, setTotalFiltered] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const search = useMemo(() => {
    const params = new URLSearchParams({
      page: "1",
      limit: String(limit),
    });
    if (rating) params.set("rating", String(rating));
    if (mediaOnly) params.set("media", "true");
    return params;
  }, [limit, mediaOnly, rating]);

  useEffect(() => {
    const controller = new AbortController();
    queueMicrotask(() => {
      if (controller.signal.aborted) return;
      setLoading(true);
      setError(null);
      setPage(1);
    });

    fetch(`/api/reviews?${search.toString()}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Reviews are temporarily unavailable.");
        return (await response.json()) as ReviewsResponse;
      })
      .then((data) => {
        setReviews(data.reviews);
        setTotalFiltered(data.totalFiltered);
        setHasMore(data.hasMore);
      })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setReviews([]);
        setHasMore(false);
        setError(
          reason instanceof Error
            ? reason.message
            : "Reviews are temporarily unavailable.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [search]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    const params = new URLSearchParams(search);
    params.set("page", String(nextPage));
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/reviews?${params.toString()}`);
      if (!response.ok) throw new Error("Reviews are temporarily unavailable.");
      const data = (await response.json()) as ReviewsResponse;
      setReviews((current) => {
        const existing = new Set(current.map((review) => review.id));
        return [
          ...current,
          ...data.reviews.filter((review) => !existing.has(review.id)),
        ];
      });
      setPage(nextPage);
      setTotalFiltered(data.totalFiltered);
      setHasMore(data.hasMore);
    } catch (reason: unknown) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Reviews are temporarily unavailable.",
      );
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, page, search]);

  return {
    reviews,
    totalFiltered,
    hasMore,
    loading,
    error,
    loadMore,
  };
}
