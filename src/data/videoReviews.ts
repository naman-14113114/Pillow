export interface ReviewVideo {
  id: string;
  poster: string;
  src: string; // 4-5s lightweight preview clip
  fullSrc: string; // Full high-res review video
  title?: string;
  author?: string;
  rating?: number;
}

export const reviewVideos: ReviewVideo[] = Array.from({ length: 30 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    id: `pillow-review-${num}`,
    poster: `/videos/pillow-reviews/posters/pillow-review-${num}-poster.jpg`,
    src: `/videos/pillow-reviews/clips/pillow-review-${num}-clip.mp4`,
    fullSrc: `/videos/pillow-reviews/pillow-review-${num}.mp4`,
    title: `Customer Review #${i + 1}`,
    rating: 5,
  };
});
