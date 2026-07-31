import type { Metadata } from "next";
import { OrderTrackingForm } from "@/components/OrderTrackingForm";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Track a Juujo order using the order number and checkout email.",
};

export default function Page() {
  return (
    <main className="route-shell form-route">
      <span className="route-kicker">Tracked delivery</span>
      <h1>Where is your Juujo order?</h1>
      <p>
        Tracking can take 1 to 2 business days to appear after the dispatch
        email is sent.
      </p>
      <OrderTrackingForm />
    </main>
  );
}
