import Link from "next/link";
import { ArrowRight, DatabaseZap } from "lucide-react";

export function IntegrationPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <main className="route-shell integration-page">
      <DatabaseZap aria-hidden="true" />
      <span className="route-kicker">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="integration-card">
        <strong>Integration-ready staging state</strong>
        <span>
          The route and data boundary are implemented. Customer data will only
          appear after the new Juujo Supabase and PlusBase credentials are
          connected.
        </span>
      </div>
      <Link className="primary-button" href="/products/juujo-cloudalign-pillow">
        Return to CloudAlign <ArrowRight />
      </Link>
    </main>
  );
}
