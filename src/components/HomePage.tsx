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
import { formatMoney, product, siteConfig } from "@/data/store";

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

      <section className="home-editorial-story">
        <header>
          <div>
            <p className="eyebrow">CloudAlign at home</p>
            <h2>A considered shape, from bedtime to the morning light.</h2>
          </div>
          <p>
            A sculpted pillow should feel natural in the room as well as under
            your head. CloudAlign keeps its distinctive contour soft, simple
            and easy to live with.
          </p>
        </header>
        <div className="home-editorial-grid">
          <figure>
            <img
              src="/assets/editorial/sleeping-white-bed.webp"
              alt="Side sleeper resting with a white CloudAlign pillow"
              width="1400"
              height="1400"
            />
          </figure>
          <figure>
            <img
              src="/assets/editorial/holding-cloudalign-blue.webp"
              alt="Woman holding a white tag-free CloudAlign pillow against a blue background"
              width="1254"
              height="1254"
            />
          </figure>
          <figure>
            <img
              src="/assets/editorial/four-pillow-studio.webp"
              alt="Woman carrying four white CloudAlign pillows"
              width="1400"
              height="1746"
            />
          </figure>
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
          <h2>Regular or High, selected for your frame.</h2>
          <p>
            Your ideal pillow height depends on shoulder width, mattress feel
            and sleep position. Use the guide or take the four-question quiz.
          </p>
          <div className="height-measures">
            <span>
              <strong>8.9 cm</strong>
              Regular
            </span>
            <MoveVertical aria-hidden="true" />
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
          src="/assets/gallery-04-size-guide-juujo.png"
          alt="CloudAlign Regular and High contour profile guide"
          width="1255"
          height="1255"
        />
      </section>

      <section className="home-colours">
        <div>
          <p className="eyebrow">Four calm colours</p>
          <h2>White, Grey, Baby Blue or Navy Blue.</h2>
          <p>
            Every colour uses the same sculpted memory-foam core and removable
            cover. Add colour-matched replacement covers to any bundle.
          </p>
          <Link className="text-link" href={siteConfig.productPath}>
            See all colours <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <img
          src="/assets/gallery-05-colours-juujo.png"
          alt="CloudAlign pillow in White, Grey, Baby Blue and Navy Blue"
          width="1255"
          height="1255"
        />
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

      <section className="home-reviews-intro">
        <div>
          <p className="eyebrow">Product feedback</p>
          <h2>See how CloudAlign fits different sleepers.</h2>
        </div>
        <p>
          Browse licensed product reviews and customer media for a closer look
          at the pillow in everyday bedrooms.
        </p>
      </section>
      <ReviewGrid compact />

      <section className="home-final">
        <img
          src="/assets/editorial/studio-cloudalign-model.webp"
          alt="Woman holding a tag-free white CloudAlign pillow behind her head"
          width="1600"
          height="1600"
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
