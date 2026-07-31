import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Juujo",
  description:
    "Juujo makes focused sleep products easier to understand, choose and live with.",
};

export default function Page() {
  return (
    <main>
      <section className="editorial-hero">
        <img
          src="/assets/gallery/hero-bedroom.png"
          alt="Juujo CloudAlign pillows in a bright bedroom"
          width="1536"
          height="1024"
        />
        <div>
          <span>ABOUT JUUJO</span>
          <h1>Sleep products should explain themselves.</h1>
        </div>
      </section>
      <section className="editorial-copy">
        <div>
          <span className="route-kicker">Our focus</span>
          <h2>One product, understood properly.</h2>
        </div>
        <div>
          <p>
            Juujo focuses on the details that affect how a pillow feels:
            contour height, shoulder clearance, stable support, cover care and
            the shape of the sleep surface.
          </p>
          <p>
            CloudAlign is available in two heights and four colours so shoppers
            can choose intentionally instead of buying a generic pillow and
            hoping it works.
          </p>
        </div>
      </section>
    </main>
  );
}
