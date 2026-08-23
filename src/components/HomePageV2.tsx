"use client";

import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Heart,
  HelpCircle,
  MoveVertical,
  PackageCheck,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Truck,
  WashingMachine,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import {
  bundles,
  colours,
  formatMoney,
  heights,
  product,
  productFaqs,
  siteConfig,
  type BundleQuantity,
  type PillowColour,
  type PillowHeight,
} from "@/data/store";

const pressLogos = [
  ["/assets/logo-forbes.avif", "Forbes"],
  ["/assets/logo-usa-today.avif", "USA Today"],
  ["/assets/logo-readers-digest.avif", "Reader's Digest"],
  ["/assets/logo-lifestyle.avif", "Lifestyle"],
  ["/assets/logo-scary-mommy.webp", "Scary Mommy"],
] as const;

const supportZones = [
  {
    id: "head-cradle",
    number: "01",
    title: "Occipital Head Cradle",
    subtitle: "Even pressure distribution",
    description:
      "A sculpted central hollow gently cups the back of the head, preventing uncomfortable tilting and distributing skull weight evenly across high-density memory foam.",
    tag: "Head Alignment",
  },
  {
    id: "cervical-arch",
    number: "02",
    title: "Cervical Neck Arch",
    subtitle: "Natural lordotic support",
    description:
      "Fills the empty space beneath the curve of your neck with adaptive contouring that relieves pressure from tense cervical vertebrae.",
    tag: "Spinal Neutrality",
  },
  {
    id: "shoulder-relief",
    number: "03",
    title: "Shoulder Clearance Arc",
    subtitle: "Zero compression for side sleepers",
    description:
      "The ergonomic curved cut-out provides dedicated space for your shoulder to settle under the pillow without being crushed or pinched against the bed.",
    tag: "Side Sleeper Focus",
  },
  {
    id: "lateral-wings",
    number: "04",
    title: "Side-Sleeper Wings",
    subtitle: "Stable head elevation",
    description:
      "Raised side wings keep your head parallel to the mattress when turning onto your side, preventing the downward neck angle that causes morning pain.",
    tag: "No Tossing & Turning",
  },
  {
    id: "arm-tunnels",
    number: "05",
    title: "Under-Arm Rest Channels",
    subtitle: "Prevents numbness & tingling",
    description:
      "Sculpted contours give your arms a natural, comfortable resting place beneath or around the pillow, eliminating midnight pins and needles.",
    tag: "Arm Comfort",
  },
  {
    id: "switchfit-profile",
    number: "06",
    title: "SwitchFit™ Dual-Height Core",
    subtitle: "8.9 cm Regular & 10.9 cm High in one pillow",
    description:
      "Simply rotate the pillow 180 degrees to switch between low and high contours to match your shoulder width and sleep position.",
    tag: "Custom Fit",
  },
] as const;

const customerReviewHighlights = [
  {
    name: "Stephanie K.",
    rating: 5,
    date: "Verified UK Customer",
    badge: "Side Sleeper",
    title: "Bought another one for my partner",
    text: "The shape feels completely different from any pillow I have tried. It is soft where I want it and still gives my neck solid support. No more folding pillows in half!",
    image: "/assets/reviews/review-01.jpg",
  },
  {
    name: "Emma C.",
    rating: 5,
    date: "Verified UK Customer",
    badge: "Neck Pain Relief",
    title: "Stays cool and supportive all night",
    text: "I used to wake up every morning with a stiff neck. After 3 nights on the OrthoAlign, the tightness was gone. The shoulder cut-out is genius.",
    image: "/assets/reviews/review-02.jpg",
  },
  {
    name: "Jessica L.",
    rating: 5,
    date: "Verified UK Customer",
    badge: "Gentle Contour",
    title: "Much softer than clinical cervical pillows",
    text: "It is broad, soft, and much less clinical-looking than typical medical pillows, while still keeping my neck perfectly level.",
    image: "/assets/reviews/review-03.jpg",
  },
  {
    name: "Brooke S.",
    rating: 5,
    date: "Verified UK Customer",
    badge: "Gifted 4 Total",
    title: "Better than I ever expected",
    text: "I kept seeing people rave about this cloud pillow shape and finally ordered the duo bundle. The materials feel exceptionally luxurious.",
    image: "/assets/reviews/review-05.jpg",
  },
];

