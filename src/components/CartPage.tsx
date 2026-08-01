"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import {
  colours,
  formatMoney,
  getBundle,
  product,
  siteConfig,
} from "@/data/store";

export function CartPage() {
  const cart = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const bundle = cart.line ? getBundle(cart.line.pillows.length) : null;

  async function checkout() {
    if (!cart.line) return;
    setLoading(true);
    setMessage("");

    let attribution: Record<string, string> = {};
    try {
      attribution = JSON.parse(
        window.sessionStorage.getItem("juujo-attribution") || "{}",
      );
    } catch {
      attribution = {};
    }

    const response = await fetch("/api/checkout/prepare", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ line: cart.line, attribution }),
    });
    const data = await response.json();

    if (response.ok && data.checkoutUrl) {
      window.location.assign(data.checkoutUrl);
      return;
    }

    setMessage(
      data.message ||
        "Checkout is in staging mode until the Juujo PlusBase variant IDs are connected.",
    );
    setLoading(false);
  }

  if (!cart.isHydrated) {
    return (
      <main className="route-shell compact-route">
        <LoaderCircle className="spin" />
      </main>
    );
  }

  if (!cart.line || !bundle) {
    return (
      <main className="route-shell empty-basket-page">
        <span className="route-kicker">Your basket</span>
        <h1>No pillows selected yet.</h1>
        <p>Choose your colour, contour height and bundle on the product page.</p>
        <Link className="primary-button" href={siteConfig.productPath}>
          Shop CloudAlign <ArrowRight />
        </Link>
      </main>
    );
  }

  return (
    <main className="route-shell cart-page">
      <Link className="back-link" href={siteConfig.productPath}>
        <ArrowLeft /> Continue shopping
      </Link>
      <div className="cart-layout">
        <section>
          <span className="route-kicker">Your basket</span>
          <h1>Review your sleep setup.</h1>
          <article className="cart-page-line">
            <img
              src="/assets/gallery-05-colours-juujo.png"
              alt=""
              width="280"
              height="280"
            />
            <div>
              <h2>{product.name}</h2>
              <span>{bundle.name}</span>
              <div className="cart-page-variants">
                {cart.line.pillows.map((pillow, index) => {
                  const colour = colours.find(
                    (item) => item.id === pillow.colour,
                  );
                  return (
                    <span key={`${pillow.colour}-${pillow.height}-${index}`}>
                      Pillow {index + 1}: {colour?.name} /{" "}
                      {pillow.height === "high" ? "High" : "Regular"}
                    </span>
                  );
                })}
              </div>
              {cart.line.includeCovers && (
                <span>
                  {cart.line.pillows.length} matching replacement covers
                </span>
              )}
              <strong>{formatMoney(cart.totalCents)}</strong>
            </div>
            <button type="button" onClick={cart.clear} aria-label="Remove item">
              <Trash2 />
            </button>
          </article>
        </section>
        <aside className="order-summary">
          <h2>Order summary</h2>
          <div>
            <span>Pillow bundle</span>
            <strong>{formatMoney(bundle.priceCents)}</strong>
          </div>
          {cart.line.includeCovers && (
            <div>
              <span>Replacement covers</span>
              <strong>{formatMoney(bundle.coverPriceCents)}</strong>
            </div>
          )}
          <div>
            <span>Tracked delivery</span>
            <strong>Free</strong>
          </div>
          <div className="order-total">
            <span>Total</span>
            <strong>{formatMoney(cart.totalCents)}</strong>
          </div>
          <button
            className="add-to-cart-button"
            type="button"
            onClick={checkout}
            disabled={loading}
          >
            {loading ? <LoaderCircle className="spin" /> : "Continue to checkout"}
            {!loading && <ArrowRight />}
          </button>
          {message && <p className="integration-message">{message}</p>}
          <p className="secure-note">
            <Check /> PlusBase checkout activates when the product and variant
            IDs are supplied.
          </p>
        </aside>
      </div>
    </main>
  );
}
