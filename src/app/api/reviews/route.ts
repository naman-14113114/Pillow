import { NextRequest, NextResponse } from "next/server";
import { reviews, siteConfig } from "@/data/store";

export async function GET(request: NextRequest) {
  const page = Math.max(
    1,
    Number.parseInt(request.nextUrl.searchParams.get("page") || "1", 10),
  );
  const limit = Math.min(
    20,
    Math.max(
      1,
      Number.parseInt(request.nextUrl.searchParams.get("limit") || "8", 10),
    ),
  );
  const rating = Number.parseInt(
    request.nextUrl.searchParams.get("rating") || "0",
    10,
  );
  const mediaOnly = request.nextUrl.searchParams.get("media") === "true";
  const filtered = reviews.filter(
    (review) =>
      (!rating || review.rating === rating) &&
      (!mediaOnly || Boolean(review.image)),
  );
  const start = (page - 1) * limit;

  return NextResponse.json({
    rating: siteConfig.reviewRating,
    aggregateTotal: siteConfig.reviewCount,
    source: "licensed-product-review",
    page,
    limit,
    totalImported: filtered.length,
    reviews: filtered.slice(start, start + limit),
  });
}
