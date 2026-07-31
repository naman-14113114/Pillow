import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  MoveVertical,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  WashingMachine,
} from "lucide-react";
import { ReviewGrid } from "@/components/ReviewGrid";
import { formatMoney, product, siteConfig } from "@/data/store";

export function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <img
          src="/assets/gallery/hero-bedroom.png"
          alt="White and navy CloudAlign pillows in a bright bedroom"
          width="1536"
          height="1024"
        />
        <div className="home-hero-copy">
          <p>JUUJO CLOUDALIGN PILLOW</p>
          <h1>Support that meets you where you sleep.</h1>
          <span>
            A sculpted memory-foam pillow with two contour heights and more
            room for your neck, shoulders and arms.
          </span>
          <div>
            <Link className="primary-button" href={siteConfig.productPath}>
              Shop CloudAlign from {formatMoney(4999)}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="hero-text-link" href="/pages/sleep-quiz">
              Find your height
            </Link>
          </div>
        </div>
        <div className="hero-proof">
          <strong>4.9</strong>
          <span>{siteConfig.reviewCount.toLocaleString("en-GB")} reviews</span>
        </div>
      </section>

      <section className="trust-row" aria-label="Store benefits">
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
          <ShieldCheck /> Secure PlusBase checkout
        </span>
      </section>

      <section className="home-intro">
        <div>
          <p className="eyebrow">Not another flat pillow</p>
          <h2>The shape does the adjusting for you.</h2>
        </div>
        <p>
          Six distinct areas support the head, neck and shoulders without
          forcing every sleeper into the same position. Rotate CloudAlign to
          choose a lower or higher contour.
        </p>
      </section>

      <section className="home-feature-grid">
        <article className="feature-large">
          <img
            src="/assets/gallery/model-side-sleeper.png"
            alt="Side sleeper resting on CloudAlign"
            width="1536"
            height="1024"
          />
          <div>
            <span>FOR SIDE SLEEPERS</span>
            <h2>Make room for your shoulder.</h2>
            <p>
              The curved side wing supports the neck while the lower channel
              gives your shoulder and arm space to settle.
            </p>
          </div>
        </article>
        <article>
          <img
            src="/assets/gallery/studio-product.png"
            alt="CloudAlign top and side profiles"
            width="1200"
            height="1200"
          />
          <div>
            <MoveVertical aria-hidden="true" />
            <h3>8.9 cm or 10.9 cm</h3>
            <p>Rotate the dual contour to suit your frame and mattress.</p>
          </div>
        </article>
        <article>
          <img
            src="/assets/gallery/support-zones.png"
            alt="Six CloudAlign support zones"
            width="1200"
            height="1200"
          />
          <div>
            <Sparkles aria-hidden="true" />
            <h3>Six defined support zones</h3>
            <p>A stable centre with dedicated neck and side-sleeper areas.</p>
          </div>
        </article>
      </section>

      <section className="home-colours">
        <div>
          <p className="eyebrow">Your room, your colour</p>
          <h2>White, Grey, Baby Blue or Navy Blue.</h2>
          <p>
            Every colour uses the same sculpted memory-foam core and removable
            cover. Add a matching spare cover with any bundle.
          </p>
          <Link className="text-link" href={siteConfig.productPath}>
            Explore all four <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <img
          src="/assets/gallery/four-colours.png"
          alt="Four tag-free Juujo pillow colours"
          width="1536"
          height="1024"
        />
      </section>

      <section className="quiz-band">
        <div>
          <BedDouble aria-hidden="true" />
          <p>Two minutes, four questions</p>
          <h2>Not sure which contour height fits you?</h2>
        </div>
        <Link className="light-button" href="/pages/sleep-quiz">
          Take the sleep quiz <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <ReviewGrid compact />

      <section className="home-final">
        <img
          src="/assets/gallery/bundle-packaging.png"
          alt="Juujo pillow bundle and packaging"
          width="1536"
          height="1024"
        />
        <div>
          <p className="eyebrow">Build your sleep setup</p>
          <h2>One for you. One for the person who steals yours.</h2>
          <p>{product.description}</p>
          <Link className="primary-button" href={siteConfig.productPath}>
            Choose your bundle <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
