import type { Metadata } from "next";
import { ProductPage } from "@/components/ProductPage";
import { gallery, product, productFaqs, siteConfig } from "@/data/store";

export const metadata: Metadata = {
  title: "CloudAlign Pillow",
  description:
    "Shop the Juujo CloudAlign Pillow in four colours and two contour heights, with bundle savings and matching replacement covers.",
  alternates: { canonical: siteConfig.productPath },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  sku: product.sku,
  image: gallery.map((item) => `${siteConfig.siteUrl}${item.src}`),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.reviewRating,
    reviewCount: siteConfig.reviewCount,
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: siteConfig.currency,
    lowPrice: "49.99",
    highPrice: "182.99",
    offerCount: 9,
    availability: "https://schema.org/InStock",
    url: `${siteConfig.siteUrl}${siteConfig.productPath}`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: productFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProductPage />
    </>
  );
}
