import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Check,
  MoveVertical,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  WashingMachine,
} from "lucide-react";
import { ReviewGrid } from "@/components/ReviewGrid";
import {
  colours,
  formatMoney,
  heights,
  product,
  siteConfig,
} from "@/data/store";

const benefits = [
  ["Six support zones", "Dedicated areas for the head, neck, shoulders and arms."],
  ["Two contour profiles", "Choose Regular at 8.9 cm or High at 10.9 cm."],
  ["Shape-retaining foam", "A high-density core that returns to its sculpted form."],
  ["Washable outer cover", "Remove the fitted cover and machine wash it at 30 C."],
] as const;

const pressLogos = [
  ["/assets/logo-forbes.avif", "Forbes"],
  ["/assets/logo-lifestyle.avif", "Lifestyle"],
  ["/assets/logo-readers-digest.avif", "Reader's Digest"],
  ["/assets/logo-usa-today.avif", "USA Today"],
  ["/assets/logo-scary-mommy.webp", "Scary Mommy"],
] as const;

export function HomePage() {
  return (
    <main className="store-home redesigned-home">
      <section className="juujo-home-hero">
        <picture>
          <source
            media="(max-width: 700px)"
            srcSet="/assets/licensed/juujo-about-hero-mobile.png"
          />
          <img
            src="/assets/licensed/juujo-about-hero-desktop.png"
            alt="Sleeper resting against the CloudAlign contour pillow"
            width="2048"
            height="749"
          />
        </picture>
        <div className="juujo-home-hero-copy">
          <p>THE CONTOUR PILLOW FOR SIDE SLEEPERS</p>
          <h1>Wake up feeling properly supported.</h1>
          <span>
            CloudAlign gives your head, neck and shoulder their own place to
            settle, with Regular and High profiles for a more personal fit.
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
            <b>4.9/5</b> from 42,093 licensed product reviews
          </small>
        </div>
      </section>

      <section className="trust-row home-trust-row" aria-label="Store benefits">
        <span>
          <PackageCheck /> Free shipping on all UK orders
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

      <section className="home-press-row" aria-label="Featured in">
        <p>As featured in</p>
        {pressLogos.map(([src, alt]) => (
          <img src={src} alt={alt} key={src} />
        ))}
      </section>

      <section className="home-intro">
        <div>
          <p className="eyebrow">Not another flat pillow</p>
          <h2>A contour shaped around the way your body reaches the bed.</h2>
        </div>
        <div>
          <p>
            CloudAlign creates dedicated space for the head, neck, shoulder and
            arm instead of asking one flat surface to support everything.
          </p>
          <Link className="text-link" href="/pages/how-it-works">
            Explore the support zones <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-product-story">
        <img
          src="/assets/editorial/bedroom-cloudalign.webp"
          alt="Woman relaxing with a tag-free CloudAlign pillow in a bright bedroom"
          width="1400"
          height="933"
        />
        <div>
          <p className="eyebrow">Designed for side-sleeper space</p>
          <h2>Support your neck without crowding your shoulder.</h2>
          <p>
            Raised side wings support the head while the curved shoulder channel
            gives your upper body room to settle naturally.
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

      <section className="home-lifestyle-banner">
        <img
          src="/assets/v2/lifestyle-peaceful-banner.webp"
          alt="Woman relaxing with a CloudAlign pillow and layered bedding"
          width="1024"
          height="576"
        />
        <div>
          <p className="eyebrow">CloudAlign at home</p>
          <h2>Support that still feels soft, calm and easy to live with.</h2>
          <p>
            The distinctive contour gives your head and shoulders room to
            settle without making the bedroom feel clinical.
          </p>
          <Link className="light-button" href={siteConfig.productPath}>
            See CloudAlign in detail <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-benefit-band">
        <div className="section-heading">
          <p className="eyebrow">One considered design</p>
          <h2>Every curve has a job.</h2>
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
          <p className="eyebrow">Choose your profile</p>
          <h2>Choose the height that meets your shoulder.</h2>
          <p>
            Your ideal pillow height depends on shoulder width, mattress feel
            and sleep position. Use the guide or take the four-question quiz.
          </p>
          <div className="height-profile-list">
            {heights.map((height) => (
              <article key={height.id}>
                <div>
                  <strong>{height.name}</strong>
                  <span>{height.depth}</span>
                </div>
                <p>{height.recommendation}</p>
              </article>
            ))}
          </div>
          <Link className="text-link" href="/pages/pillow-height-guide">
            Read the height guide <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <img
          src="/assets/v2/lifestyle-brunette-pillow-lift.webp"
          alt="Woman holding the CloudAlign pillow behind her head"
          width="1024"
          height="1024"
        />
      </section>

      <section className="home-colours">
        <div>
          <p className="eyebrow">Four calm colours</p>
          <h2>White, Grey, Baby Blue or Navy Blue.</h2>
          <p>
            Every colour uses the same sculpted memory-foam core and removable
            fitted cover, which can be removed and machine washed at 30 C.
          </p>
          <div className="home-colour-swatches" aria-label="Available colours">
            {colours.map((colour) => (
              <span key={colour.id}>
                <i
                  aria-hidden="true"
                  style={{ backgroundColor: colour.swatch }}
                />
                {colour.name}
              </span>
            ))}
          </div>
          <Link className="text-link" href={siteConfig.productPath}>
            See all colours <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <figure className="home-colours-visual">
          <img
            src="/assets/gallery-05-colours-juujo.png"
            alt="CloudAlign pillow in White, Grey, Baby Blue and Navy Blue"
            width="1255"
            height="1255"
          />
        </figure>
      </section>

      <section className="quiz-band">
        <div>
          <BedDouble aria-hidden="true" />
          <p>Four quick questions</p>
          <h2>Regular or High? Start with how you sleep.</h2>
        </div>
        <Link className="light-button" href="/pages/sleep-quiz">
          Take the sleep quiz <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <ReviewGrid compact />

      <section className="home-final">
        <img
          src="/assets/editorial/four-pillow-studio.webp"
          alt="Woman carrying four white CloudAlign pillows"
          width="1080"
          height="1350"
        />
        <div>
          <Sparkles aria-hidden="true" />
          <p className="eyebrow">Build your sleep setup</p>
          <h2>One pillow, a pair, or a four-pillow home set.</h2>
          <p>{product.description}</p>
          <Link className="primary-button" href={siteConfig.productPath}>
            Choose colours and heights <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
