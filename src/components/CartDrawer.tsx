"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Minus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import {
  formatMoney,
  getBundle,
  getPillowBundlePriceCents,
  getPillowColourName,
  getPillowUnitPriceCents,
  pillowVariantImages,
  product,
  siteConfig,
} from "@/data/store";

export function CartDrawer() {
  const cart = useCart();
  const bundle = cart.line ? getBundle(cart.line.pillows.length) : null;
  const regularSalePrice = cart.line
    ? cart.line.pillows.reduce(
        (total, pillow) => total + getPillowUnitPriceCents(pillow),
        0,
      )
    : 0;
  const bundlePrice = cart.line
    ? getPillowBundlePriceCents(cart.line.pillows)
    : 0;
  const bundleSaving = Math.max(0, regularSalePrice - bundlePrice);

  return (
    <div className={`cart-drawer-shell ${cart.isOpen ? "open" : ""}`}>
      <button
        className="drawer-backdrop"
        type="button"
        aria-label="Close cart"
        onClick={cart.close}
      />
      <aside
        className={`cart-drawer ${cart.isOpen ? "open" : ""}`}
        aria-label="Cart"
        aria-hidden={!cart.isOpen}
      >
        <div className="cart-drawer-header">
          <div>
            <span>{cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}</span>
            <strong>Your Juujo bag</strong>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Close cart"
            onClick={cart.close}
          >
            <X />
          </button>
        </div>

        <div className="cart-drawer-body">
          {cart.line && bundle ? (
            <article className="cart-line">
              <div className="cart-line-image">
                <Image
                  src={pillowVariantImages[cart.line.pillows[0].colour]}
                  alt={`${getPillowColourName(cart.line.pillows[0].colour)} CloudAlign pillow`}
                  width={1080}
                  height={1080}
                  sizes="(max-width: 600px) 112px, 128px"
                />
                <span className="cart-image-quantity">
                  {cart.line.pillows.length}x
                </span>
              </div>
              <div>
                <strong>{product.name}</strong>
                <span className="cart-bundle-name">{bundle.name}</span>
                <div className="cart-variant-list">
                  {cart.line.pillows.map((pillow, index) => (
                    <span key={`${pillow.colour}-${pillow.height}-${index}`}>
                      Pillow {index + 1}: {getPillowColourName(pillow.colour)} /{" "}
                      {pillow.height === "high" ? "High" : "Regular"}
                    </span>
                  ))}
                </div>
                <b>{formatMoney(cart.totalCents)}</b>
                <button type="button" onClick={cart.clear}>
                  <Minus aria-hidden="true" /> Remove bundle
                </button>
              </div>
            </article>
          ) : (
            <div className="empty-cart">
              <ShoppingBag aria-hidden="true" />
              <h2>Your bag is waiting.</h2>
              <p>
                Add the Juujo CloudAlign Pillow to choose your colour, contour
                height and bundle with free UK delivery.
              </p>
              <Link
                className="cart-shop-link"
                href={siteConfig.productPath}
                onClick={cart.close}
              >
                Shop Juujo
              </Link>
            </div>
          )}
        </div>

        {cart.line && bundle && (
          <div className="cart-drawer-footer">
            {bundleSaving > 0 && (
              <div className="cart-drawer-saving">
                <span>Automatic bundle saving</span>
                <strong>-{formatMoney(bundleSaving)}</strong>
              </div>
            )}
            <div className="cart-subtotal">
              <div>
                <strong>Subtotal</strong>
                <span>Free tracked delivery</span>
              </div>
              <b>{formatMoney(cart.totalCents)}</b>
            </div>
            <Link
              className="cart-checkout-button"
              href="/cart"
              scroll
              onClick={() => {
                cart.close();
                window.scrollTo({ top: 0, left: 0 });
              }}
            >
              Review basket <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
