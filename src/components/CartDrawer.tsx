"use client";

import Link from "next/link";
import { ArrowRight, Minus, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import {
  colours,
  formatMoney,
  getBundle,
  product,
} from "@/data/store";

export function CartDrawer() {
  const cart = useCart();
  const bundle = cart.line ? getBundle(cart.line.pillows.length) : null;

  return (
    <>
      <button
        className={`drawer-backdrop ${cart.isOpen ? "open" : ""}`}
        type="button"
        aria-label="Close basket"
        onClick={cart.close}
      />
      <aside
        className={`cart-drawer ${cart.isOpen ? "open" : ""}`}
        aria-label="Basket"
        aria-hidden={!cart.isOpen}
      >
        <div className="cart-drawer-header">
          <div>
            <span>Your basket</span>
            <strong>{cart.itemCount} pillows</strong>
          </div>
          <button className="icon-button" type="button" onClick={cart.close}>
            <X />
          </button>
        </div>
        {cart.line && bundle ? (
          <>
            <div className="cart-line">
              <div className="cart-line-image">
                <img
                  src="/assets/gallery-01-hero-juujo.png"
                  alt=""
                  width="140"
                  height="140"
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
                  <span>+ {cart.line.pillows.length} matching covers</span>
                )}
                <b>{formatMoney(cart.totalCents)}</b>
                <button type="button" onClick={cart.clear}>
                  <Minus aria-hidden="true" /> Remove
                </button>
              </div>
            </div>
            <div className="cart-delivery">
              <span>Delivery</span>
              <strong>Free tracked shipping</strong>
            </div>
            <div className="cart-total">
              <span>Total</span>
              <strong>{formatMoney(cart.totalCents)}</strong>
            </div>
            <Link className="primary-button" href="/cart" onClick={cart.close}>
              Review basket <ArrowRight aria-hidden="true" />
            </Link>
          </>
        ) : (
          <div className="empty-cart">
            <ShoppingBagMark />
            <h2>Your basket is ready for better sleep.</h2>
            <p>Choose a colour, contour height and bundle to get started.</p>
            <Link
              className="primary-button"
              href={productPath()}
              onClick={cart.close}
            >
              Shop CloudAlign <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

function productPath() {
  return "/products/juujo-cloudalign-pillow";
}

function ShoppingBagMark() {
  return (
    <div className="empty-cart-mark" aria-hidden="true">
      <span />
      <span />
    </div>
  );
}
