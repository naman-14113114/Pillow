import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/store";

const pages = {
  "how-it-works": {
    title: "How CloudAlign Works",
    description:
      "Understand the central cradle, neck contours, shoulder wings and arm channels.",
    image: "/assets/gallery-02-zones-juujo.png",
    sections: [
      ["A stable centre", "The broad central area cradles the head without loose filling shifting to the edges."],
      ["Room for the shoulder", "Concave side edges and raised wings create a defined place for the shoulder and arm."],
      ["A height you can change", "Rotate the pillow to move between its 8.9 cm and 10.9 cm contour sides."],
    ],
  },
  "pillow-height-guide": {
    title: "Choose Regular or High",
    description:
      "Match the CloudAlign contour to your shoulder frame, mattress and usual sleep position.",
    image: "/assets/gallery-04-size-guide-juujo.png",
    sections: [
      ["Choose Regular", "Start with Regular if you have a smaller frame, sleep on your back, or use a softer mattress."],
      ["Choose High", "Start with High if you have broader shoulders, mainly sleep on your side, or use a firmer mattress."],
      ["Still unsure?", "The sleep quiz combines all three factors and gives you a simple starting recommendation."],
    ],
  },
  "colour-and-cover-guide": {
    title: "Colours and Replacement Covers",
    description:
      "Choose White, Grey, Baby Blue or Navy Blue and add matching washable spare covers.",
    image: "/assets/gallery-05-colours-juujo.png",
    sections: [
      ["Four calm finishes", "All four options use the same memory-foam core and shaped removable cover."],
      ["Match every spare", "Replacement covers automatically follow the pillow colour selected in the product options."],
      ["Wash at 30 C", "Remove the outer cover, wash gently at 30 C and air dry before refitting it to the foam core."],
    ],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  return page
    ? { title: page.title, description: page.description }
    : { title: "Page not found" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  if (!page) notFound();

  return (
    <main className="guide-page">
      <section>
        <div>
          <span className="route-kicker">Juujo sleep guide</span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <Link className="primary-button" href={siteConfig.productPath}>
            Shop CloudAlign <ArrowRight />
          </Link>
        </div>
        <img src={page.image} alt="" width="1200" height="1200" />
      </section>
      <div className="guide-sections">
        {page.sections.map(([heading, copy], index) => (
          <article key={heading}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{heading}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
