"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const body = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    setMessage(data.message);
    setLoading(false);
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form className="contact-form" id="contact-form" onSubmit={submit}>
      <div>
        <label>
          Name
          <input name="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
      </div>
      <label>
        Order number <span>Optional</span>
        <input name="orderNumber" />
      </label>
      <label>
        How can we help?
        <textarea name="message" rows={6} minLength={10} required />
      </label>
      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? <LoaderCircle className="spin" /> : "Send message"}
        {!loading && <ArrowRight />}
      </button>
      {message && (
        <p className="form-message">
          <CheckCircle2 /> {message}
        </p>
      )}
    </form>
  );
}
