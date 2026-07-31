import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Check,
  MoveVertical,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  WashingMachine,
} from "lucide-react";
import { ReviewGrid } from "@/components/ReviewGrid";
import { formatMoney, product, siteConfig } from "@/data/store";

const benefits = [
  ["Six sculpted zones", "Support for the head, neck, shoulders and arms."],
  ["Two contour heights", "Rotate between an 8.9 cm and 10.9 cm edge."],
  ["Shape-retaining foam", "A stable core that returns to its original form."],
  ["Washable outer cover", "Remove the fitted cover and machine wash at 30 C."],
] as const;

export function HomePage() {
  return (
    <main className="store-home">
      <section className="home-hero">
        <picture>
          <source
            media="(max-width: 700px)"
            srcSet="/assets/home/home-hero-mobile-juujo.webp"
          />
          <img
            src="/assets/home/home-hero-desktop-juujo.webp"
            alt="Three women relaxing with tag-free CloudAlign pillows"
            width="2061"
            height="763"
          />
        </picture>
        <div className="home-hero-copy">
          <p>JUUJO CLOUDALIGN PILLOW</p>
          <h1>Your pillow should fit how you sleep.</h1>
          <span>
            Sculpted memory-foam support for side, back and changing-position
            sleepers, in two heights and four calm colours.
          </span>
          <div>
            <Link className="primary-button" href={siteConfig.productPath}>
              Shop from {formatMoney(4999)}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="hero-text-link" href="/pages/sleep-quiz">
              Find your height
            </Link>
          </div>
          <small>
            <span>★★★★★</span> 4.9 from licensed product reviews
          </small>
        </div>
      </section>

      <section className="trust-row home-trust-row" aria-label="Store benefits">
        <span>
          <PackageCheck /> Free tracked delivery
        </span>
        <span>
          <MoveVertical /> Regular and High profiles
        </span>
        <span>
          <WashingMachine /> Washable removable cover
        </span>
        <span>
          <ShieldCheck /> Secure checkout
        </span>
      </section>

      <section className="home-intro">
        <div>
          <p className="eyebrow">Not another flat pillow</p>
          <h2>A shape made around the way your body reaches the bed.</h2>
        </div>
        <div>
          <p>
            CloudAlign creates dedicated space for the head, neck, shoulder
            and arm instead of asking one flat surface to support everything.
          </p>
          <Link className="text-link" href="/pages/how-it-works">
            Explore the six zones <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-product-story">
        <img
          src="/assets/gallery/model-side-sleeper.png"
          alt="Side sleeper resting on a tag-free CloudAlign pillow"
          width="1536"
          height="1024"
        />
        <div>
          <p className="eyebrow">Designed for side-sleeper space</p>
          <h2>Support your neck without crowding your shoulder.</h2>
          <p>
            The raised side wings keep the head supported while the curved
            shoulder channel gives your upper body room to settle naturally.
          </p>
          <ul>
            <li>
              <Check /> Broad central head cradle
            </li>
            <li>
              <Check /> Curved shoulder clearance
            </li>
            <li>
              <Check /> Arm-friendly side channels
            </li>
          </ul>
          <Link className="primary-button" href={siteConfig.productPath}>
            Choose your CloudAlign <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-benefit-band">
        <div className="section-heading">
          <p className="eyebrow">One considered design</p>
          <h2>Every detail has a job.</h2>
        </div>
        <div className="home-benefit-grid">
          {benefits.map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-height-section">
        <div>
          <p className="eyebrow">SwitchFit dual profile</p>
          <h2>Regular on one side. High on the other.</h2>
          <p>
            Your ideal pillow height depends on your shoulder frame, mattress
            and sleep position. CloudAlign gives you two useful contours in
            one design.
          </p>
          <div className="height-measures">
            <span>
              <strong>8.9 cm</strong>
              Regular
            </span>
            <RefreshCw aria-hidden="true" />
            <span>
              <strong>10.9 cm</strong>
              High
            </span>
          </div>
          <Link className="text-link" href="/pages/pillow-height-guide">
            Read the height guide <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <img
          src="/assets/gallery/size-guide.png"
          alt="CloudAlign Regular and High contour heights"
          width="1200"
          height="1200"
        />
      </section>

      <section className="home-colours">
        <div>
          <p className="eyebrow">Your room, your colour</p>
          <h2>White, Grey, Baby Blue or Navy Blue.</h2>
          <p>
            Every colour uses the same sculpted memory-foam core and removable
            fitted cover. Add matching spare covers to any bundle.
          </p>
          <Link className="text-link" href={siteConfig.productPath}>
            See all colours <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <img
          src="/assets/gallery/four-colours.png"
          alt="Four tag-free CloudAlign pillow colours"
          width="1536"
          height="1024"
        />
      </section>

      <section className="quiz-band">
        <div>
          <BedDouble aria-hidden="true" />
          <p>Four quick questions</p>
          <h2>Regular or High? Start with your sleep position.</h2>
        </div>
        <Link className="light-button" href="/pages/sleep-quiz">
          Take the sleep quiz <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="home-reviews-intro">
        <div>
          <p className="eyebrow">Real product feedback</p>
          <h2>See how the CloudAlign design fits different sleepers.</h2>
        </div>
        <p>
          Filter licensed product reviews by rating or open customer media for
          a closer look at the pillow in everyday bedrooms.
        </p>
      </section>
      <ReviewGrid compact />

      <section className="home-final">
        <img
          src="/assets/gallery/bundle-packaging.png"
          alt="Juujo CloudAlign pillow bundle and packaging"
          width="1536"
          height="1024"
        />
        <div>
          <Sparkles aria-hidden="true" />
          <p className="eyebrow">Build your sleep setup</p>
          <h2>One pillow, two pillows or a four-pillow home set.</h2>
          <p>{product.description}</p>
          <Link className="primary-button" href={siteConfig.productPath}>
            Choose colours and heights <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
