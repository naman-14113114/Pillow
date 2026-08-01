"use client";

import Link from "next/link";
import { Minus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import {
  colours,
  formatMoney,
  getBundle,
  product,
  siteConfig,
} from "@/data/store";

export function CartDrawer() {
  const cart = useCart();
  const bundle = cart.line ? getBundle(cart.line.pillows.length) : null;

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
            <span>Cart</span>
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
                <img
                  src="/assets/gallery-05-colours-juujo.png"
                  alt="CloudAlign pillow colour collection"
                  width="160"
                  height="160"
                />
              </div>
              <div>
                <strong>{product.name}</strong>
                <span>{bundle.name}</span>
                <div className="cart-variant-list">
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
                    + {cart.line.pillows.length} matching replacement cover
                    {cart.line.pillows.length > 1 ? "s" : ""}
                  </span>
                )}
                <b>{formatMoney(cart.totalCents)}</b>
                <button type="button" onClick={cart.clear}>
                  <Minus aria-hidden="true" /> Remove
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

        <div className="cart-drawer-footer">
          <Link href="/cart" onClick={cart.close}>
            <span>+ Wanna add more discount?</span>
            <strong>Move to checkout</strong>
          </Link>
          <div className="cart-subtotal">
            <div>
              <strong>SUBTOTAL</strong>
              <span>Includes all taxes.</span>
            </div>
            <b>{formatMoney(cart.totalCents)}</b>
          </div>
          <Link
            className="cart-checkout-button"
            href="/cart"
            onClick={cart.close}
          >
            Go to cart
          </Link>
        </div>
      </aside>
    </div>
  );
}
