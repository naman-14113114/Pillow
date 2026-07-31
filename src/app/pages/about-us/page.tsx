import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Layers3,
  Palette,
  Ruler,
} from "lucide-react";
import { siteConfig } from "@/data/store";

export const metadata: Metadata = {
  title: "About Juujo",
  description:
    "Why Juujo focuses on understandable, carefully designed sleep products and clear product choices.",
};

const principles = [
  {
    icon: Ruler,
    title: "Explain the fit",
    copy: "Dimensions, contour heights and care instructions should be easy to find before checkout.",
  },
  {
    icon: Layers3,
    title: "Design with a purpose",
    copy: "Every curve should make room for a sleeping position, body area or practical use.",
  },
  {
    icon: Palette,
    title: "Make choice manageable",
    copy: "Four colours and two heights provide useful choice without turning the product into a catalogue.",
  },
] as const;

export default function Page() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <img
          src="/assets/about/about-hero-juujo.webp"
          alt="Woman resting in blue and white bedding with tag-free CloudAlign pillows"
          width="1016"
          height="1548"
        />
        <div>
          <span>ABOUT JUUJO</span>
          <h1>Sleep products should be easier to understand.</h1>
          <p>
            We focus on the details that change how a pillow feels, then make
            those details clear enough to choose with confidence.
          </p>
        </div>
      </section>

      <section className="about-manifesto">
        <div>
          <span className="route-kicker">Why we started</span>
          <h2>Too many pillows ask you to guess.</h2>
        </div>
        <div>
          <p>
            Height, shoulder space, shape retention and cover care matter, yet
            they are often hidden behind vague promises. Juujo takes the
            opposite approach: one focused product, explained properly.
          </p>
          <p>
            CloudAlign combines a sculpted memory-foam core, two contour
            heights and four fitted-cover colours so the decision starts with
            how you sleep, not a wall of nearly identical options.
          </p>
        </div>
      </section>

      <section className="about-product-band">
        <img
          src="/assets/gallery/studio-product.png"
          alt="Top and side views of the tag-free CloudAlign pillow"
          width="1200"
          height="1200"
        />
        <div>
          <span className="route-kicker">Our first product</span>
          <h2>CloudAlign is shaped around real sleeping positions.</h2>
          <p>
            The central cradle supports the head, raised wings define the neck
            position and curved edges leave room for shoulders and arms.
            Rotate the pillow to move between its lower and higher contour.
          </p>
          <ul>
            <li>
              <CircleCheck /> 68.5 x 37 cm sculpted core
            </li>
            <li>
              <CircleCheck /> 8.9 cm and 10.9 cm contour heights
            </li>
            <li>
              <CircleCheck /> Removable machine-washable outer cover
            </li>
          </ul>
          <Link className="primary-button" href={siteConfig.productPath}>
            Meet CloudAlign <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="about-principles">
        <div className="section-heading">
          <span className="route-kicker">How we work</span>
          <h2>Fewer claims. Better product information.</h2>
        </div>
        <div>
          {principles.map(({ icon: Icon, title, copy }) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-colour-band">
        <div>
          <span className="route-kicker">Made for the room as well</span>
          <h2>A support pillow that still feels at home in your bedding.</h2>
          <p>
            Choose White, Grey, Baby Blue or Navy Blue. Every version keeps
            the same tag-free contour and supports colour-matched replacement
            covers.
          </p>
          <Link className="text-link" href="/pages/colour-and-cover-guide">
            Explore colours and care <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <img
          src="/assets/gallery/four-colours.png"
          alt="White, Grey, Baby Blue and Navy Blue CloudAlign pillows"
          width="1536"
          height="1024"
        />
      </section>

      <section className="about-support">
        <div>
          <span className="route-kicker">Questions before or after ordering</span>
          <h2>Support should be as clear as the product page.</h2>
        </div>
        <div>
          <p>
            Our help centre covers height selection, delivery, care and order
            tracking. For a specific question, contact the team at{" "}
            <a href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
            .
          </p>
          <Link className="secondary-button" href="/pages/contact-us">
            Contact Juujo <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
