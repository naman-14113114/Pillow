import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, siteConfig } from "@/data/store";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return post
    ? {
        title: post.title,
        description: post.description,
        alternates: { canonical: `/blog/${post.slug}` },
      }
    : { title: "Article" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.published,
    author: { "@type": "Organization", name: "Juujo" },
    publisher: { "@type": "Organization", name: "Juujo" },
    mainEntityOfPage: `${siteConfig.siteUrl}/blog/${post.slug}`,
  };

  return (
    <main className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header>
        <Link href="/blog">
          <ArrowLeft /> Sleep journal
        </Link>
        <span>{post.readTime}</span>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
      </header>
      <article>
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
      <aside>
        <h2>Ready to choose your contour?</h2>
        <Link className="primary-button" href={siteConfig.productPath}>
          Shop CloudAlign <ArrowRight />
        </Link>
      </aside>
    </main>
  );
}
