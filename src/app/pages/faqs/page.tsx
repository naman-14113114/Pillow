"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  PackageCheck,
  WashingMachine,
} from "lucide-react";
import { productFaqs, siteConfig } from "@/data/store";

const groups = [
  {
    title: "Choosing and using OrthoAlign",
    icon: CircleHelp,
    items: productFaqs,
  },
  {
    title: "Orders and delivery",
    icon: PackageCheck,
    items: [
      {
        question: "When will my order arrive?",
        answer:
          "Orders are normally processed within 1 to 3 business days. Tracked transit normally takes another 3 to 10 business days.",
      },
      {
        question: "Can I change my colour or height after ordering?",
        answer:
          "Contact support within 6 hours. We will try to help, but changes cannot be guaranteed after fulfilment begins.",
      },
      {
        question: "Where can I find my tracking number?",
        answer:
          "The tracking link is emailed after dispatch. It may take 1 to 2 business days for the first courier scan to appear.",
      },
      {
        question: "What if tracking has not updated?",
        answer:
          "Courier scans can pause while a parcel moves between facilities. Contact support if there is no update for five business days.",
      },
    ],
  },
  {
    title: "Care, covers and returns",
    icon: WashingMachine,
    items: [
      {
        question: "How should I wash the fitted cover?",
        answer:
          "Remove the outer cover, machine wash at 30 C on a gentle cycle and air dry. Do not put the memory-foam core in a washing machine.",
      },
      {
        question: "How should I dry the fitted cover?",
        answer:
          "Air dry the fitted cover completely before putting it back on the memory-foam core. Do not tumble dry the foam core.",
      },
      {
        question: "What should I do if my order arrives damaged?",
        answer:
          "Contact support within 7 business days with your order number and clear photos or video of the item, packaging and delivery label.",
      },
      {
        question: "Can I return an item without contacting support?",
        answer:
          "No. Contact the support team first so the order and issue can be reviewed and the correct return instructions can be provided.",
      },
    ],
  },
] as const;

export default function Page() {
  const [open, setOpen] = useState("0-0");

  return (
    <main className="faq-page-full">
      <section className="faq-page-heading">
        <CircleHelp aria-hidden="true" />
        <span className="route-kicker">Juujo help centre</span>
        <h1>Questions, answered clearly.</h1>
        <p>
          Product selection, care, delivery and order support in one place.
        </p>
        <div>
          <Link href="/pages/sleep-quiz">
            Take the height quiz <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/order-tracking">
            Track an order <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="faq-editorial-band">
        <img
          src="/assets/v2/lifestyle-man-side-sleeper.webp"
          alt="Side sleeper resting with the OrthoAlign contour beneath his neck"
          width="1024"
          height="1024"
        />
        <div>
          <span className="route-kicker">Before you choose</span>
          <h2>Start with fit, then colour and care.</h2>
          <p>
            The most useful questions are often about height, shoulder space,
            washable covers and delivery. The answers below keep those details
            easy to compare.
          </p>
        </div>
      </section>

      <section className="faq-groups">
        {groups.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <article key={group.title}>
              <header>
                <Icon aria-hidden="true" />
                <h2>{group.title}</h2>
              </header>
              <div className="accordion-list">
                {group.items.map((item, itemIndex) => {
                  const id = `${groupIndex}-${itemIndex}`;
                  return (
                    <div key={item.question}>
                      <button
                        type="button"
                        aria-expanded={open === id}
                        onClick={() => setOpen(open === id ? "" : id)}
                      >
                        <span>{item.question}</span>
                        <ChevronDown className={open === id ? "open" : ""} />
                      </button>
                      <div className={open === id ? "open" : ""}>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>

      <section className="faq-contact-band">
        <div>
          <span className="route-kicker">Still need help?</span>
          <h2>Send the support team the details.</h2>
        </div>
        <div>
          <p>
            Include your order number for delivery, damage or order-change
            questions.
          </p>
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          <Link className="primary-button" href="/pages/contact-us">
            Contact support <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
