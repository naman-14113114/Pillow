"use client";

import Link from "next/link";
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { siteConfig } from "@/data/store";

const primaryNavigation = [
  ["CloudAlign Pillow", siteConfig.productPath],
  ["Pillow Height Guide", "/pages/pillow-height-guide"],
  ["Sleep Quiz", "/pages/sleep-quiz"],
] as const;

const secondaryNavigation = [
  ["About Us", "/pages/about-us"],
  ["FAQs", "/pages/faqs"],
  ["Contact Us", "/pages/contact-us"],
] as const;

const announcementItems = [
  "Free shipping on all UK orders",
  "Regular and High contour profiles",
  "Sign up and enjoy \u00a310 off",
  "4.9 stars from 42,000+ customers",
] as const;

function AnnouncementBar() {
  return (
    <div className="store-announcement" aria-label="Current offers">
      <div className="store-announcement-track">
        {[0, 1].map((group) => (
          <div
            className="store-announcement-group"
            aria-hidden={group === 1}
            key={group}
          >
            {announcementItems.map((item) => (
              <span key={`${group}-${item}`}>
                {item}
                <b aria-hidden="true">{"\u2726"}</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const allNavigation = [...primaryNavigation, ...secondaryNavigation];

  return (
    <>
      <AnnouncementBar />
      <header
        className={`site-header store-site-header ${
          isHome ? "store-site-header--home" : ""
        }`}
      >
        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className="header-primary-nav" aria-label="Shop navigation">
          {primaryNavigation.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <Link className="wordmark" href="/" aria-label="Juujo home">
          juujo
        </Link>

        <div className="store-header-right">
          <nav className="header-secondary-nav" aria-label="Help navigation">
            {secondaryNavigation.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button cart-button"
              type="button"
              aria-label={`Open cart with ${cart.itemCount} items`}
              onClick={cart.open}
            >
              <ShoppingBag />
              {cart.itemCount > 0 && (
                <span className="cart-count">{cart.itemCount}</span>
              )}
            </button>
            <Link className="icon-button" href="/sign-in" aria-label="Account">
              <UserRound />
            </Link>
          </div>
        </div>

        <div
          className={`store-mobile-menu ${menuOpen ? "open" : ""}`}
          id="mobile-navigation"
          aria-hidden={!menuOpen}
        >
          <button
            className="store-mobile-backdrop"
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside aria-label="Mobile navigation">
            <div className="store-mobile-menu-header">
              <Link href="/" className="wordmark">
                juujo
              </Link>
              <button
                className="icon-button"
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X />
              </button>
            </div>
            <p>Shop</p>
            <nav>
              {allNavigation.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              ))}
            </nav>
            <p>Account</p>
            <nav>
              <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
              <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                Create account
              </Link>
              <Link href="/order-history" onClick={() => setMenuOpen(false)}>
                Order history
              </Link>
              <Link href="/order-tracking" onClick={() => setMenuOpen(false)}>
                Order tracking
              </Link>
            </nav>
          </aside>
        </div>
      </header>
    </>
  );
}
