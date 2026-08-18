"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { StarRating } from "@/components/StarRating";
import type { Review } from "@/data/reviews";

export function ReviewMedia({
  review,
  alt = "",
}: {
  review: Review;
  alt?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  if (!review.image) return null;

  const isPlayableVideo =
    review.mediaType === "video" && Boolean(review.videoEmbedUrl);

  return (
    <>
      <button
        type="button"
        className="review-media"
        onClick={() => setOpen(true)}
        aria-label={`${isPlayableVideo ? "Play video" : "Open media"} from ${review.name}`}
      >
        <img src={review.image} alt={alt} width="520" height="620" />
      </button>
      {open ? (
        <div
          className="media-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Review media from ${review.name}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <button
            className="icon-button"
            type="button"
            aria-label="Close media"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
          {isPlayableVideo ? (
            <iframe
              className="review-video-player"
              src={review.videoEmbedUrl}
              title={`Video review from ${review.name}`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img src={review.image} alt={alt} width="900" height="1000" />
          )}
          <div className="media-lightbox-copy">
            <StarRating rating={review.rating} />
            <strong>{review.name}</strong>
            <p>{review.body}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
