"use client";

import Link from "next/link";
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { siteConfig } from "@/data/store";

const nav = [
  ["Shop", siteConfig.productPath],
  ["How it works", "/pages/how-it-works"],
  ["Sleep quiz", "/pages/sleep-quiz"],
  ["Reviews", "/pages/customer-reviews"],
  ["Journal", "/blog"],
] as const;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();

  if (pathname === siteConfig.productPath) return null;

  return (
    <>
      <div className="announcement">
        Free tracked delivery | Four colours | Two contour heights
      </div>
      <header className="site-header">
        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <Link className="wordmark" href="/" aria-label="Juujo home">
          juujo
        </Link>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="icon-button" href="/sign-in" aria-label="Account">
            <UserRound />
          </Link>
          <button
            className="icon-button cart-button"
            type="button"
            aria-label={`Open basket with ${cart.itemCount} items`}
            onClick={cart.open}
          >
            <ShoppingBag />
            {cart.itemCount > 0 && <span>{cart.itemCount}</span>}
          </button>
        </div>
      </header>
    </>
  );
}
