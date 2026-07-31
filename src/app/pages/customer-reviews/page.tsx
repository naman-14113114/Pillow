import type { Metadata } from "next";
import { ReviewGrid } from "@/components/ReviewGrid";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read licensed customer feedback and view customer media for the CloudAlign pillow design.",
};

export default function Page() {
  return (
    <main className="route-shell reviews-route">
      <ReviewGrid />
    </main>
  );
}
