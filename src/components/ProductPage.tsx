"use client";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Heart,
  MoveVertical,
  Pause,
  Play,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Stethoscope,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart, type PillowChoice } from "@/components/CartProvider";
import {
  formatMoney,
  getBundle,
  getPillowBundlePriceCents,
  getPillowSelectionTotalCents,
  getPillowUnitPriceCents,
  pillowVariantImages,
  type PillowColour,
  type PillowHeight,
} from "@/data/store";

const replacementCoversAvailable =
  process.env.NEXT_PUBLIC_REPLACEMENT_COVERS_AVAILABLE === "true";

const gallery = [
  {
    src: "/assets/gallery-01-hero-juujo.png",
    alt: "#1 Best-Selling Pillow of 2025 with four award badges",
  },
  {
    src: "/assets/gallery-02-zones-juujo.png",
    alt: "CloudAlign pillow six-zone support diagram",
  },
  {
    src: "/assets/gallery-03-lifestyle-juujo.png",
    alt: "CloudAlign pillow supporting a sleeping model",
  },
  {
    src: "/assets/gallery-04-size-guide-juujo.png",
    alt: "CloudAlign Regular and High pillow size guide",
  },
  {
    src: "/assets/gallery-05-colours-juujo.png",
    alt: "CloudAlign pillow colour collection",
  },
  {
    src: "/assets/gallery-06-sleepers-juujo.png",
    alt: "CloudAlign pillow in four sleeping positions",
  },
  {
    src: "/assets/gallery-07-disclaimer-juujo.png",
    alt: "Removable cooling pillow cover",
  },
  {
    src: "/assets/gallery-08-callouts-juujo.png",
    alt: "CloudAlign pillow ergonomic feature callouts",
  },
  {
    src: "/assets/gallery-09-chiro-juujo.png",
    alt: "Chiropractor CloudAlign pillow recommendation",
  },
  {
    src: "/assets/gallery-10-comparison-juujo.png",
    alt: "Juujo CloudAlign pillow compared with regular pillows",
  },
  {
    src: "/assets/gallery-11-model-juujo.png",
    alt: "Model holding the CloudAlign pillow",
  },
];

const productClaims = [
  { icon: Sparkles, text: "#1 Selling TikTok Pillow" },
  { icon: Snowflake, text: "Stays Cool All Night" },
  { icon: MoveVertical, text: "Dual Height. Low & High Side" },
  { icon: Heart, text: "Voted Softest Pillow of 2025!" },
  { icon: ShieldCheck, text: "Hypoallergenic, Antibacterial & 100% Vegan" },
  { icon: Stethoscope, text: "Recommended by Our Chiropractic Partners" },
];

const colours = [
  { id: "white", name: "White", colour: "#f8f8f6" },
  { id: "grey", name: "Grey", colour: "#c4c7ca" },
  { id: "blue", name: "Baby Blue", colour: "#a9cde9" },
  { id: "navy", name: "Navy Blue", colour: "#172e59" },
] satisfies Array<{ id: PillowColour; name: string; colour: string }>;

const heights = [
  { id: "regular", name: "Regular" },
  { id: "high", name: "High" },
] satisfies Array<{ id: PillowHeight; name: string }>;

const colourHero: Record<PillowColour, string> = {
  white: "/assets/gallery-01-hero-juujo.png",
  grey: "/assets/gallery-colours/hero-grey.webp",
  blue: "/assets/gallery-colours/hero-baby-blue.webp",
  navy: "/assets/gallery-colours/hero-navy.webp",
};

const defaultPillows: PillowChoice[] = Array.from({ length: 4 }, () => ({
  colour: "white",
  height: "regular",
}));

