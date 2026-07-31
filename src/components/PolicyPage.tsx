import { FileText } from "lucide-react";
import { policyContent } from "@/data/store";

export type PolicySlug = keyof typeof policyContent;

export function PolicyPage({ slug }: { slug: PolicySlug }) {
  const policy = policyContent[slug];
  return (
    <main className="route-shell policy-page">
      <FileText aria-hidden="true" />
      <span className="route-kicker">Store policies</span>
      <h1>{policy.title}</h1>
      <p className="policy-intro">{policy.intro}</p>
      <article>
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
