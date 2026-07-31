"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  MoveVertical,
  PackageCheck,
  ShieldCheck,
  Snowflake,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ReviewGrid } from "@/components/ReviewGrid";
import { StarRating } from "@/components/StarRating";
import {
  bundles,
  colours,
  formatMoney,
  gallery,
  getBundle,
  heights,
  product,
  productFaqs,
  siteConfig,
  type BundleQuantity,
  type PillowColour,
  type PillowHeight,
} from "@/data/store";

const featureRows = [
  {
    icon: MoveVertical,
    title: "Two contour heights",
    copy: "Rotate the pillow to choose the lower 8.9 cm or higher 10.9 cm neck contour.",
  },
  {
    icon: Snowflake,
    title: "Breathable removable cover",
    copy: "A washable outer layer helps keep the sleep surface fresh without washing the foam.",
  },
  {
    icon: Sparkles,
    title: "Six purposeful zones",
    copy: "A central cradle, neck channels, shoulder wings and arm space work together.",
  },
];

const comparisonRows = [
  ["Defined neck support", "Sculpted dual-height contour", "Loose filling"],
  ["Shoulder space", "Dedicated side wings", "Straight edge"],
  ["Night-time shape", "Stable memory-foam core", "Needs refluffing"],
  ["Cover care", "Removable and washable", "Varies by pillow"],
] as const;

