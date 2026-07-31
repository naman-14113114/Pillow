import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/data/store";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Juujo about product selection, orders or delivery.",
};

export default function Page() {
  return (
    <main className="route-shell contact-page">
      <div className="contact-copy">
        <span className="route-kicker">Juujo support</span>
        <h1>Talk to a real support team.</h1>
        <p>
          Ask about choosing a height, an existing order, delivery or product
          care. Include your order number when contacting us about a purchase.
        </p>
        <div>
          <strong>Email</strong>
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
        </div>
        <div>
          <strong>Support hours</strong>
          <span>Monday to Friday, 9:00 AM to 5:00 PM GMT</span>
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
