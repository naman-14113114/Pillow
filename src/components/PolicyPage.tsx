import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { policyContent } from "@/data/store";

export type PolicySlug = keyof typeof policyContent;

export function PolicyPage({ slug }: { slug: PolicySlug }) {
  const policy = policyContent[slug];
  return (
    <main className="policy-page-full">
      <header className="policy-header">
        <FileText aria-hidden="true" />
        <span className="route-kicker">Juujo store policies</span>
        <h1>{policy.title}</h1>
        <p>{policy.intro}</p>
        <small>Last updated: 31 July 2026</small>
      </header>
      <div className="policy-layout">
        <aside aria-label="Policy navigation">
          {Object.entries(policyContent).map(([policySlug, item]) => (
            <Link
              className={policySlug === slug ? "active" : ""}
              href={`/policies/${policySlug}`}
              key={policySlug}
            >
              {item.title}
            </Link>
          ))}
        </aside>
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
      </div>
      <section className="policy-help">
        <div>
          <span className="route-kicker">Need clarification?</span>
          <h2>Ask before sending anything back.</h2>
        </div>
        <Link className="primary-button" href="/pages/contact-us">
          Contact support <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