const bundles = [
  {
    id: 1,
    title: "1 Pillow",
    label: "Limited Time Sale!",
    note: "This Deal Ends Soon.",
    compareAt: "£100.00",
    upsell: "+1 Cooling Pillowcase (Protect & Cool)",
    upsellPrice: "£9.99",
    upsellCompareAt: "£19.99",
  },
  {
    id: 2,
    title: "2 Pillow Bundle",
    badge: "MOST POPULAR",
    badgeType: "popular",
    note: "Save £111.01!",
    compareAt: "£200.00",
    upsell: "+2 Cooling Pillowcases at £19.99!",
    upsellPrice: "£19.99",
    upsellCompareAt: "£39.98",
  },
  {
    id: 4,
    title: "Family Bundle 4 Pillows",
    badge: "BEST VALUE",
    badgeType: "value",
    note: "Limited Time Offer!",
    compareAt: "£400.00",
    upsell: "+4 Cooling Pillowcases For Only £29.99!",
    upsellPrice: "£29.99",
    upsellCompareAt: "£79.96",
  },
];

const colourName = (colour: PillowColour) =>
  colours.find((option) => option.id === colour)?.name || "White";

const overviewItems = [
  {
    title: "Overview",
    content:
      "Meet the CloudAlign Pillow, crafted for deep, supported sleep in any position. The 3-zone contour design delivers targeted neck lift, pressure relief, and full-body alignment. Its dual-height system adapts to side, back, and stomach sleepers without bunching or constant flipping.",
  },
  {
    title: "Materials",
    content:
      "OEKO-TEX certified cover: hypoallergenic, breathable, and gentle on skin. CloudSoft core: shape-retaining memory foam that stays supportive and flexible.",
  },
  {
    title: "Care",
    content:
      "The memory-foam core is not machine washable. Remove the included fitted cover, machine wash it at 30 C, and air dry before refitting.",
  },
];

const zoneItems = [
  {
    title: "Side Sleeper Zone",
    content:
      "Side wings relieve pressure on your shoulder and keep your neck elevated at the right angle, with room for your arm to rest naturally.",
  },
  {
    title: "Lift Side (SwitchFit Design)",
    content:
      "Designed for deeper support and lift, this side suits side sleepers or anyone who needs extra neck height and pressure relief.",
  },
  {
    title: "Soft Side (SwitchFit Design)",
    content:
      "Softer and lower, this side works for back and stomach sleepers or anyone who prefers minimal elevation.",
  },
  {
    title: "The Full Sleep System",
    content:
      "Every zone works together so your neck, spine, and shoulders remain supported, no matter how you sleep.",
  },
];

const chiropractorItems = [
  {
    title: "How It Works",
    content:
      "The CloudAlign Pillow has a high side and a low side. Flip it to match your body and sleep position, then let the contour cradle your head and neck.",
  },
  {
    title: "Chiropractor-Designed for Alignment",
    content:
      "The ergonomic shape relieves pressure points and encourages a more neutral sleeping posture.",
  },
  {
    title: "Arm Tunnel + Shoulder Relief Design",
    content:
      "The built-in arm cradle gives your shoulder room to rest naturally, reducing compression for side sleepers.",
  },
];

const faqItems = [
  {
    title: "How does the dual-height system work?",
    content:
      "Each side is a different height. Flip the pillow to find the support level that feels best for your neck and sleep position.",
  },
  {
    title: "Is this pillow good for side, back, and stomach sleepers?",
    content:
      "Yes. CloudAlign adapts to all three sleep styles by providing targeted lift and pressure relief where each position needs it.",
  },
  {
    title: "Will it flatten over time?",
    content:
      "CloudAlign uses shape-retaining memory foam designed to maintain its contour and support.",
  },
  {
    title: "Is it safe for sensitive skin?",
    content:
      "The OEKO-TEX certified cover is hypoallergenic, breathable, and gentle on sensitive skin.",
  },
];

const pressLogos = [
  "/assets/logo-press-01.avif",
  "/assets/logo-press-02.avif",
  "/assets/logo-press-03.avif",
  "/assets/logo-lifestyle.avif",
  "/assets/logo-scary-mommy.webp",
  "/assets/logo-readers-digest.avif",
  "/assets/logo-usa-today.avif",
  "/assets/logo-forbes.avif",
  "/assets/logo-press-09.avif",
];

