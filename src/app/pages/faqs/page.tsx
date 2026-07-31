"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { productFaqs } from "@/data/store";

const supportFaqs = [
  ...productFaqs,
  {
    question: "When will my order arrive?",
    answer:
      "Orders are normally processed within 1 to 3 business days. Tracked transit normally takes another 3 to 10 business days.",
  },
  {
    question: "Can I change my colour after ordering?",
    answer:
      "Contact support within 6 hours. We will try to help, but changes cannot be guaranteed after fulfilment begins.",
  },
  {
    question: "Where can I find my tracking number?",
    answer:
      "The tracking link is emailed after dispatch. It may take 1 to 2 business days for the first courier scan to appear.",
  },
];

export default function Page() {
  const [open, setOpen] = useState(0);
  return (
    <main className="route-shell faq-route">
      <span className="route-kicker">Help centre</span>
      <h1>Frequently asked questions.</h1>
      <p>Product, care, delivery and order answers in one place.</p>
      <div className="accordion-list">
        {supportFaqs.map((item, index) => (
          <article key={item.question}>
            <button
              type="button"
              aria-expanded={open === index}
              onClick={() => setOpen(open === index ? -1 : index)}
            >
              <span>{item.question}</span>
              <ChevronDown className={open === index ? "open" : ""} />
            </button>
            <div className={open === index ? "open" : ""}>
              <p>{item.answer}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
