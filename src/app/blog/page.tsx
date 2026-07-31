import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/store";

export const metadata: Metadata = {
  title: "Sleep Journal",
  description:
    "Practical guides to pillow height, side sleeping, memory foam, cooling and product care.",
};

export default function Page() {
  return (
    <main className="route-shell blog-index">
      <div className="blog-heading">
        <BookOpen aria-hidden="true" />
        <span className="route-kicker">The Juujo sleep journal</span>
        <h1>Useful answers before you change your pillow.</h1>
        <p>
          Clear guides to height, support, materials, heat and care without
          turning sleep into a science project.
        </p>
      </div>
      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <article key={post.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{post.readTime}</p>
            <h2>{post.title}</h2>
            <div>{post.description}</div>
            <Link href={`/blog/${post.slug}`}>
              Read guide <ArrowRight />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
