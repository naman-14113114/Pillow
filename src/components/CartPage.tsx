"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LoaderCircle,
  LockKeyhole,
  Trash2,
  Truck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import {
  bundles,
  colours,
  formatMoney,
  getBundle,
  getPillowBundlePriceCents,
  getPillowColourName,
  getPillowUnitPriceCents,
  heights,
  pillowVariantImages,
  product,
  siteConfig,
  type BundleQuantity,
  type PillowColour,
  type PillowHeight,
} from "@/data/store";

export function CartPage() {
  const cart = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMobileCheckout, setShowMobileCheckout] = useState(false);
  const checkoutButtonRef = useRef<HTMLButtonElement>(null);
  const bundle = cart.line ? getBundle(cart.line.pillows.length) : null;
  const pillowBundlePrice = cart.line
    ? getPillowBundlePriceCents(cart.line.pillows)
    : 0;
  const regularSalePrice = cart.line
    ? cart.line.pillows.reduce(
        (total, pillow) => total + getPillowUnitPriceCents(pillow),
        0,
      )
    : 0;
  const bundleSaving = Math.max(0, regularSalePrice - pillowBundlePrice);
  const comparableSaving = bundle
    ? Math.max(0, bundle.compareAtCents - pillowBundlePrice)
    : 0;

  useEffect(() => {
    if (!cart.isHydrated) return;
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [cart.isHydrated]);

  useEffect(() => {
    const button = checkoutButtonRef.current;
    if (!button) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileCheckout(!entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(button);
    return () => observer.disconnect();
  }, [cart.line]);

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

    try {
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
          "Checkout could not be prepared. Please review your selection and try again.",
      );
    } catch {
      setMessage(
        "Checkout could not be reached. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
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
          Shop OrthoAlign <ArrowRight />
        </Link>
      </main>
    );
  }

  const firstPillow = cart.line.pillows[0];

  return (
    <main className="route-shell cart-page">
      <Link className="back-link" href={siteConfig.productPath}>
        <ArrowLeft /> Continue shopping
      </Link>

      <div className="cart-delivery-strip">
        <Truck aria-hidden="true" />
        <div>
          <strong>Free tracked delivery</strong>
          <span>Dispatched in 1-3 business days</span>
        </div>
      </div>

      <div className="cart-page-heading">
        <span className="route-kicker">Your basket</span>
        <h1>Review your OrthoAlign setup.</h1>
        <p>Confirm every pillow before continuing to secure checkout.</p>
      </div>

      <div className="cart-layout">
        <section className="cart-configuration" aria-label="Basket items">
          <article className="cart-bundle-card">
            <div className="cart-bundle-header">
              <div>
                <span>OrthoAlign bundle</span>
                <h2>{product.name}</h2>
              </div>
              <button type="button" onClick={cart.clear}>
                <Trash2 aria-hidden="true" /> Remove
              </button>
            </div>

            <fieldset className="cart-bundle-selector">
              <legend>Bundle size</legend>
              <div>
                {bundles.map((option) => (
                  <button
                    type="button"
                    className={
                      option.quantity === cart.line?.pillows.length
                        ? "active"
                        : ""
                    }
                    key={option.quantity}
                    onClick={() =>
                      cart.setBundleQuantity(
                        option.quantity as BundleQuantity,
                      )
                    }
                  >
                    <span>{option.quantity}</span>
                    {option.quantity === 1 ? "Pillow" : "Pillows"}
                    {option.badge && <small>{option.badge}</small>}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="cart-pillow-list">
              {cart.line.pillows.map((pillow, index) => (
                <article
                  className="cart-pillow-row"
                  key={`${pillow.colour}-${pillow.height}-${index}`}
                >
                  <Image
                    src={pillowVariantImages[pillow.colour]}
                    alt={`${getPillowColourName(pillow.colour)} OrthoAlign pillow`}
                    width={1080}
                    height={1080}
                    sizes="(max-width: 600px) 94px, 132px"
                  />
                  <div className="cart-pillow-details">
                    <div className="cart-pillow-title">
                      <strong>Pillow {index + 1}</strong>
                      <span>{formatMoney(getPillowUnitPriceCents(pillow))}</span>
                    </div>
                    <div className="cart-option-grid">
                      <label>
                        <span>Colour</span>
                        <select
                          value={pillow.colour}
                          onChange={(event) =>
                            cart.updatePillow(index, {
                              ...pillow,
                              colour: event.target.value as PillowColour,
                            })
                          }
                        >
                          {colours.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Height</span>
                        <select
                          value={pillow.height}
                          onChange={(event) =>
                            cart.updatePillow(index, {
                              ...pillow,
                              height: event.target.value as PillowHeight,
                            })
                          }
                        >
                          {heights.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name} - {option.depth}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </section>

        <aside className="order-summary">
          <h2>Order summary</h2>
          <div>
            <span>Regular sale price</span>
            <strong>{formatMoney(regularSalePrice)}</strong>
          </div>
          {bundleSaving > 0 && (
            <div className="saving-row">
              <span>Automatic bundle saving</span>
              <strong>-{formatMoney(bundleSaving)}</strong>
            </div>
          )}
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
            <span>Subtotal</span>
            <strong>{formatMoney(cart.totalCents)}</strong>
          </div>
          <p className="cart-saving-callout">
            You save {formatMoney(comparableSaving)} against the {" "}
            {formatMoney(bundle.compareAtCents)} comparable value.
          </p>
          <button
            ref={checkoutButtonRef}
            id="main-cart-checkout"
            className="add-to-cart-button"
            type="button"
            onClick={checkout}
            disabled={loading}
          >
            {loading ? <LoaderCircle className="spin" /> : "Secure checkout"}
            {!loading && <ArrowRight />}
          </button>
          {message && <p className="integration-message">{message}</p>}
          <div className="cart-trust-list">
            <span><LockKeyhole /> Encrypted checkout</span>
            <span><Truck /> Free tracked delivery</span>
            <span><Check /> Colour and height confirmed above</span>
          </div>
        </aside>
      </div>

      <div
        className={`mobile-cart-checkout ${showMobileCheckout ? "visible" : ""}`}
        aria-hidden={!showMobileCheckout}
      >
        <Image
          src={pillowVariantImages[firstPillow.colour]}
          alt=""
          width={1080}
          height={1080}
          sizes="48px"
        />
        <span>
          <small>{bundle.name}</small>
          <strong>{formatMoney(cart.totalCents)}</strong>
        </span>
        <button
          type="button"
          onClick={checkout}
          disabled={loading}
          tabIndex={showMobileCheckout ? 0 : -1}
        >
          {loading ? <LoaderCircle className="spin" /> : "Checkout"}
          {!loading && <ArrowRight />}
        </button>
      </div>
    </main>
  );
}
