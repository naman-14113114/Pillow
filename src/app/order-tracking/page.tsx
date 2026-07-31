import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Box, PackageCheck, Truck } from "lucide-react";
import { OrderTrackingForm } from "@/components/OrderTrackingForm";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Track a Juujo order using the order number and checkout email.",
};

export default function Page() {
  return (
    <main className="tracking-page-full">
      <section className="tracking-hero">
        <div>
          <span className="route-kicker">Tracked delivery</span>
          <h1>Where is your Juujo order?</h1>
          <p>
            Enter the order number and email used at checkout. Tracking can
            take 1 to 2 business days to appear after the dispatch email.
          </p>
          <OrderTrackingForm />
        </div>
        <img
          src="/assets/gallery/bundle-packaging.png"
          alt="Juujo CloudAlign order and packaging"
          width="1536"
          height="1024"
        />
      </section>
      <section className="tracking-steps">
        <article>
          <Box aria-hidden="true" />
          <span>01</span>
          <h2>Order received</h2>
          <p>Orders are normally prepared within 1 to 3 business days.</p>
        </article>
        <article>
          <PackageCheck aria-hidden="true" />
          <span>02</span>
          <h2>Tracking issued</h2>
          <p>A dispatch email includes the courier and tracking reference.</p>
        </article>
        <article>
          <Truck aria-hidden="true" />
          <span>03</span>
          <h2>In transit</h2>
          <p>Tracked delivery normally takes another 3 to 10 business days.</p>
        </article>
      </section>
      <section className="tracking-help">
        <div>
          <span className="route-kicker">No tracking update?</span>
          <h2>Give the first scan up to two business days.</h2>
        </div>
        <div>
          <p>
            If there is still no movement, send support your order number and
            checkout email so the team can review it.
          </p>
          <Link className="primary-button" href="/pages/contact-us">
            Contact support <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