export function ProductPage() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [colour, setColour] = useState<PillowColour>("white");
  const [height, setHeight] = useState<PillowHeight>("regular");
  const [quantity, setQuantity] = useState<BundleQuantity>(2);
  const [includeCovers, setIncludeCovers] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const cart = useCart();
  const bundle = getBundle(quantity);
  const total =
    bundle.priceCents + (includeCovers ? bundle.coverPriceCents : 0);

  function addToCart() {
    cart.addLine({ colour, height, quantity, includeCovers });
  }

  return (
    <main>
      <section className="product-buying-area">
        <div className="product-gallery">
          <div
            className="gallery-stage"
            onTouchStart={(event) => {
              event.currentTarget.dataset.startX = String(
                event.touches[0].clientX,
              );
            }}
            onTouchEnd={(event) => {
              const start = Number(event.currentTarget.dataset.startX);
              const distance = event.changedTouches[0].clientX - start;
              if (Math.abs(distance) < 45) return;
              setGalleryIndex((current) =>
                distance < 0
                  ? (current + 1) % gallery.length
                  : (current - 1 + gallery.length) % gallery.length,
              );
            }}
          >
            <img
              src={gallery[galleryIndex].src}
              alt={gallery[galleryIndex].alt}
              width="1200"
              height="1200"
            />
            <button
              className="gallery-arrow previous"
              type="button"
              aria-label="Previous image"
              onClick={() =>
                setGalleryIndex(
                  (current) => (current - 1 + gallery.length) % gallery.length,
                )
              }
            >
              <ArrowLeft />
            </button>
            <button
              className="gallery-arrow next"
              type="button"
              aria-label="Next image"
              onClick={() =>
                setGalleryIndex((current) => (current + 1) % gallery.length)
              }
            >
              <ArrowRight />
            </button>
            <span className="gallery-count">
              {galleryIndex + 1} / {gallery.length}
            </span>
          </div>
          <div className="thumbnail-strip" aria-label="Product images">
            {gallery.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className={galleryIndex === index ? "active" : ""}
                onClick={() => setGalleryIndex(index)}
                aria-label={`Show product image ${index + 1}`}
              >
                <img src={item.src} alt="" width="120" height="120" />
              </button>
            ))}
          </div>
        </div>

        <div className="purchase-panel">
          <div className="rating-line">
            <StarRating rating={siteConfig.reviewRating} />
            <a href="#customer-reviews">
              {siteConfig.reviewCount.toLocaleString("en-GB")} reviews
            </a>
          </div>
          <p className="eyebrow">{product.eyebrow}</p>
          <h1>{product.name}</h1>
          <div className="product-price">
            <strong>{formatMoney(bundle.priceCents)}</strong>
            <del>{formatMoney(bundle.compareAtCents)}</del>
            <span>
              Save {formatMoney(bundle.compareAtCents - bundle.priceCents)}
            </span>
          </div>
          <p className="product-description">{product.description}</p>
          <div className="mini-benefits">
            {product.highlights.slice(0, 4).map((benefit) => (
              <span key={benefit}>
                <Check aria-hidden="true" /> {benefit}
              </span>
            ))}
          </div>

          <fieldset className="option-group">
            <legend>
              Colour:{" "}
              <strong>
                {colours.find((item) => item.id === colour)?.name}
              </strong>
            </legend>
            <div className="swatches">
              {colours.map((item) => (
                <button
                  key={item.id}
                  className={colour === item.id ? "active" : ""}
                  type="button"
                  aria-label={item.name}
                  title={item.name}
                  onClick={() => setColour(item.id)}
                >
                  <span style={{ background: item.swatch }} />
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="option-group">
            <legend>
              Height:{" "}
              <strong>
                {heights.find((item) => item.id === height)?.name}
              </strong>
            </legend>
            <div className="height-options">
              {heights.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={height === item.id ? "active" : ""}
                  onClick={() => setHeight(item.id)}
                >
                  <strong>{item.name}</strong>
                  <span>{item.depth}</span>
                </button>
              ))}
            </div>
            <p className="selection-help">
              {heights.find((item) => item.id === height)?.recommendation}
            </p>
          </fieldset>

          <fieldset className="bundle-fieldset">
            <legend>BUY MORE - SAVE MORE</legend>
            <div className="bundle-options">
              {bundles.map((item) => (
                <label
                  key={item.quantity}
                  className={quantity === item.quantity ? "active" : ""}
                >
                  <input
                    type="radio"
                    name="bundle"
                    value={item.quantity}
                    checked={quantity === item.quantity}
                    onChange={() => setQuantity(item.quantity)}
                  />
                  <span className="radio-dot" />
                  <span className="bundle-name">
                    {item.badge && <b>{item.badge}</b>}
                    <strong>{item.name}</strong>
                    <small>
                      Save{" "}
                      {formatMoney(item.compareAtCents - item.priceCents)}
                    </small>
                  </span>
                  <span className="bundle-price">
                    <strong>{formatMoney(item.priceCents)}</strong>
                    <del>{formatMoney(item.compareAtCents)}</del>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="cover-upsell">
            <input
              type="checkbox"
              checked={includeCovers}
              onChange={(event) => setIncludeCovers(event.target.checked)}
            />
            <span>
              <strong>
                Add {quantity} colour-matched replacement{" "}
                {quantity === 1 ? "cover" : "covers"}
              </strong>
              <small>Protect the pillow while the original cover is washed.</small>
            </span>
            <b>{formatMoney(bundle.coverPriceCents)}</b>
          </label>

          <button className="add-to-cart-button" type="button" onClick={addToCart}>
            Add to basket - {formatMoney(total)}
            <ArrowRight aria-hidden="true" />
          </button>
          <div className="checkout-trust">
            <span>
              <PackageCheck aria-hidden="true" /> Free tracked delivery
            </span>
            <span>
              <ShieldCheck aria-hidden="true" /> Secure checkout
            </span>
          </div>
          <div className="comfort-trial">
            <BadgeCheck aria-hidden="true" />
            <div>
              <strong>90-night comfort trial</strong>
              <span>Give your body time to settle into a new sleep position.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        {featureRows.map(({ icon: Icon, title, copy }) => (
          <article key={title}>
            <Icon aria-hidden="true" />
            <div>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="story-section">
        <div className="story-copy">
          <p className="eyebrow">Every curve has a purpose</p>
          <h2>One pillow. Six support zones.</h2>
          <p>
            CloudAlign gives your head a stable centre while creating more room
            around the neck, shoulder and arm. Rotate it to change the contour
            height without stacking another pillow.
          </p>
          <div className="zone-list">
            {[
              "Central head cradle",
              "Upper neck contour",
              "Lower neck contour",
              "Left shoulder wing",
              "Right shoulder wing",
              "Arm-rest channels",
            ].map((item, index) => (
              <span key={item}>
                <b>{String(index + 1).padStart(2, "0")}</b> {item}
              </span>
            ))}
          </div>
        </div>
        <div className="story-media">
          <img
            src="/assets/gallery/support-zones.png"
            alt="Six support zones on the CloudAlign pillow"
            width="1200"
            height="1200"
          />
        </div>
      </section>

      <section className="video-story">
        <div className="video-shell">
          <video
            src="/assets/profile-guide-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Animated Regular and High CloudAlign profile guide"
          />
        </div>
        <div>
          <p className="eyebrow">Find your side</p>
          <h2>Two heights, one stable sleep surface.</h2>
          <p>
            Use the higher contour when you need more shoulder clearance.
            Rotate to the lower side for a gentler lift when sleeping on your
            back or using a softer mattress.
          </p>
          <Link className="text-link" href="/pages/pillow-height-guide">
            Open the height guide <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="colour-story">
        <div>
          <p className="eyebrow">Made for the room you sleep in</p>
          <h2>Four calm colours. Matching washable covers.</h2>
          <p>
            Choose crisp White, soft Grey, Baby Blue or deep Navy Blue. Add
            matching spare covers to keep the same clean contour between wash
            days.
          </p>
        </div>
        <img
          src="/assets/gallery/four-colours.png"
          alt="Four Juujo pillow colours without product tags"
          width="1536"
          height="1024"
        />
      </section>

      <section className="comparison-section">
        <div className="section-heading">
          <p className="eyebrow">CloudAlign vs a traditional pillow</p>
          <h2>Support that does not need constant rebuilding.</h2>
        </div>
        <div className="comparison-table" role="table">
          <div className="comparison-head" role="row">
            <span role="columnheader">What matters</span>
            <strong role="columnheader">CloudAlign</strong>
            <span role="columnheader">Traditional pillow</span>
          </div>
          {comparisonRows.map(([label, juujo, other]) => (
            <div key={label} role="row">
              <strong role="cell">{label}</strong>
              <span role="cell">
                <Check aria-hidden="true" /> {juujo}
              </span>
              <span role="cell">{other}</span>
            </div>
          ))}
        </div>
      </section>

      <div id="customer-reviews">
        <ReviewGrid />
      </div>

      <section className="faq-section">
        <div className="faq-intro">
          <p className="eyebrow">Questions before bed</p>
          <h2>CloudAlign FAQs</h2>
          <p>
            Need another answer? Contact{" "}
            <a href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </div>
        <div className="accordion-list">
          {productFaqs.map((item, index) => {
            const open = openFaq === index;
            return (
              <article key={item.question}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? null : index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown className={open ? "open" : ""} />
                </button>
                <div className={open ? "open" : ""}>
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="mobile-buy-bar">
        <div>
          <strong>{formatMoney(total)}</strong>
          <span>{quantity} {quantity === 1 ? "pillow" : "pillows"}</span>
        </div>
        <button type="button" onClick={addToCart}>
          Add to basket <ArrowRight />
        </button>
      </div>
    </main>
  );
}