const reviews = [
  {
    name: "Stephanie K.",
    date: "1 Aug 2025",
    image: "/assets/reviews/review-01.jpg",
    text: "I just purchased another! This is such an amazing pillow.",
  },
  {
    name: "Emma C.",
    date: "4 Aug 2025",
    image: "/assets/reviews/review-02.jpg",
    text: "It stays cool all night and gives great support for the neck. Super comfortable and just the right height for me. I loved it so much I got another one for my mum!",
  },
  {
    name: "Jessica L.",
    date: "4 Aug 2025",
    image: "/assets/reviews/review-03.jpg",
    text: "Absolutely love it. It is big, super soft, and much gentler than the cervical pillow I was planning to get. It still supports my neck and looks so much nicer too.",
  },
  {
    name: "Emily P.",
    date: "9 Aug 2025",
    image: "/assets/reviews/review-04.jpg",
    text: "I love this. I use it all around my home. I sleep on it, and sometimes I even use it as a back cushion on the sofa.",
  },
  {
    name: "Brooke S.",
    date: "11 Aug 2025",
    image: "/assets/reviews/review-05.jpg",
    text: "Honestly this is better than I expected. I kept seeing people say they loved it, so I had to try it. I have purchased four in total and cannot wait to gift them.",
  },
  {
    name: "Chloe N.",
    date: "13 Aug 2025",
    image: "/assets/reviews/review-06.jpg",
    text: "I have bought so many pillows and this cloud pillow turned out to be the best. After a few nights of sleep, it felt just right.",
  },
  {
    name: "Riley J.",
    date: "19 Aug 2025",
    image: "/assets/reviews/review-07.jpg",
    text: "I am a light sleeper and picky about bedding, but after using it for a month I can honestly say it is the best one I have had. It stays cool and supports my neck perfectly.",
  },
  {
    name: "Heather H.",
    date: "14 Sep 2025",
    image: "/assets/reviews/review-08.jpg",
    text: "I have been recommending this to my patients. I love the functionality of the pillow and Juujo did a great job creating it.",
    video: true,
  },
  {
    name: "Jordyn G.",
    date: "17 Aug 2025",
    image: "/assets/reviews/review-09.jpg",
    text: "It stays cool all night. It also helps take pressure off my neck and shoulders, so I have not been waking up in pain like I normally would.",
  },
  {
    name: "Valeria M.",
    date: "24 Aug 2025",
    image: "/assets/reviews/review-10.jpg",
    text: "This pillow exceeded my expectations. It is incredibly soft but supportive and cool to the touch. It makes you want five more minutes in bed.",
    video: true,
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, index) => (
        <Star key={index} aria-hidden="true" />
      ))}
    </span>
  );
}

function ProductQuote({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`customer-quote ${mobile ? "mobile-quote" : "desktop-quote"}`}>
      <Stars />
      <p>
        &ldquo;I did not realise how bad my old pillow was until I tried this.
        The shape, the feel, the support, everything is just right. My husband
        stole mine, so now we have two!&rdquo;
      </p>
      <strong>Stephanie P.</strong>
      <span>
        <BadgeCheck aria-hidden="true" /> Licensed product review
      </span>
    </div>
  );
}

