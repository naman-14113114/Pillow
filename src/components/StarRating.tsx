import { Star } from "lucide-react";

export function StarRating({
  rating = 5,
  label,
}: {
  rating?: number;
  label?: string;
}) {
  return (
    <span className="stars" aria-label={label || `${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          fill={index + 1 <= Math.round(rating) ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}
