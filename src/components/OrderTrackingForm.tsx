"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LoaderCircle, PackageSearch } from "lucide-react";

export function OrderTrackingForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setTrackingUrl("");
    const body = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/order-tracking", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    setMessage(data.message);
    setTrackingUrl(data.order?.trackingUrl || "");
    setLoading(false);
  }

  return (
    <form className="tracking-form" onSubmit={submit}>
      <PackageSearch aria-hidden="true" />
      <label>
        Order number
        <input name="orderNumber" placeholder="e.g. JUUJO-1042" required />
      </label>
      <label>
        Order email
        <input name="email" type="email" required />
      </label>
      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? <LoaderCircle className="spin" /> : "Track order"}
        {!loading && <ArrowRight />}
      </button>
      {message && <p className="integration-message">{message}</p>}
      {trackingUrl && (
        <a
          className="secondary-button"
          href={trackingUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Open courier tracking <ArrowRight />
        </a>
      )}
    </form>
  );
}
