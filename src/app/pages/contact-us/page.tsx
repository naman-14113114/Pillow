import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Mail, PackageSearch, Ruler } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/data/store";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Juujo about product selection, orders or delivery.",
};

const quickLinks = [
  {
    icon: Ruler,
    title: "Choosing a height",
    copy: "Compare Regular and High using your frame and mattress.",
    href: "/pages/pillow-height-guide",
    label: "Open height guide",
  },
  {
    icon: PackageSearch,
    title: "Tracking an order",
    copy: "Use your order number and checkout email.",
    href: "/order-tracking",
    label: "Track an order",
  },
  {
    icon: HelpCircle,
    title: "Product and care",
    copy: "Find answers about covers, foam, delivery and returns.",
    href: "/pages/faqs",
    label: "Browse FAQs",
  },
] as const;

export default function Page() {
  return (
    <main className="contact-page-full">
      <section className="contact-hero">
        <div>
          <span className="route-kicker">Juujo support</span>
          <h1>Tell us what you need help with.</h1>
          <p>
            Ask about choosing a height, product care, an existing order or
            delivery. Include your order number when contacting us about a
            purchase.
          </p>
          <a className="contact-email" href={`mailto:${siteConfig.supportEmail}`}>
            <Mail aria-hidden="true" />
            <span>
              <small>Email support</small>
              {siteConfig.supportEmail}
            </span>
          </a>
          <span className="contact-hours">
            Monday to Friday, 9:00 AM to 5:00 PM GMT
          </span>
        </div>
        <img
          src="/assets/editorial/holding-cloudalign-blue.webp"
          alt="Woman holding a tag-free OrthoAlign pillow against a blue background"
          width="1254"
          height="1254"
        />
      </section>

      <section className="contact-main">
        <div>
          <span className="route-kicker">Send a message</span>
          <h2>We will route your question to the right place.</h2>
          <p>
            Support messages are normally reviewed on business days. Checkout
            and fulfilment integrations remain in staging until the store
            credentials are connected.
          </p>
        </div>
        <ContactForm />
      </section>

      <section className="contact-quick-links">
        {quickLinks.map(({ icon: Icon, title, copy, href, label }) => (
          <article key={title}>
            <Icon aria-hidden="true" />
            <h2>{title}</h2>
            <p>{copy}</p>
            <Link href={href}>{label}</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
