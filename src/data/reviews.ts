export type Review = {
  id: string;
  sourceReviewId: string;
  name: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  image?: string;
  mediaType?: "image" | "video";
  videoEmbedUrl?: string;
  source: "licensed-product-review";
  sourceVerified: boolean;
};

export type ReviewsResponse = {
  rating: number;
  aggregateTotal: number;
  source: "licensed-product-review";
  page: number;
  limit: number;
  totalImported: number;
  totalFiltered: number;
  hasMore: boolean;
  reviews: Review[];
};
