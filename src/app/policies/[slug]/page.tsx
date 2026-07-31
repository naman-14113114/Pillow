import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage, type PolicySlug } from "@/components/PolicyPage";
import { policyContent } from "@/data/store";

export function generateStaticParams() {
  return Object.keys(policyContent).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = policyContent[slug as PolicySlug];
  return policy
    ? { title: policy.title, description: policy.intro }
    : { title: "Policy" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in policyContent)) notFound();
  return <PolicyPage slug={slug as PolicySlug} />;
}
