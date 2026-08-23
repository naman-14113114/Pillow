import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/store";

const pages = {
  "how-it-works": {
    title: "How OrthoAlign Works",
    description:
      "Understand the central cradle, neck contours, shoulder wings and arm channels.",
    image: "/assets/gallery-02-zones-juujo.png",
    editorialImage: "/assets/editorial/foam-compression.webp",
    editorialAlt: "Hand pressing into the responsive OrthoAlign pillow surface",
    editorialTitle: "Responsive support you can feel.",
    editorialCopy:
      "The high-density memory-foam core compresses under pressure and returns to its sculpted contour when that pressure lifts.",
    sections: [
      ["A stable centre", "The broad central area cradles the head without loose filling shifting to the edges."],
      ["Room for the shoulder", "Concave side edges and raised wings create a defined place for the shoulder and arm."],
      ["A height you can change", "Rotate the pillow to move between its 8.9 cm and 10.9 cm contour sides."],
    ],
  },
  "pillow-height-guide": {
    title: "Choose Regular or High",
    description:
      "Match the OrthoAlign contour to your shoulder frame, mattress and usual sleep position.",
    image: "/assets/gallery-04-size-guide-juujo.png",
    editorialImage: "/assets/editorial/side-sleeper-man.webp",
    editorialAlt: "Man sleeping on his side with an OrthoAlign contour pillow",
    editorialTitle: "Start with the gap between shoulder and mattress.",
    editorialCopy:
      "A side sleeper usually needs enough height to support the head without pushing it upward. Your frame and mattress firmness determine the best starting profile.",
    sections: [
      ["Choose Regular", "Start with Regular if you have a smaller frame, sleep on your back, or use a softer mattress."],
      ["Choose High", "Start with High if you have broader shoulders, mainly sleep on your side, or use a firmer mattress."],
      ["Still unsure?", "The sleep quiz combines all three factors and gives you a simple starting recommendation."],
    ],
  },
  "colour-and-cover-guide": {
    title: "Colours and Cover Care",
    description:
      "Choose White, Grey, Baby Blue or Navy Blue and care for the included washable cover.",
    image: "/assets/gallery-05-colours-juujo.png",
    editorialImage: "/assets/editorial/holding-cloudalign-blue.webp",
    editorialAlt: "Woman holding the tag-free white OrthoAlign pillow against a blue background",
    editorialTitle: "A calm finish for the rest of the room.",
    editorialCopy:
      "The fitted cover follows every curve without adding a visible product tag. Choose a colour that sits naturally with your bedding.",
    sections: [
      ["Four calm finishes", "All four options use the same memory-foam core and shaped removable cover."],
      ["Included fitted cover", "Each colour includes a shaped removable cover that follows the OrthoAlign contour."],
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
            Shop OrthoAlign <ArrowRight />
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
      <div className="guide-editorial">
        <img
          src={page.editorialImage}
          alt={page.editorialAlt}
          width="1400"
          height="1400"
        />
        <div>
          <span className="route-kicker">A closer look</span>
          <h2>{page.editorialTitle}</h2>
          <p>{page.editorialCopy}</p>
        </div>
      </div>
    </main>
  );
}
