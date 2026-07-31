import { siteConfig } from "@/data/store";

export function GET() {
  const body = `# Juujo

Juujo is a UK-focused sleep brand offering the CloudAlign ergonomic memory-foam pillow.

## Primary pages
- [CloudAlign Pillow](${siteConfig.siteUrl}${siteConfig.productPath})
- [Pillow Height Quiz](${siteConfig.siteUrl}/pages/sleep-quiz)
- [How CloudAlign Works](${siteConfig.siteUrl}/pages/how-it-works)
- [Customer Reviews](${siteConfig.siteUrl}/pages/customer-reviews)
- [Sleep Journal](${siteConfig.siteUrl}/blog)
- [Shipping Policy](${siteConfig.siteUrl}/policies/shipping-policy)

## Product facts
- Dimensions: 68.5 x 37 cm
- Approximate weight: 1.36 kg
- Contour heights: 8.9 cm and 10.9 cm
- Colours: White, Grey, Baby Blue and Navy Blue
- Material: high-density memory foam with removable washable cover
- Prices: GBP 49.99 for one, GBP 88.99 for two, GBP 151.99 for four

Contact: ${siteConfig.supportEmail}
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
