"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/store";

const groups = [
  {
    title: "Shop",
    links: [
      ["CloudAlign Pillow", siteConfig.productPath],
      ["Choose Your Height", "/pages/pillow-height-guide"],
      ["Colour & Cover Guide", "/pages/colour-and-cover-guide"],
      ["Sleep Quiz", "/pages/sleep-quiz"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Contact", "/pages/contact-us"],
      ["FAQs", "/pages/faqs"],
      ["Track Order", "/order-tracking"],
      ["Delivery", "/policies/shipping-policy"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["Journal", "/blog"],
      ["How It Works", "/pages/how-it-works"],
      ["Customer Reviews", "/pages/customer-reviews"],
      ["About Juujo", "/pages/about-us"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/policies/privacy-policy"],
      ["Returns", "/policies/return-policy"],
      ["Refunds", "/policies/refund-policy"],
      ["Cookies", "/policies/cookies-policy"],
      ["Terms", "/policies/terms-of-service"],
    ],
  },
] as const;

export function Footer() {
  const pathname = usePathname();

  if (pathname === siteConfig.productPath) return null;

  return (
    <footer>
      <div className="footer-offer">
        <div>
          <span>Find your contour</span>
          <h2>Better support starts with the right height.</h2>
        </div>
        <Link href="/pages/sleep-quiz">
          Take the sleep quiz <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <div className="footer-grid">
        {groups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2026 Juujo</span>
        <a href={`mailto:${siteConfig.supportEmail}`}>
          {siteConfig.supportEmail}
        </a>
      </div>
      <div className="footer-watermark" aria-hidden="true">
        juujo
      </div>
    </footer>
  );
}
