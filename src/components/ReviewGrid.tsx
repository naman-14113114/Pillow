"use client";

import { BadgeCheck, ImageIcon, X } from "lucide-react";
import { useMemo, useState } from "react";
import { reviews, siteConfig, type Review } from "@/data/store";
import { StarRating } from "@/components/StarRating";

export function ReviewGrid({ compact = false }: { compact?: boolean }) {
  const [rating, setRating] = useState(0);
  const [mediaOnly, setMediaOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<Review | null>(null);
  const pageSize = compact ? 6 : 8;

  const filtered = useMemo(
    () =>
      reviews.filter(
        (review) =>
          (rating === 0 || review.rating === rating) &&
          (!mediaOnly || Boolean(review.image)),
      ),
    [mediaOnly, rating],
  );
  const visible = filtered.slice(0, page * pageSize);

  return (
    <section className="reviews-module" aria-labelledby="reviews-heading">
      <div className="reviews-summary">
        <div>
          <span>Customer feedback</span>
          <h2 id="reviews-heading">Trusted by side sleepers</h2>
        </div>
        <div className="reviews-score">
          <strong>{siteConfig.reviewRating}</strong>
          <div>
            <StarRating rating={siteConfig.reviewRating} />
            <span>{siteConfig.reviewCount.toLocaleString("en-GB")} reviews</span>
          </div>
        </div>
      </div>
      <div className="reviews-toolbar">
        <div className="segmented-control" aria-label="Filter by rating">
          {[0, 5, 4].map((value) => (
            <button
              key={value}
              type="button"
              className={rating === value ? "active" : ""}
              onClick={() => {
                setRating(value);
                setPage(1);
              }}
            >
              {value === 0 ? "All reviews" : `${value} stars`}
            </button>
          ))}
        </div>
        <label className="media-toggle">
          <input
            type="checkbox"
            checked={mediaOnly}
            onChange={(event) => {
              setMediaOnly(event.target.checked);
              setPage(1);
            }}
          />
          <ImageIcon aria-hidden="true" /> Media only
        </label>
      </div>
      <div className="review-grid">
        {visible.map((review) => (
          <article className="review-card" key={review.id}>
            {review.image && (
              <button
                type="button"
                className="review-media"
                onClick={() => setActive(review)}
                aria-label={`Open media from ${review.name}`}
              >
                <img src={review.image} alt="" width="520" height="620" />
              </button>
            )}
            <div className="review-copy">
              <StarRating rating={review.rating} />
              <h3>{review.title}</h3>
              <p>{review.body}</p>
              <div>
                <strong>{review.name}</strong>
                <span>
                  <BadgeCheck aria-hidden="true" />
                  Licensed product review
                </span>
              </div>
              <time>{review.date}</time>
            </div>
          </article>
        ))}
      </div>
      {!visible.length && (
        <div className="reviews-empty">
          <strong>No reviews match this filter.</strong>
          <span>Choose another rating or clear the media filter.</span>
        </div>
      )}
      {visible.length < filtered.length && (
        <button
          className="secondary-button reviews-more"
          type="button"
          onClick={() => setPage((current) => current + 1)}
        >
          Show more reviews
        </button>
      )}
      {active && (
        <div className="media-lightbox" role="dialog" aria-modal="true">
          <button
            className="icon-button"
            type="button"
            aria-label="Close media"
            onClick={() => setActive(null)}
          >
            <X />
          </button>
          <img src={active.image} alt="" width="900" height="1000" />
          <div>
            <StarRating rating={active.rating} />
            <strong>{active.name}</strong>
            <p>{active.body}</p>
          </div>
        </div>
      )}
    </section>
  );
}
