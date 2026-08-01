import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { ReviewGrid } from "@/components/ReviewGrid";
import { siteConfig } from "@/data/store";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read licensed customer feedback and view customer media for the CloudAlign pillow design.",
};

export default function Page() {
  return (
    <main className="reviews-page-full">
      <section className="reviews-page-hero">
        <div>
          <BadgeCheck aria-hidden="true" />
          <span className="route-kicker">Licensed product feedback</span>
          <h1>See CloudAlign in real bedrooms.</h1>
          <p>
            Browse written feedback and customer media for the same CloudAlign
            pillow design. Review provenance is retained internally and is not
            presented as a verified Juujo purchase unless it maps to a Juujo
            order.
          </p>
          <Link className="primary-button" href={siteConfig.productPath}>
            Shop CloudAlign <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <img
          src="/assets/editorial/couple-cloudalign.webp"
          alt="Couple sitting together with a white tag-free CloudAlign pillow"
          width="1400"
          height="1749"
        />
      </section>
      <ReviewGrid />
    </main>
  );
}
