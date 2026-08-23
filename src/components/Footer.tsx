import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/store";

const shopLinks = [
  ["Home", "/"],
  ["OrthoAlign Pillow", siteConfig.productPath],
  ["Best Pillow for Side Sleepers UK", "/blog/best-pillow-for-side-sleepers-uk"],
  ["Sleep Quiz", "/pages/sleep-quiz"],
  ["Blog", "/blog"],
  ["Privacy Policy", "/policies/privacy-policy"],
  ["Return Policy", "/policies/return-policy"],
  ["Shipping Policy", "/policies/shipping-policy"],
  ["Refund Policy", "/policies/refund-policy"],
  ["Terms of Service", "/policies/terms-of-service"],
] as const;

const supportLinks = [
  ["Contact Us", "/pages/contact-us"],
  ["Order Tracking", "/order-tracking"],
  ["About Us", "/pages/about-us"],
  ["FAQs", "/pages/faqs"],
  ["Customer Reviews", "/pages/customer-reviews"],
  ["Cookies Policy", "/policies/cookies-policy"],
] as const;

export function Footer() {
  return (
    <footer className="store-footer">
      <section className="store-footer-offer">
        <div>
          <span>Find your contour</span>
          <h2>Better support starts with the right height.</h2>
        </div>
        <Link href="/pages/sleep-quiz">
          Take the sleep quiz <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>

      <div className="store-footer-inner">
        <div className="store-footer-brand">
          <Link className="wordmark" href="/" aria-label="Juujo home">
            juujo
          </Link>
          <p>
            Sculpted memory-foam support for side, back and changing-position
            sleepers. Choose from two contour profiles and four calm colours.
          </p>
        </div>

        <div className="store-footer-menu">
          <h2>Shop</h2>
          {shopLinks.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>

        <div className="store-footer-menu">
          <h2>Support</h2>
          {supportLinks.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>

        <div className="store-footer-contact">
          <h2>Get in touch</h2>
          <p>
            Operating Hours
            <br />
            Monday - Friday, 9am - 5pm GMT
          </p>
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          <div
            className="store-payment-row"
            aria-label="Accepted payment methods"
          >
            <span>VISA</span>
            <span>Mastercard</span>
            <span>AMEX</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
      <div className="store-footer-bottom">
        <span>&copy; 2026 Juujo</span>
        <span>Free tracked shipping on all UK orders</span>
      </div>
      <div className="store-footer-watermark" aria-hidden="true">
        juujo
      </div>
    </footer>
  );
}
