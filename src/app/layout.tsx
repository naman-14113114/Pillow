import type { Metadata } from "next";
import localFont from "next/font/local";
import { AttributionCapture } from "@/components/AttributionCapture";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MarketingIntegrations } from "@/components/MarketingIntegrations";
import { siteConfig } from "@/data/store";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

const display = localFont({
  src: [
    {
      path: "../../public/fonts/melbourne-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/melbourne-medium.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Juujo CloudAlign Pillow | Support for Side Sleepers",
    template: "%s | Juujo",
  },
  description:
    "Discover the Juujo CloudAlign Pillow with six ergonomic zones, two contour heights and four washable-cover colours.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Juujo",
    title: "Juujo CloudAlign Pillow",
    description:
      "Sculpted memory-foam support for side, back and stomach sleepers.",
    images: [{ url: "/assets/gallery/hero-bedroom.png", width: 1536, height: 1024 }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.brand,
  url: siteConfig.siteUrl,
  email: siteConfig.supportEmail,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${display.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <MarketingIntegrations />
        <CartProvider>
          <AttributionCapture />
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
