import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/store";

export default function NotFound() {
  return (
    <main className="route-shell integration-page">
      <span className="route-kicker">404</span>
      <h1>This page has gone back to bed.</h1>
      <p>The page may have moved, but CloudAlign is still here.</p>
      <Link className="primary-button" href={siteConfig.productPath}>
        Shop CloudAlign <ArrowRight />
      </Link>
    </main>
  );
}