export function HomePageV2() {
  const cart = useCart();
  const [selectedColour, setSelectedColour] = useState<PillowColour>("white");
  const [selectedHeight, setSelectedHeight] = useState<PillowHeight>("regular");
  const [heroImageTab, setHeroImageTab] = useState<"stack" | "sleep">("stack");
  const [activeZone, setActiveZone] = useState(0);
  const [selectedBundleQuantity, setSelectedBundleQuantity] =
    useState<BundleQuantity>(2);
  const [includeCovers, setIncludeCovers] = useState(true);
  const [bundlePillows, setBundlePillows] = useState<
    Array<{ colour: PillowColour; height: PillowHeight }>
  >([
    { colour: "white", height: "regular" },
    { colour: "blue", height: "high" },
  ]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Sync bundle pillows length with selected quantity
  const handleSelectBundleQuantity = (quantity: BundleQuantity) => {
    setSelectedBundleQuantity(quantity);
    setBundlePillows((current) => {
      if (quantity === current.length) return current;
      if (quantity < current.length) return current.slice(0, quantity);
      const fallback = current.at(-1) ?? {
        colour: "white" as const,
        height: "regular" as const,
      };
      return Array.from({ length: quantity }, (_, index) =>
        current[index] ? { ...current[index] } : { ...fallback },
      );
    });
  };

  const updateBundlePillow = (
    index: number,
    field: "colour" | "height",
    value: PillowColour | PillowHeight,
  ) => {
    setBundlePillows((current) =>
      current.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleAddSelectedBundleToCart = () => {
    cart.addLine({
      pillows: bundlePillows.map((p) => ({ ...p })),
      includeCovers,
    });
  };

  const handleQuickAddHeroToCart = () => {
    cart.addLine({
      pillows: [{ colour: selectedColour, height: selectedHeight }],
      includeCovers: false,
    });
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      void videoRef.current.play();
      setVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      setStickyBarVisible(heroBottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="juujo-v2-main">
      {/* 1. HERO SECTION */}
      <section className="juujo-v2-hero" ref={heroRef}>
        <div className="juujo-v2-container juujo-v2-hero-grid">
          {/* Left Column: Conversion Copy & Quick Configuration */}
          <div className="juujo-v2-hero-content">
            <div className="juujo-v2-hero-badge">
              <span className="juujo-v2-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="star-icon filled" />
                ))}
              </span>
              <strong>4.9/5 RATED</strong>
              <span>from 42,093+ licensed product reviews</span>
            </div>

            <h1 className="juujo-v2-hero-title">
              Wake up without neck tension or shoulder pain.
            </h1>

            <p className="juujo-v2-hero-subtitle">
              The sculpted cloud pillow engineered with 6 anatomical support
              zones and the SwitchFit™ dual-height contour system. Designed to
              eliminate midnight tossing and turning for side, back, and stomach
              sleepers.
            </p>

            {/* Micro Feature Pills */}
            <div className="juujo-v2-hero-pills">
              <span className="juujo-v2-pill">
                <Sparkles className="pill-icon" /> 6 Support Zones
              </span>
              <span className="juujo-v2-pill">
                <MoveVertical className="pill-icon" /> Dual-Height SwitchFit™
              </span>
              <span className="juujo-v2-pill">
                <WashingMachine className="pill-icon" /> Washable Cover
              </span>
              <span className="juujo-v2-pill">
                <ShieldCheck className="pill-icon" /> Shape-Retaining Memory Foam
              </span>
            </div>

            {/* Quick-Select Hero Box */}
            <div className="juujo-v2-hero-box">
              <div className="juujo-v2-hero-selectors">
                {/* Colour Swatch */}
                <div className="hero-selector-group">
                  <label>
                    Colour:{" "}
                    <strong>
                      {colours.find((c) => c.id === selectedColour)?.name}
                    </strong>
                  </label>
                  <div className="hero-swatch-row">
                    {colours.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`hero-swatch-btn ${
                          selectedColour === option.id ? "active" : ""
                        }`}
                        title={option.name}
                        onClick={() => setSelectedColour(option.id)}
                        style={{ backgroundColor: option.swatch }}
                        aria-label={`Select ${option.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Height Selector */}
                <div className="hero-selector-group">
                  <label>
                    Profile:{" "}
                    <strong>
                      {heights.find((h) => h.id === selectedHeight)?.name} (
                      {heights.find((h) => h.id === selectedHeight)?.depth})
                    </strong>
                  </label>
                  <div className="hero-segmented-control">
                    {heights.map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        className={`hero-seg-btn ${
                          selectedHeight === h.id ? "active" : ""
                        }`}
                        onClick={() => setSelectedHeight(h.id)}
                      >
                        {h.name} ({h.depth})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="juujo-v2-hero-buy-row">
                <div className="hero-price-wrap">
                  <span className="hero-current-price">{formatMoney(4999)}</span>
                  <span className="hero-compare-price">{formatMoney(10000)}</span>
                  <span className="hero-save-badge">50% OFF</span>
                </div>

                <div className="hero-actions-wrap">
                  <button
                    type="button"
                    className="juujo-v2-btn-primary"
                    onClick={handleQuickAddHeroToCart}
                  >
                    Add to Basket <ArrowRight className="btn-arrow" />
                  </button>
                  <a href="#bundles" className="juujo-v2-btn-secondary">
                    View Multi-Pillow Bundles
                  </a>
                </div>
              </div>

              {/* Micro Trust Row */}
              <div className="juujo-v2-micro-trust">
                <span>
                  <Truck className="trust-icon" /> Free UK Tracked Delivery
                </span>
                <span>
                  <Clock className="trust-icon" /> 30-Day Risk-Free Trial
                </span>
                <span>
                  <ShieldCheck className="trust-icon" /> 2-Year Core Warranty
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Interactive Floating Badges & Image Toggle */}
          <div className="juujo-v2-hero-visual-col">
            <div className="juujo-v2-hero-card">
              <img
                src={
                  heroImageTab === "stack"
                    ? "/assets/v2/lifestyle-cloud-stack.webp"
                    : "/assets/v2/lifestyle-blonde-side-sleeper.webp"
                }
                alt="Juujo OrthoAlign Ergonomic Contour Memory Foam Pillow"
                className="juujo-v2-hero-image"
                width={819}
                height={1024}
              />

              {/* Image Toggle Switch */}
              <div className="hero-image-toggle-strip">
                <button
                  type="button"
                  className={`hero-toggle-btn ${heroImageTab === "stack" ? "active" : ""}`}
                  onClick={() => setHeroImageTab("stack")}
                >
                  Cloud Structure
                </button>
                <button
                  type="button"
                  className={`hero-toggle-btn ${heroImageTab === "sleep" ? "active" : ""}`}
                  onClick={() => setHeroImageTab("sleep")}
                >
                  Side Sleep Position
                </button>
              </div>

              {/* Floating Highlight 1: Dual-Height SwitchFit */}
              <div className="juujo-v2-float-badge badge-top-left">
                <div className="float-icon-wrap">
                  <MoveVertical className="float-icon" />
                </div>
                <div className="float-text-wrap">
                  <strong>SwitchFit™ System</strong>
                  <span>8.9 cm & 10.9 cm dual height</span>
                </div>
              </div>

              {/* Floating Highlight 2: Shoulder Arc */}
              <div className="juujo-v2-float-badge badge-mid-right">
                <div className="float-icon-wrap">
                  <Heart className="float-icon" />
                </div>
                <div className="float-text-wrap">
                  <strong>Zero Shoulder Pinch</strong>
                  <span>Dedicated arm & neck relief</span>
                </div>
              </div>

              {/* Floating Highlight 3: Washable Cover */}
              <div className="juujo-v2-float-badge badge-bottom-left">
                <div className="float-icon-wrap">
                  <WashingMachine className="float-icon" />
                </div>
                <div className="float-text-wrap">
                  <strong>Ice-Weave Cover</strong>
                  <span>Breathable & machine-washable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRESS & MEDIA MARQUEE */}
      <section className="juujo-v2-press-section" aria-label="As featured in">
        <div className="juujo-v2-container">
          <p className="juujo-v2-press-label">
            FEATURED & RECOGNISED ACROSS LEADING MEDIA
          </p>
          <div className="juujo-v2-press-logos">
            {pressLogos.map(([src, alt]) => (
              <div key={src} className="press-logo-wrapper">
                <img src={src} alt={alt} className="press-logo-img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY TRADITIONAL PILLOWS FAIL (PROBLEM VS SOLUTION) */}
      <section className="juujo-v2-section juujo-v2-vs-section">
        <div className="juujo-v2-container">
          <div className="juujo-v2-section-header">
            <span className="juujo-v2-eyebrow">The Sleep Problem Solved</span>
            <h2 className="juujo-v2-section-title">
              Why Traditional Flat Pillows Are Ruining Your Morning.
            </h2>
            <p className="juujo-v2-section-lead">
              Flat, unsupportive pillows bend your neck at an unnatural angle and
              compress your shoulder joints. OrthoAlign was engineered to
              realign your spine and give every part of your body space to rest.
            </p>
          </div>

          <div className="juujo-v2-vs-grid">
            {/* Traditional Flat Pillows */}
            <div className="juujo-v2-vs-card vs-traditional">
              <div className="vs-card-header">
                <span className="vs-status-badge badge-negative">❌ Traditional Flat Pillows</span>
                <h3>The Daily Pain Cycle</h3>
              </div>
              <ul className="vs-list">
                <li>
                  <strong>Crushes your cervical spine:</strong> Head tilts
                  excessively down or up, putting continuous strain on your neck
                  muscles.
                </li>
                <li>
                  <strong>Pinches shoulders & nerves:</strong> No dedicated
                  shoulder clearance leads to numbness, tingling arms, and
                  shoulder soreness.
                </li>
                <li>
                  <strong>Flattens after 2 hours:</strong> Loose feather and
                  fibre fillings clump together, forcing you to repeatedly punch
                  and fold the pillow.
                </li>
                <li>
                  <strong>Traps body heat:</strong> Dense non-breathable fabrics
                  trap hot air, making you flip to the cool side all night.
                </li>
              </ul>
            </div>

            {/* Juujo OrthoAlign */}
            <div className="juujo-v2-vs-card vs-juujo">
              <div className="vs-card-header">
                <span className="vs-status-badge badge-positive">
                  ✨ Juujo OrthoAlign™ Pillow
                </span>
                <h3>Anatomical Cloud Sleep</h3>
              </div>
              <ul className="vs-list">
                <li>
                  <strong>100% Neutral Spinal Posture:</strong> Central head
                  cradle and cervical arch keep your head, neck, and spine in a
                  straight, restful line.
                </li>
                <li>
                  <strong>Curved Shoulder Relief:</strong> Sculpted side wings
                  and shoulder contours relieve joint compression for true
                  weightless comfort.
                </li>
                <li>
                  <strong>High-Density Shape Retention:</strong> CloudSoft™
                  memory foam adapts to your body and bounces back to its
                  original sculpted form every morning.
                </li>
                <li>
                  <strong>Stays Cool & Fresh:</strong> Breathable, removable
                  cooling cover allows airflow and washes clean at 30°C.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3B. SIDE SLEEPING DEEP-DIVE WITH MALE SLEEPER VISUAL */}
      <section className="juujo-v2-section juujo-v2-sidesleeper-section">
        <div className="juujo-v2-container juujo-v2-sidesleeper-grid">
          <div className="sidesleeper-visual-col">
            <div className="sidesleeper-image-card">
              <img
                src="/assets/v2/lifestyle-man-side-sleeper.webp"
                alt="Man side sleeping comfortably with proper cervical spine alignment on Juujo OrthoAlign pillow"
                className="sidesleeper-img"
                width={1024}
                height={1024}
              />
              <div className="sidesleeper-annotation">
                <CheckCircle2 className="ann-icon" />
                <span>100% Level Spinal Alignment</span>
              </div>
            </div>
          </div>

          <div className="sidesleeper-copy-col">
            <span className="juujo-v2-eyebrow">Zero Pressure Side Sleeping</span>
            <h2>Eliminate The Dreaded Shoulder Gap.</h2>
            <p>
              74% of UK adults sleep on their side. When you lie sideways, the
              gap between your shoulder and head requires exact elevation. Too
              little height strains your neck downward; too much lifts your spine
              out of alignment.
            </p>
            <div className="sidesleeper-feature-points">
              <div className="ssf-point">
                <div className="ssf-dot" />
                <div>
                  <strong>Shoulder Clearance Channel:</strong> Curves around
                  your shoulder so you never sleep directly on the joint.
                </div>
              </div>
              <div className="ssf-point">
                <div className="ssf-dot" />
                <div>
                  <strong>Lateral Head Lift:</strong> Holds your head firmly at
                  bed-parallel height through the entire sleep cycle.
                </div>
              </div>
              <div className="ssf-point">
                <div className="ssf-dot" />
                <div>
                  <strong>Under-Arm Rest:</strong> Lets your arm wrap naturally
                  around or beneath the contour without loss of circulation.
                </div>
              </div>
            </div>
            <a href="#bundles" className="juujo-v2-btn-primary">
              Order Your Side Sleeper Pillow <ArrowRight className="btn-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE 6-ZONE ANATOMICAL ANATOMY */}
      <section className="juujo-v2-section juujo-v2-zones-section" id="how-it-works">
        <div className="juujo-v2-container">
          <div className="juujo-v2-section-header">
            <span className="juujo-v2-eyebrow">Sculpted Sleep Engineering</span>
            <h2 className="juujo-v2-section-title">
              Six Anatomical Zones. Zero Compromise.
            </h2>
            <p className="juujo-v2-section-lead">
              Every single contour on the OrthoAlign pillow serves a clinical
              ergonomic purpose. Click each zone below to explore how it
              supports your body.
            </p>
          </div>

          <div className="juujo-v2-zones-interactive">
            {/* Zone Selector Tabs */}
            <div className="juujo-v2-zones-nav">
              {supportZones.map((zone, index) => (
                <button
                  key={zone.id}
                  type="button"
                  className={`zone-nav-btn ${
                    activeZone === index ? "active" : ""
                  }`}
                  onClick={() => setActiveZone(index)}
                >
                  <span className="zone-btn-number">{zone.number}</span>
                  <div className="zone-btn-text">
                    <strong>{zone.title}</strong>
                    <small>{zone.tag}</small>
                  </div>
                </button>
              ))}
            </div>

            {/* Zone Detail Display */}
            <div className="juujo-v2-zone-display">
              <div className="zone-display-image-wrap">
                <img
                  src="/assets/gallery/support-zones.png"
                  alt="Juujo OrthoAlign six ergonomic support zones diagram"
                  className="zone-display-img"
                  width={1255}
                  height={1255}
                />
                <div className="zone-active-pill">
                  Active Zone: {supportZones[activeZone].number} —{" "}
                  {supportZones[activeZone].title}
                </div>
              </div>

              <div className="zone-display-copy">
                <span className="zone-copy-tag">
                  {supportZones[activeZone].tag}
                </span>
                <h3>{supportZones[activeZone].title}</h3>
                <h4>{supportZones[activeZone].subtitle}</h4>
                <p>{supportZones[activeZone].description}</p>

                <div className="zone-feature-points">
                  <div className="zone-point">
                    <CheckCircle2 className="point-icon" />
                    <span>Reduces morning cervical tension</span>
                  </div>
                  <div className="zone-point">
                    <CheckCircle2 className="point-icon" />
                    <span>Eliminates shoulder and neck pinching</span>
                  </div>
                  <div className="zone-point">
                    <CheckCircle2 className="point-icon" />
                    <span>Adapts to side, back, and stomach postures</span>
                  </div>
                </div>

                <a href="#bundles" className="juujo-v2-btn-primary">
                  Order OrthoAlign Now <ArrowRight className="btn-arrow" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISUAL LIFESTYLE SHOWCASE GRID (ADJUSTED BLUE THEME IMAGES) */}
      <section className="juujo-v2-section juujo-v2-lifestyle-section">
        <div className="juujo-v2-container">
          <div className="juujo-v2-section-header">
            <span className="juujo-v2-eyebrow">Everyday Comfort</span>
            <h2 className="juujo-v2-section-title">
              Designed For Real Homes & Restful Nights.
            </h2>
            <p className="juujo-v2-section-lead">
              From morning stretches to deep restorative sleep, see how the
              Juujo OrthoAlign transforms bedrooms across the UK.
            </p>
          </div>

          <div className="juujo-v2-lifestyle-grid">
            {/* Banner Card */}
            <div className="lifestyle-grid-card card-span-2">
              <img
                src="/assets/v2/lifestyle-peaceful-banner.webp"
                alt="Woman relaxing peacefully with a Juujo cloud pillow on comfortable duvets"
                className="lifestyle-card-img"
                width={1024}
                height={576}
              />
              <div className="lifestyle-card-overlay">
                <span className="lifestyle-badge">Cloud-Soft Comfort</span>
                <h3>Tactile cloud comfort for every hour of relaxation.</h3>
                <p>
                  Softer than feather pillows, more supportive than solid memory
                  foam.
                </p>
              </div>
            </div>

            {/* Brunette Pillow Lift */}
            <div className="lifestyle-grid-card">
              <img
                src="/assets/v2/lifestyle-brunette-pillow-lift.webp"
                alt="Smiling model holding the Juujo OrthoAlign pillow behind head"
                className="lifestyle-card-img"
                width={1024}
                height={1024}
              />
              <div className="lifestyle-card-overlay">
                <span className="lifestyle-badge">Sculpted Foam</span>
                <h3>Shape retention that never clumps or sags.</h3>
              </div>
            </div>

            {/* Duo Friends Bed */}
            <div className="lifestyle-grid-card">
              <img
                src="/assets/v2/lifestyle-duo-friends-bed.webp"
                alt="Two friends smiling in bed hugging Juujo OrthoAlign pillows"
                className="lifestyle-card-img"
                width={1024}
                height={1024}
              />
              <div className="lifestyle-card-overlay">
                <span className="lifestyle-badge">Duo Pack Favourite</span>
                <h3>Double the comfort for you and your partner.</h3>
              </div>
            </div>

            {/* Couple Card */}
            <div className="lifestyle-grid-card">
              <img
                src="/assets/v2/lifestyle-couple-bed.webp"
                alt="Couple smiling in bed holding the Juujo OrthoAlign pillow"
                className="lifestyle-card-img"
                width={1024}
                height={1024}
              />
              <div className="lifestyle-card-overlay">
                <span className="lifestyle-badge">Better Sleep Together</span>
                <h3>Quiet nights with zero motion transfer.</h3>
              </div>
            </div>

            {/* Overhead Dual Sleepers Card */}
            <div className="lifestyle-grid-card">
              <img
                src="/assets/v2/lifestyle-overhead-sleepers.webp"
                alt="Overhead view of two sleepers resting on Juujo cloud pillows"
                className="lifestyle-card-img"
                width={818}
                height={1024}
              />
              <div className="lifestyle-card-overlay">
                <span className="lifestyle-badge">Universal Alignment</span>
                <h3>Ideal for side, back, and restless sleepers.</h3>
              </div>
            </div>

            {/* Bed Lift Card */}
            <div className="lifestyle-grid-card">
              <img
                src="/assets/v2/lifestyle-bed-lift.webp"
                alt="Woman smiling happily in bed lifting the Juujo OrthoAlign pillow"
                className="lifestyle-card-img"
                width={819}
                height={1024}
              />
              <div className="lifestyle-card-overlay">
                <span className="lifestyle-badge">Morning Energy</span>
                <h3>Wake up feeling genuinely refreshed.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SWITCHFIT™ DUAL-HEIGHT SELECTOR & SIZE GUIDE */}
      <section className="juujo-v2-section juujo-v2-height-section">
        <div className="juujo-v2-container">
          <div className="juujo-v2-height-box">
            <div className="height-box-copy">
              <span className="juujo-v2-eyebrow">SwitchFit™ System</span>
              <h2>Two Height Profiles. One Perfect Night.</h2>
              <p>
                Your ideal pillow height depends on your shoulder width, sleep
                position, and mattress firmness. OrthoAlign gives you both
                contours in every pillow—just rotate to switch.
              </p>

              <div className="height-comparison-cards">
                <div className="height-card">
                  <div className="height-card-header">
                    <span className="height-val">8.9 cm</span>
                    <strong>Regular Profile</strong>
                  </div>
                  <p>
                    Best for smaller to medium frames, dedicated back sleepers,
                    and sleepers using medium-soft to soft mattresses.
                  </p>
                </div>

                <div className="height-card">
                  <div className="height-card-header">
                    <span className="height-val">10.9 cm</span>
                    <strong>High Profile</strong>
                  </div>
                  <p>
                    Best for taller or broader shoulders (5&apos;7&quot;+),
                    dedicated side sleepers, and sleepers using firm mattresses.
                  </p>
                </div>
              </div>

              <div className="height-cta-row">
                <Link href="/pages/sleep-quiz" className="juujo-v2-btn-secondary">
                  <BedDouble className="btn-icon" /> Take the 30-Sec Height Quiz
                </Link>
                <Link
                  href="/pages/pillow-height-guide"
                  className="juujo-v2-text-link"
                >
                  Read Complete Height Guide →
                </Link>
              </div>
            </div>

            <div className="height-box-visual">
              <img
                src="/assets/gallery/size-guide.png"
                alt="OrthoAlign Regular 8.9cm and High 10.9cm height dimensions guide"
                className="height-guide-img"
                width={1427}
                height={1427}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. DIRECT BUNDLE BUILDER & ADD TO BASKET (HIGH CONVERTING) */}
      <section className="juujo-v2-section juujo-v2-bundles-section" id="bundles">
        <div className="juujo-v2-container">
          <div className="juujo-v2-section-header">
            <span className="juujo-v2-eyebrow">Buy More, Save More</span>
            <h2 className="juujo-v2-section-title">
              Choose Your OrthoAlign Bundle
            </h2>
            <p className="juujo-v2-section-lead">
              Enjoy limited-time multi-pillow savings with free tracked UK
              delivery and our 30-day sleep comfort trial.
            </p>
          </div>

          <div className="juujo-v2-bundles-grid">
            {bundles.map((bundle) => {
              const isSelected = selectedBundleQuantity === bundle.quantity;
              return (
                <div
                  key={bundle.quantity}
                  className={`juujo-v2-bundle-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => handleSelectBundleQuantity(bundle.quantity)}
                >
                  {bundle.badge && (
                    <div className="bundle-popular-ribbon">
                      {bundle.badge}
                    </div>
                  )}

                  <div className="bundle-card-top">
                    <div className="bundle-radio-indicator">
                      <div className="radio-circle" />
                    </div>
                    <div className="bundle-title-col">
                      <h3>{bundle.name}</h3>
                      <span className="bundle-note">
                        {bundle.quantity === 1
                          ? "Single sleeper trial"
                          : bundle.quantity === 2
                          ? "Save £111.01 — Most popular"
                          : "Save £248.01 — Best family value"}
                      </span>
                    </div>
                    <div className="bundle-price-col">
                      <span className="bundle-current-price">
                        {formatMoney(bundle.priceCents)}
                      </span>
                      <del className="bundle-compare-price">
                        {formatMoney(bundle.compareAtCents)}
                      </del>
                    </div>
                  </div>

                  {/* Multi-pillow configuration when selected */}
                  {isSelected && bundle.quantity > 1 && (
                    <div
                      className="bundle-config-dropdowns"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="config-label">
                        Customise each pillow&apos;s colour and height:
                      </p>
                      {bundlePillows.map((pillow, pIndex) => (
                        <div key={pIndex} className="bundle-pillow-row">
                          <span className="pillow-row-tag">
                            Pillow #{pIndex + 1}
                          </span>
                          <select
                            value={pillow.colour}
                            onChange={(e) =>
                              updateBundlePillow(
                                pIndex,
                                "colour",
                                e.target.value as PillowColour,
                              )
                            }
                            className="bundle-select"
                          >
                            {colours.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                          <select
                            value={pillow.height}
                            onChange={(e) =>
                              updateBundlePillow(
                                pIndex,
                                "height",
                                e.target.value as PillowHeight,
                              )
                            }
                            className="bundle-select"
                          >
                            {heights.map((h) => (
                              <option key={h.id} value={h.id}>
                                {h.name} ({h.depth})
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optional Cooling Cover Add-on */}
                  {isSelected && (
                    <div
                      className="bundle-upsell-box"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label className="bundle-upsell-label">
                        <input
                          type="checkbox"
                          checked={includeCovers}
                          onChange={(e) => setIncludeCovers(e.target.checked)}
                        />
                        <div className="upsell-text">
                          <strong>
                            Add {bundle.quantity}x Extra Cooling Cover
                            {bundle.quantity > 1 ? "s" : ""}
                          </strong>
                          <span>
                            Protect your pillows & wash anytime at 30°C
                          </span>
                        </div>
                        <div className="upsell-price">
                          <strong>+{formatMoney(bundle.coverPriceCents)}</strong>
                          <del>{formatMoney(bundle.coverCompareAtCents)}</del>
                        </div>
                      </label>
                    </div>
                  )}

                  {/* Add to Basket Action */}
                  <button
                    type="button"
                    className="bundle-add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectBundleQuantity(bundle.quantity);
                      handleAddSelectedBundleToCart();
                    }}
                  >
                    Add {bundle.name} to Basket <ArrowRight className="btn-arrow" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="juujo-v2-guarantee-strip">
            <div className="guarantee-item">
              <Truck className="g-icon" />
              <div>
                <strong>Free Tracked Delivery</strong>
                <span>Dispatched directly across the UK</span>
              </div>
            </div>
            <div className="guarantee-item">
              <RotateCcw className="g-icon" />
              <div>
                <strong>30-Day Risk-Free Trial</strong>
                <span>Sleep on it in your own bed</span>
              </div>
            </div>
            <div className="guarantee-item">
              <ShieldCheck className="g-icon" />
              <div>
                <strong>100% Satisfaction</strong>
                <span>Dedicated UK email & customer support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CHIROPRACTIC & ALIGNMENT VIDEO SHOWCASE */}
      <section className="juujo-v2-section juujo-v2-chiro-section">
        <div className="juujo-v2-container juujo-v2-chiro-grid">
          <div className="chiro-video-col">
            <div className="chiro-video-wrapper">
              <video
                ref={videoRef}
                src="/assets/chiropractor-loop.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="chiro-video-element"
              />
              <button
                type="button"
                className="video-play-toggle"
                onClick={toggleVideo}
                aria-label={videoPlaying ? "Pause video" : "Play video"}
              >
                {videoPlaying ? <Pause /> : <Play />}
              </button>
              <span className="chiro-brand-badge">juujo</span>
            </div>
          </div>

          <div className="chiro-copy-col">
            <span className="juujo-v2-eyebrow">Clinical Ergonomics</span>
            <h2>Loved by Sleepers. Recommended by Chiropractors.</h2>
            <p>
              When your neck is properly supported during sleep, muscle tension
              subsides, cervical discs decompress, and blood flow circulates
              freely.
            </p>

            <div className="chiro-benefits-list">
              <div className="chiro-b-item">
                <Stethoscope className="chiro-b-icon" />
                <div>
                  <strong>Spinal De-Loading</strong>
                  <p>
                    Neutralises pressure on the upper vertebrae so neck muscles
                    can fully relax into deep sleep.
                  </p>
                </div>
              </div>

              <div className="chiro-b-item">
                <Zap className="chiro-b-icon" />
                <div>
                  <strong>Zero Nerve Compression</strong>
                  <p>
                    Sculpted side channels relieve pressure on the brachial
                    plexus nerve cluster in the shoulder.
                  </p>
                </div>
              </div>

              <div className="chiro-b-item">
                <Sparkles className="chiro-b-icon" />
                <div>
                  <strong>Deeper REM Cycles</strong>
                  <p>
                    Less physical discomfort means fewer micro-arousals and more
                    restorative sleep throughout the night.
                  </p>
                </div>
              </div>
            </div>

            <a href="#bundles" className="juujo-v2-btn-primary">
              Choose Your Support Level <ArrowRight className="btn-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. REAL CUSTOMER REVIEWS GRID */}
      <section className="juujo-v2-section juujo-v2-reviews-section" id="reviews">
        <div className="juujo-v2-container">
          <div className="juujo-v2-section-header">
            <span className="juujo-v2-eyebrow">Real Verified Sleepers</span>
            <h2 className="juujo-v2-section-title">
              Over 42,000 UK Customers Sleep Better.
            </h2>
            <div className="reviews-score-hero">
              <div className="reviews-score-num">4.9</div>
              <div className="reviews-score-stars-col">
                <div className="juujo-v2-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="star-icon filled" />
                  ))}
                </div>
                <span>Based on 42,093 licensed product reviews</span>
              </div>
            </div>
          </div>

          <div className="juujo-v2-reviews-grid">
            {customerReviewHighlights.map((rev) => (
              <div key={rev.name} className="juujo-v2-review-card">
                <div className="review-card-top">
                  <img
                    src={rev.image}
                    alt={rev.name}
                    className="review-avatar"
                  />
                  <div className="review-user-info">
                    <strong>{rev.name}</strong>
                    <div className="review-meta-row">
                      <span className="verified-badge">
                        <Check className="check-icon" /> {rev.date}
                      </span>
                      <span className="sleeper-tag">{rev.badge}</span>
                    </div>
                  </div>
                </div>

                <div className="juujo-v2-stars card-stars">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="star-icon filled" />
                  ))}
                </div>

                <h4>&ldquo;{rev.title}&rdquo;</h4>
                <p>{rev.text}</p>
              </div>
            ))}
          </div>

          <div className="reviews-more-cta">
            <Link
              href="/pages/customer-reviews"
              className="juujo-v2-btn-secondary"
            >
              Read All 42,000+ Customer Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* 10. PRODUCT SPECIFICATIONS TABLE */}
      <section className="juujo-v2-section juujo-v2-specs-section">
        <div className="juujo-v2-container">
          <div className="juujo-v2-specs-box">
            <div className="specs-header">
              <span className="juujo-v2-eyebrow">Specifications & Quality</span>
              <h2>Juujo OrthoAlign At A Glance</h2>
            </div>
            <div className="specs-grid">
              {product.specifications.map(([label, value]) => (
                <div key={label} className="spec-row">
                  <span className="spec-label">{label}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQS ACCORDION */}
      <section className="juujo-v2-section juujo-v2-faq-section" id="faqs">
        <div className="juujo-v2-container">
          <div className="juujo-v2-section-header">
            <span className="juujo-v2-eyebrow">Got Questions?</span>
            <h2 className="juujo-v2-section-title">
              Frequently Asked Questions
            </h2>
            <p className="juujo-v2-section-lead">
              Everything you need to know about the Juujo OrthoAlign pillow,
              care instructions, and delivery.
            </p>
          </div>

          <div className="juujo-v2-faq-list">
            {productFaqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={faq.question}
                  className={`faq-accordion-item ${isOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-trigger-btn"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`faq-chevron ${isOpen ? "rotate" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="faq-content-body">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. FINAL CALL TO ACTION */}
      <section className="juujo-v2-final-cta-section">
        <div className="juujo-v2-container">
          <div className="final-cta-card">
            <div className="final-cta-content">
              <span className="final-cta-eyebrow">
                <Sparkles className="cta-sparkle" /> 30-Day Risk-Free Trial
              </span>
              <h2>Ready to experience pain-free, cloud-like sleep?</h2>
              <p>
                Upgrade your bedtime routine today with the Juujo OrthoAlign
                Pillow. Free UK tracked shipping on all orders.
              </p>
              <div className="final-cta-buttons">
                <a href="#bundles" className="juujo-v2-btn-primary btn-large">
                  Claim Your 50% Discount <ArrowRight className="btn-arrow" />
                </a>
              </div>
            </div>
            <div className="final-cta-image-wrap">
              <img
                src="/assets/v2/lifestyle-sitting-hug-square.webp"
                alt="Customer holding the Juujo OrthoAlign pillow"
                className="final-cta-img"
                width={700}
                height={550}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 13. STICKY MOBILE QUICK-BUY BAR */}
      <div className={`juujo-v2-sticky-buy-bar ${stickyBarVisible ? "visible" : ""}`}>
        <div className="sticky-bar-left">
          <span className="sticky-title">Juujo OrthoAlign™ Pillow</span>
          <div className="sticky-price-row">
            <strong>{formatMoney(4999)}</strong>
            <del>{formatMoney(10000)}</del>
            <span className="sticky-save">50% OFF</span>
          </div>
        </div>
        <a href="#bundles" className="sticky-buy-btn">
          Select Bundle <ArrowRight className="btn-arrow-sm" />
        </a>
      </div>
    </main>
  );
}