function CounterRing({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ringRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      const frame = requestAnimationFrame(() => setDisplayValue(value));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const startedAt = performance.now();
        const duration = 1100;

        const update = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplayValue(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <article>
      <div className="counter-ring" ref={ringRef}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle className="counter-track" cx="60" cy="60" r="51" />
          <circle
            className="counter-progress"
            cx="60"
            cy="60"
            r="51"
            pathLength="100"
            style={{ strokeDashoffset: 100 - displayValue }}
          />
        </svg>
        <span>{displayValue}%</span>
      </div>
      <p>{label}</p>
    </article>
  );
}

function AccordionList({
  items,
  compact = false,
}: {
  items: { title: string; content: string }[];
  compact?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`accordion-list ${compact ? "compact" : ""}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div className="accordion-item" key={item.title}>
            <button
              type="button"
              className="accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.title}</span>
              <span className="accordion-symbol" aria-hidden="true">
                {isOpen ? "-" : "+"}
              </span>
            </button>
            <div className={`accordion-content ${isOpen ? "open" : ""}`}>
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProductPage() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedColour, setSelectedColour] =
    useState<PillowColour>("white");
  const [selectedSize, setSelectedSize] =
    useState<PillowHeight>("regular");
  const [selectedBundle, setSelectedBundle] = useState<1 | 2 | 4>(2);
  const [pillowChoices, setPillowChoices] =
    useState<PillowChoice[]>(defaultPillows);
  const [includeCovers, setIncludeCovers] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const gallerySwipeStart = useRef<number | null>(null);
  const cart = useCart();
  const selectedPillows = pillowChoices.slice(0, selectedBundle);
  const selectedUnitPriceCents = getPillowUnitPriceCents({
    colour: selectedColour,
    height: selectedSize,
  });
  const selectedTotalCents = getPillowSelectionTotalCents(
    selectedPillows,
    includeCovers,
  );
  const displayedBundlePrice = (quantity: 1 | 2 | 4) => {
    const choices =
      quantity === selectedBundle
        ? pillowChoices.slice(0, quantity)
        : Array.from({ length: quantity }, () => ({
            colour: selectedColour,
            height: selectedSize,
          }));
    return getPillowBundlePriceCents(choices);
  };
  const activeGallery = gallery.map((image, index) =>
    index === 0
      ? {
          ...image,
          src: colourHero[selectedColour],
          alt: `${colourName(selectedColour)} CloudAlign pillow with award artwork`,
        }
      : image,
  );

  const chooseColour = (colour: PillowColour) => {
    setSelectedColour(colour);
    setPillowChoices((current) =>
      current.map((pillow, index) =>
        index < selectedBundle ? { ...pillow, colour } : pillow,
      ),
    );
    setGalleryIndex(0);
  };

  const chooseHeight = (height: PillowHeight) => {
    setSelectedSize(height);
    setPillowChoices((current) =>
      current.map((pillow, index) =>
        index < selectedBundle ? { ...pillow, height } : pillow,
      ),
    );
  };

  const chooseBundle = (quantity: 1 | 2 | 4) => {
    setPillowChoices((current) =>
      current.map((pillow, index) =>
        index >= selectedBundle && index < quantity
          ? { colour: selectedColour, height: selectedSize }
          : pillow,
      ),
    );
    setSelectedBundle(quantity);
  };

  const updatePillow = (
    index: number,
    update: Partial<PillowChoice>,
  ) => {
    setPillowChoices((current) =>
      current.map((pillow, pillowIndex) =>
        pillowIndex === index ? { ...pillow, ...update } : pillow,
      ),
    );
    if (index === 0 && update.colour) {
      setSelectedColour(update.colour);
      setGalleryIndex(0);
    }
    if (index === 0 && update.height) setSelectedSize(update.height);
  };

  const addToCart = () => {
    cart.addLine({
      pillows: pillowChoices
        .slice(0, selectedBundle)
        .map((pillow) => ({ ...pillow })),
      includeCovers,
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const height = params.get("height");
    const colour = params.get("colour");
    const nextHeight =
      height === "high" || height === "regular" ? height : null;
    const nextColour =
      colour === "white" ||
      colour === "grey" ||
      colour === "blue" ||
      colour === "navy"
        ? colour
        : null;

    if (!nextHeight && !nextColour) return;
    const frame = window.requestAnimationFrame(() => {
      if (nextHeight) setSelectedSize(nextHeight);
      if (nextColour) setSelectedColour(nextColour);
      setPillowChoices((current) =>
        current.map((pillow) => ({
          colour: nextColour || pillow.colour,
          height: nextHeight || pillow.height,
        })),
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -60px", threshold: 0.08 },
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  useEffect(() => {
    const strip = thumbnailStripRef.current;
    const selected = strip?.querySelector<HTMLElement>(
      `[data-gallery-index="${galleryIndex}"]`,
    );
    if (!strip || !selected) return;

    const left =
      selected.offsetLeft - strip.clientWidth / 2 + selected.clientWidth / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [galleryIndex]);

  useEffect(() => {
    const primaryButton = document.getElementById("hero-add-to-cart");
    if (!primaryButton) return;

    const updateStickyVisibility = () => {
      setStickyVisible(primaryButton.getBoundingClientRect().bottom < 0);
    };

    updateStickyVisibility();
    window.addEventListener("scroll", updateStickyVisibility, {
      passive: true,
    });
    window.addEventListener("resize", updateStickyVisibility);

    return () => {
      window.removeEventListener("scroll", updateStickyVisibility);
      window.removeEventListener("resize", updateStickyVisibility);
    };
  }, []);

  const showPrevious = () =>
    setGalleryIndex((current) => (current - 1 + gallery.length) % gallery.length);
  const showNext = () =>
    setGalleryIndex((current) => (current + 1) % gallery.length);

  const finishGallerySwipe = (clientX: number) => {
    if (gallerySwipeStart.current === null) return;
    const distance = clientX - gallerySwipeStart.current;
    gallerySwipeStart.current = null;
    if (Math.abs(distance) < 42) return;
    if (distance > 0) showPrevious();
    else showNext();
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      void videoRef.current.play();
      setVideoPlaying(true);
      return;
    }
    videoRef.current.pause();
    setVideoPlaying(false);
  };

  return (
    <main className="approved-product-page">
      <a className="skip-link" href="#product">
        Skip to content
      </a>

      <section className="product-section" id="product">
        <div className="product-gallery">
          <div
            className="gallery-stage"
            role="group"
            aria-label="CloudAlign product gallery"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") showPrevious();
              if (event.key === "ArrowRight") showNext();
            }}
            onPointerDown={(event) => {
              gallerySwipeStart.current = event.clientX;
            }}
            onPointerUp={(event) => finishGallerySwipe(event.clientX)}
            onPointerCancel={() => {
              gallerySwipeStart.current = null;
            }}
          >
            {activeGallery.map((image, index) => (
              <img
                key={image.src}
                className={`gallery-main ${
                  galleryIndex === index ? "active" : ""
                }`}
                src={image.src}
                alt={galleryIndex === index ? image.alt : ""}
                aria-hidden={galleryIndex !== index}
              />
            ))}
            <button
              type="button"
              className="gallery-arrow previous"
              aria-label="Previous product image"
              onClick={showPrevious}
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              className="gallery-arrow next"
              aria-label="Next product image"
              onClick={showNext}
            >
              <ArrowRight />
            </button>
          </div>
          <div
            className="thumbnail-strip"
            aria-label="Product images"
            ref={thumbnailStripRef}
          >
            {activeGallery.map((image, index) => (
              <button
                type="button"
                key={image.src}
                data-gallery-index={index}
                className={index === galleryIndex ? "selected" : ""}
                aria-label={`Show product image ${index + 1}`}
                aria-pressed={index === galleryIndex}
                onClick={() => setGalleryIndex(index)}
              >
                <img src={image.src} alt="" />
              </button>
            ))}
          </div>
          <ProductQuote />
        </div>

        <div className="purchase-panel">
          <a className="rating-row" href="#reviews">
            <Stars />
            <span>(42,093)</span>
          </a>
          <h1>CloudAlign&trade; Pillow</h1>
          <div className="price-row">
            <strong>{formatMoney(selectedUnitPriceCents)}</strong>
            <del>{formatMoney(getBundle(1).compareAtCents)}</del>
          </div>
          <p className="comparable">
            Savings based on comparable value. <u>Learn more</u>
          </p>

          <fieldset className="option-fieldset">
            <legend>
              Select Colour: <strong>{colourName(selectedColour)}</strong>
            </legend>
            <div className="swatches">
              {colours.map((swatch) => (
                <button
                  type="button"
                  key={swatch.id}
                  className={selectedColour === swatch.id ? "selected" : ""}
                  aria-label={swatch.name}
                  aria-pressed={selectedColour === swatch.id}
                  title={swatch.name}
                  style={{ "--swatch": swatch.colour } as React.CSSProperties}
                  onClick={() => chooseColour(swatch.id)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="option-fieldset">
            <legend>Select Size:</legend>
            <div className="segmented-control">
              {heights.map((size) => (
                <button
                  type="button"
                  key={size.id}
                  className={selectedSize === size.id ? "selected" : ""}
                  aria-pressed={selectedSize === size.id}
                  onClick={() => chooseHeight(size.id)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="claim-list">
            {productClaims.map(({ icon: Icon, text }) => (
              <div key={text}>
                <Icon aria-hidden="true" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <p className="size-guide">
            <strong>Size Guide:</strong>
            <span>Under 5&apos;7 Tall = Regular</span>
            <span>Above 5&apos;7 Tall = High</span>
          </p>

          <div className="bundle-block">
            <h2>BUY MORE - SAVE MORE</h2>
            {bundles.map((bundle) => {
              const bundlePriceCents = displayedBundlePrice(
                bundle.id as 1 | 2 | 4,
              );
              const bundleSavings =
                getBundle(bundle.id).compareAtCents - bundlePriceCents;

              return (
                <div
                  className={`bundle-card bundle-card-${bundle.id} ${
                    selectedBundle === bundle.id ? "selected" : ""
                  }`}
                  key={bundle.id}
                >
                  {bundle.badge ? (
                    <span
                      className={`bundle-badge bundle-badge-${bundle.badgeType}`}
                    >
                      {bundle.badgeType === "popular" ? (
                        <>
                          <span>Most</span>
                          <strong>Popular</strong>
                        </>
                      ) : (
                        bundle.badge
                      )}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    className="bundle-choice"
                    onClick={() => chooseBundle(bundle.id as 1 | 2 | 4)}
                    aria-pressed={selectedBundle === bundle.id}
                  >
                  <span className="radio-dot" aria-hidden="true" />
                  <span className="bundle-copy">
                    <span className="bundle-title-line">
                      <strong>{bundle.title}</strong>
                      {bundle.label ? <b>{bundle.label}</b> : null}
                    </span>
                    <small>
                      {bundle.id === 1
                        ? bundle.note
                        : `Save ${formatMoney(bundleSavings)}!`}
                    </small>
                  </span>
                  <span className="bundle-prices">
                    <em>{formatMoney(bundlePriceCents)}</em>
                    <del>{bundle.compareAt}</del>
                  </span>
                  </button>
                  {selectedBundle === bundle.id && selectedBundle > 1 ? (
                    <div className="bundle-config" aria-label="Bundle options">
                      <p>Choose each pillow&apos;s colour and height</p>
                      {Array.from(
                        { length: selectedBundle },
                        (_, pillowIndex) => (
                          <div className="bundle-config-row" key={pillowIndex}>
                            <span className="bundle-pillow-label">
                              Pillow {pillowIndex + 1}
                            </span>
                            <fieldset className="bundle-option-group">
                              <legend>
                                Colour:{" "}
                                <strong>
                                  {colourName(
                                    pillowChoices[pillowIndex].colour,
                                  )}
                                </strong>
                              </legend>
                              <div className="swatches bundle-swatches">
                                {colours.map((colour) => (
                                  <button
                                    type="button"
                                    key={colour.id}
                                    className={
                                      pillowChoices[pillowIndex].colour ===
                                      colour.id
                                        ? "selected"
                                        : ""
                                    }
                                    aria-label={`Pillow ${pillowIndex + 1}: ${colour.name}`}
                                    aria-pressed={
                                      pillowChoices[pillowIndex].colour ===
                                      colour.id
                                    }
                                    title={colour.name}
                                    style={
                                      {
                                        "--swatch": colour.colour,
                                      } as React.CSSProperties
                                    }
                                    onClick={() =>
                                      updatePillow(pillowIndex, {
                                        colour: colour.id,
                                      })
                                    }
                                  />
                                ))}
                              </div>
                            </fieldset>
                            <fieldset className="bundle-option-group bundle-height-choice">
                              <legend>Height</legend>
                              <div className="segmented-control">
                                {heights.map((height) => (
                                  <button
                                    type="button"
                                    key={height.id}
                                    className={
                                      pillowChoices[pillowIndex].height ===
                                      height.id
                                        ? "selected"
                                        : ""
                                    }
                                    aria-label={`Pillow ${pillowIndex + 1}: ${height.name} height`}
                                    aria-pressed={
                                      pillowChoices[pillowIndex].height ===
                                      height.id
                                    }
                                    onClick={() =>
                                      updatePillow(pillowIndex, {
                                        height: height.id,
                                      })
                                    }
                                  >
                                    {height.name}
                                  </button>
                                ))}
                              </div>
                            </fieldset>
                          </div>
                        ),
                      )}
                    </div>
                  ) : null}
                  {replacementCoversAvailable ? (
                    <label className="bundle-upsell">
                      <input
                        type="checkbox"
                        checked={selectedBundle === bundle.id && includeCovers}
                        onChange={(event) => {
                          chooseBundle(bundle.id as 1 | 2 | 4);
                          setIncludeCovers(event.target.checked);
                        }}
                      />
                      <span>{bundle.upsell}</span>
                      <span className="bundle-upsell-prices">
                        <strong>{bundle.upsellPrice}</strong>
                        <del>{bundle.upsellCompareAt}</del>
                      </span>
                    </label>
                  ) : null}
                </div>
              );
            })}
          </div>

          <button
            id="hero-add-to-cart"
            type="button"
            className="add-to-cart"
            onClick={addToCart}
          >
            Add to cart - {formatMoney(selectedTotalCents)}
          </button>

          <div className="trust-row">
            <div>
              <img src="/assets/trial.webp" alt="" />
              <span>90-Night Comfort Trial</span>
            </div>
            <div>
              <img src="/assets/returns.avif" alt="" />
              <span>Hassle-Free Returns</span>
            </div>
          </div>

          <AccordionList items={overviewItems} compact />
          <ProductQuote mobile />
        </div>
      </section>

      <section
        className="press-marquee"
        aria-label="Featured publications"
        data-reveal
      >
        <div className="press-track">
          {[...pressLogos, ...pressLogos].map((logo, index) => (
            <img src={logo} alt="" key={`${logo}-${index}`} />
          ))}
        </div>
      </section>

      <section className="feature-band" id="story" data-reveal>
        <div className="feature-split">
          <div className="feature-image">
            <img
              className="cool-shift"
              src="/assets/feature-zones.webp"
              alt="CloudAlign pillow three-zone support"
            />
          </div>
          <div className="feature-copy">
            <h2>One Pillow. Three Zones. Zero Compromises</h2>
            <p>
              Say goodbye to flat pillows, awkward angles, and one-size-fits-all
              shapes. The SwitchFit design gives you dual-height support,
              ergonomic zones, and custom comfort without shifting or bunching.
            </p>
            <AccordionList items={zoneItems} compact />
          </div>
        </div>
      </section>

      <section className="reviews-section" id="reviews" data-reveal>
        <div className="section-heading">
          <p className="eyebrow">REAL SLEEPERS, REAL COMFORT</p>
          <h2>Customer reviews</h2>
        </div>
        <div className="reviews-toolbar">
          <div className="rating-breakdown">
            <strong>4.8</strong>
            <div>
              <Stars />
              <span>Based on 42,093 reviews</span>
            </div>
          </div>
          <button type="button" className="write-review">
            Write a review
          </button>
        </div>
        <div className="review-tabs" aria-label="Review type">
          <button type="button" className="selected">
            Product reviews <span>42.1k</span>
          </button>
          <button type="button">
            Store reviews <span>31</span>
          </button>
        </div>
        <div className="review-grid">
          {reviews
            .slice(0, reviewsExpanded ? reviews.length : 8)
            .map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-media">
                  <img
                    src={review.image}
                    alt={`CloudAlign pillow photographed by ${review.name}`}
                  />
                  {review.video ? (
                    <span className="review-play" aria-hidden="true">
                      <Play />
                    </span>
                  ) : null}
                </div>
                <div className="review-body">
                  <div className="review-author">
                    <strong>{review.name}</strong>
                    <span>
                      <BadgeCheck aria-hidden="true" /> Licensed review
                    </span>
                  </div>
                  <time>{review.date}</time>
                  <Stars />
                  <p>{review.text}</p>
                </div>
              </article>
            ))}
        </div>
        <div className="review-more-wrap">
          <button
            type="button"
            className="review-more"
            onClick={() => setReviewsExpanded((expanded) => !expanded)}
          >
            {reviewsExpanded ? "Show fewer reviews" : "Show more reviews"}
          </button>
        </div>
      </section>

      <section className="chiropractor-section" data-reveal>
        <div className="chiropractor-copy">
          <h2>Trusted By Chiropractors. Loved By Sleepers.</h2>
          <p>
            Dual-height design. Built-in alignment support. No fluffing needed.
            Chiropractor-approved comfort starts here.
          </p>
        </div>
        <div className="video-shell">
          <video
            ref={videoRef}
            src="/assets/chiropractor-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <button
            type="button"
            className="video-toggle"
            aria-label={videoPlaying ? "Pause video" : "Play video"}
            onClick={toggleVideo}
          >
            {videoPlaying ? <Pause /> : <Play />}
          </button>
          <span className="video-brand-label" aria-hidden="true">
            juujo
          </span>
        </div>
        <div className="chiropractor-details">
          <AccordionList items={chiropractorItems} compact />
        </div>
      </section>

      <section className="support-section" data-reveal>
        <div className="section-heading">
          <h2>Ergonomic Support That Adapts to You</h2>
        </div>
        <div className="support-grid">
          <article>
            <img
              src="/assets/feature-wing.webp"
              alt="Side sleeper resting on the CloudAlign pillow"
            />
            <h3>Side Sleeper Wing</h3>
            <p>Contours to relieve shoulder and neck pressure.</p>
          </article>
          <article>
            <img
              className="cool-shift"
              src="/assets/feature-switchfit.avif"
              alt="SwitchFit dual-height pillow design"
            />
            <h3>SwitchFit&trade; Design</h3>
            <p>Adjustable dual-height design for personalised comfort.</p>
          </article>
        </div>
      </section>

      <section className="faq-section" id="faq" data-reveal>
        <div className="faq-intro">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about the CloudAlign Pillow.</p>
        </div>
        <AccordionList items={faqItems} />
      </section>

      <section className="countup-section" data-reveal>
        <div className="section-heading">
          <h2>Trusted By Thousands Of Happy Sleepers</h2>
          <p>Real people are sleeping deeper, cooler, and more comfortably.</p>
        </div>
        <div className="counter-grid">
          <CounterRing
            value={95}
            label="of Juujo customers sleep at their ideal temperature"
          />
          <CounterRing
            value={98}
            label="would recommend Juujo to family and friends"
          />
          <CounterRing
            value={92}
            label="of Juujo customers have left 5-star reviews"
          />
        </div>
        <a className="light-button" href="#product">
          Shop Now
        </a>
      </section>

      <div
        className={`sticky-purchase-bar ${stickyVisible ? "visible" : ""}`}
        aria-hidden={!stickyVisible}
      >
        <div className="sticky-product-summary">
          <img
            src={pillowVariantImages[selectedColour]}
            alt={`${colourName(selectedColour)} CloudAlign pillow`}
            width="84"
            height="84"
          />
          <span>
            <strong>CloudAlign&trade; Pillow</strong>
            <small>
              {selectedBundle} {selectedBundle === 1 ? "pillow" : "pillows"}
              {includeCovers ? " + matching covers" : ""}
            </small>
          </span>
        </div>
        <button type="button" onClick={addToCart}>
          <ShoppingBag aria-hidden="true" />
          Add to cart - {formatMoney(selectedTotalCents)}
        </button>
      </div>
    </main>
  );
}
