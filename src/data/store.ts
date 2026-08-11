export const siteConfig = {
  brand: "Juujo",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://pillow.juujo.com",
  supportEmail: "support@juujo.com",
  productPath: "/products/juujo-cloudalign-pillow",
  currency: "GBP",
  reviewRating: 4.9,
  reviewCount: 42093,
} as const;

export type PillowColour = "white" | "grey" | "blue" | "navy";
export type PillowHeight = "regular" | "high";
export type BundleQuantity = 1 | 2 | 4;

export type ProductSelection = {
  colour: PillowColour;
  height: PillowHeight;
  quantity: BundleQuantity;
  includeCovers: boolean;
};

export type PricedPillowChoice = Pick<ProductSelection, "colour" | "height">;

export const colours: Array<{
  id: PillowColour;
  name: string;
  swatch: string;
}> = [
  { id: "white", name: "White", swatch: "#f8fafc" },
  { id: "grey", name: "Grey", swatch: "#b8bdc5" },
  { id: "blue", name: "Baby Blue", swatch: "#b9d9f4" },
  { id: "navy", name: "Navy Blue", swatch: "#0b214d" },
];

export const pillowVariantImages: Record<PillowColour, string> = {
  white: "/assets/variants/white.webp",
  grey: "/assets/variants/grey.webp",
  blue: "/assets/variants/baby-blue.webp",
  navy: "/assets/variants/navy.webp",
};

export const heights: Array<{
  id: PillowHeight;
  name: string;
  depth: string;
  recommendation: string;
}> = [
  {
    id: "regular",
    name: "Regular",
    depth: "8.9 cm",
    recommendation: "A lower profile for smaller frames and back sleepers.",
  },
  {
    id: "high",
    name: "High",
    depth: "10.9 cm",
    recommendation: "More shoulder clearance for taller or broader side sleepers.",
  },
];

export const bundles: Array<{
  quantity: BundleQuantity;
  name: string;
  badge?: string;
  priceCents: number;
  compareAtCents: number;
  coverPriceCents: number;
  coverCompareAtCents: number;
}> = [
  {
    quantity: 1,
    name: "1 Pillow",
    priceCents: 4999,
    compareAtCents: 10000,
    coverPriceCents: 999,
    coverCompareAtCents: 1999,
  },
  {
    quantity: 2,
    name: "2 Pillow Bundle",
    badge: "MOST POPULAR",
    priceCents: 8899,
    compareAtCents: 20000,
    coverPriceCents: 1999,
    coverCompareAtCents: 3998,
  },
  {
    quantity: 4,
    name: "Family Bundle",
    badge: "BEST VALUE",
    priceCents: 15199,
    compareAtCents: 40000,
    coverPriceCents: 2999,
    coverCompareAtCents: 7996,
  },
];

export const product = {
  id: "juujo-cloudalign-pillow",
  slug: "juujo-cloudalign-pillow",
  sku: "JUUJO-CLOUDALIGN",
  name: "Juujo CloudAlign Pillow",
  eyebrow: "Ergonomic support for every sleep position",
  description:
    "A sculpted memory-foam pillow with dedicated neck, shoulder and arm zones, two contour heights and a breathable removable cover.",
  specifications: [
    ["Dimensions", "68.5 x 37 cm"],
    ["Weight", "Approximately 1.36 kg"],
    ["Core", "High-density, shape-retaining memory foam"],
    ["Cover", "Breathable, removable and machine washable at 30 C"],
    ["Regular profile", "8.9 cm"],
    ["High profile", "10.9 cm"],
    ["Sleep positions", "Side, back and stomach"],
  ],
  highlights: [
    "Six-zone ergonomic contour",
    "Dedicated side-sleeper wings",
    "Dual-height neck support",
    "Breathable removable cover",
    "Four calming colour options",
    "Free tracked delivery",
  ],
  evidenceClaims: [
    {
      copy: "#1 best-selling pillow design",
      enabled: false,
      evidenceRequired: true,
    },
    {
      copy: "OEKO-TEX certified cover",
      enabled: false,
      evidenceRequired: true,
    },
    {
      copy: "Hypoallergenic and antibacterial materials",
      enabled: false,
      evidenceRequired: true,
    },
    {
      copy: "Recommended by chiropractic partners",
      enabled: false,
      evidenceRequired: true,
    },
  ],
} as const;

export const gallery = [
  {
    src: "/assets/gallery-01-hero-juujo.png",
    alt: "Tag-free CloudAlign pillow with best-selling pillow award artwork",
  },
  {
    src: "/assets/gallery-02-zones-juujo.png",
    alt: "CloudAlign pillow six-zone support diagram",
  },
  {
    src: "/assets/gallery-03-lifestyle-juujo.png",
    alt: "CloudAlign pillow supporting a sleeping model",
  },
  {
    src: "/assets/gallery-04-size-guide-juujo.png",
    alt: "CloudAlign Regular and High pillow size guide",
  },
  {
    src: "/assets/gallery-05-colours-juujo.png",
    alt: "Four tag-free CloudAlign colours: White, Grey, Baby Blue and Navy Blue",
  },
  {
    src: "/assets/gallery-06-sleepers-juujo.png",
    alt: "Tag-free CloudAlign pillow in four sleeping positions",
  },
  {
    src: "/assets/gallery-07-disclaimer-juujo.png",
    alt: "Removable machine-washable CloudAlign cover",
  },
  {
    src: "/assets/gallery-08-callouts-juujo.png",
    alt: "CloudAlign ergonomic feature callouts",
  },
  {
    src: "/assets/gallery-09-chiro-juujo.png",
    alt: "CloudAlign pillow recommendation artwork",
  },
  {
    src: "/assets/gallery-10-comparison-juujo.png",
    alt: "Juujo CloudAlign pillow comparison",
  },
  {
    src: "/assets/gallery-11-model-juujo.png",
    alt: "Model holding a tag-free CloudAlign pillow",
  },
] as const;

export type Review = {
  id: string;
  name: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  image?: string;
  mediaType?: "image" | "video";
  source: "licensed-product-review";
};

export const reviews: Review[] = [
  {
    id: "r-001",
    name: "Stephanie K.",
    date: "1 August 2025",
    rating: 5,
    title: "Bought another one",
    body: "The shape feels completely different from my old pillow. It is soft where I want it and still supports my neck.",
    image: "/assets/reviews/review-01.jpg",
    source: "licensed-product-review",
  },
  {
    id: "r-002",
    name: "Emma C.",
    date: "4 August 2025",
    rating: 5,
    title: "Cool and supportive",
    body: "It stays comfortable through the night and gives my neck the right amount of support. I ordered another for my mum.",
    image: "/assets/reviews/review-02.jpg",
    source: "licensed-product-review",
  },
  {
    id: "r-003",
    name: "Jessica L.",
    date: "4 August 2025",
    rating: 5,
    title: "Gentler than a cervical pillow",
    body: "It is broad, soft and much less clinical-looking than the cervical pillow I nearly bought, while still holding my neck well.",
    image: "/assets/reviews/review-03.jpg",
    source: "licensed-product-review",
  },
  {
    id: "r-004",
    name: "Emily P.",
    date: "9 August 2025",
    rating: 5,
    title: "Useful beyond bedtime",
    body: "I sleep on it every night and sometimes use the contour as a supportive cushion when I am reading on the sofa.",
    image: "/assets/reviews/review-04.jpg",
    source: "licensed-product-review",
  },
  {
    id: "r-005",
    name: "Brooke S.",
    date: "11 August 2025",
    rating: 5,
    title: "Better than expected",
    body: "I kept seeing this pillow shape recommended and finally tried it. The material and finish feel much better than I expected.",
    image: "/assets/reviews/review-05.jpg",
    source: "licensed-product-review",
  },
  {
    id: "r-006",
    name: "Chloe N.",
    date: "13 August 2025",
    rating: 5,
    title: "The contour works",
    body: "After a few nights the central cradle and shoulder space started to feel completely natural. I no longer keep folding my pillow.",
    image: "/assets/reviews/review-06.jpg",
    source: "licensed-product-review",
  },
  {
    id: "r-007",
    name: "Riley J.",
    date: "19 August 2025",
    rating: 5,
    title: "Right height for me",
    body: "I am picky about bedding, but the higher side fills the space above my shoulder without pushing my head upwards.",
    image: "/assets/reviews/review-07.jpg",
    source: "licensed-product-review",
  },
  {
    id: "r-008",
    name: "Heather H.",
    date: "14 September 2025",
    rating: 5,
    title: "A thoughtful shape",
    body: "The two heights and dedicated side sections make it easy to find a comfortable position without stacking pillows.",
    image: "/assets/reviews/review-08.jpg",
    source: "licensed-product-review",
  },
  {
    id: "r-009",
    name: "Jordyn G.",
    date: "17 August 2025",
    rating: 5,
    title: "Less shoulder pressure",
    body: "The lower side cut-out gives my shoulder more room and I do not wake up constantly trying to reposition the pillow.",
    image: "/assets/reviews/review-09.jpg",
    source: "licensed-product-review",
  },
  {
    id: "r-010",
    name: "Valeria M.",
    date: "24 August 2025",
    rating: 5,
    title: "Soft but not flat",
    body: "It feels soft when I settle in, but the foam keeps its shape and does not collapse like my old filled pillow.",
    image: "/assets/reviews/review-10.jpg",
    source: "licensed-product-review",
  },
];

export const productFaqs = [
  {
    question: "How do I choose Regular or High?",
    answer:
      "Choose Regular if you prefer a lower profile or have a smaller shoulder frame. Choose High if you have broader shoulders, are taller, or usually stack pillows when sleeping on your side.",
  },
  {
    question: "Can I use both sides?",
    answer:
      "Yes. Rotate the pillow to use the 8.9 cm or 10.9 cm contour. The central cradle and side wings work in either orientation.",
  },
  {
    question: "Is the entire pillow machine washable?",
    answer:
      "Only the removable cover should be machine washed at 30 C. Spot-clean the memory-foam core and allow it to air fully before replacing the cover.",
  },
  {
    question: "Does it work for back sleepers?",
    answer:
      "The central cradle and lower contour can support back sleepers who prefer a stable, medium-firm memory-foam feel.",
  },
  {
    question: "Will it fit a standard pillowcase?",
    answer:
      "The pillow measures 68.5 x 37 cm. A flexible standard UK pillowcase can fit over the included shaped, removable cover.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  published: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "best-pillow-for-side-sleepers-uk",
    title: "How to Choose a Pillow for Side Sleeping",
    description:
      "A practical UK guide to pillow height, shoulder clearance, firmness and heat.",
    readTime: "7 min read",
    published: "2026-07-31",
    sections: [
      {
        heading: "Start with the shoulder gap",
        paragraphs: [
          "A side-sleeper pillow needs enough height to fill the space between the mattress and the side of your head. Too little height lets the neck bend down; too much pushes it upwards.",
          "Mattress softness matters too. Your shoulder sinks further into a soft mattress, reducing the pillow height you need.",
        ],
      },
      {
        heading: "Look for stable support",
        paragraphs: [
          "A supportive pillow should settle under pressure without collapsing through the night. Contoured memory foam is one way to combine a softer head cradle with firmer neck and shoulder zones.",
        ],
      },
    ],
  },
  {
    slug: "pillow-height-guide",
    title: "Regular or High? A Pillow Height Guide",
    description:
      "Use your frame, mattress and preferred sleep position to choose a contour height.",
    readTime: "5 min read",
    published: "2026-07-31",
    sections: [
      {
        heading: "Regular profile",
        paragraphs: [
          "A lower contour generally suits smaller frames, back sleepers and people using softer mattresses.",
        ],
      },
      {
        heading: "High profile",
        paragraphs: [
          "A higher contour can better fill the shoulder gap for taller or broader side sleepers, particularly on a firmer mattress.",
        ],
      },
    ],
  },
  {
    slug: "memory-foam-vs-traditional-pillows",
    title: "Memory Foam vs Traditional Filled Pillows",
    description:
      "Compare shape retention, adjustment, airflow and care before replacing your pillow.",
    readTime: "6 min read",
    published: "2026-07-31",
    sections: [
      {
        heading: "Shape retention",
        paragraphs: [
          "Solid memory foam is designed to return to a consistent shape, while loose fibre and feather fillings need regular fluffing and can move during the night.",
        ],
      },
      {
        heading: "Care and airflow",
        paragraphs: [
          "Most solid foam cores should not be machine washed. A removable washable cover is therefore important for routine care.",
        ],
      },
    ],
  },
  {
    slug: "cooling-pillow-for-hot-sleepers",
    title: "What Makes a Pillow Feel Cooler?",
    description:
      "Cover weave, airflow, room temperature and bedding all affect overnight heat.",
    readTime: "5 min read",
    published: "2026-07-31",
    sections: [
      {
        heading: "The cover is the first contact",
        paragraphs: [
          "A breathable, clean cover helps moisture move away from the surface. Wash it according to its care label and avoid adding several dense protectors.",
        ],
      },
      {
        heading: "The room still matters",
        paragraphs: [
          "No pillow can override a warm room or heavy duvet. Treat the pillow as one part of a cooler sleep setup.",
        ],
      },
    ],
  },
  {
    slug: "neck-and-shoulder-comfort-at-night",
    title: "Improving Neck and Shoulder Comfort at Night",
    description:
      "Simple positioning checks for side and back sleepers.",
    readTime: "6 min read",
    published: "2026-07-31",
    sections: [
      {
        heading: "Keep the head centred",
        paragraphs: [
          "Your nose should broadly point in line with the centre of your chest rather than tilting strongly towards the mattress or ceiling.",
        ],
      },
      {
        heading: "Give the shoulder room",
        paragraphs: [
          "Side-sleeper wings and arm channels can create space around the shoulder, but comfort remains personal. Stop using any sleep product that increases discomfort.",
        ],
      },
    ],
  },
  {
    slug: "how-to-care-for-memory-foam-pillow",
    title: "How to Care for a Memory-Foam Pillow",
    description:
      "Wash the cover, protect the foam and let a newly opened pillow breathe.",
    readTime: "4 min read",
    published: "2026-07-31",
    sections: [
      {
        heading: "Wash the removable cover",
        paragraphs: [
          "Remove the outer cover and wash it at 30 C. Air drying helps preserve its fit and surface texture.",
        ],
      },
      {
        heading: "Do not soak the foam",
        paragraphs: [
          "Spot-clean the core sparingly and allow it to dry completely in a ventilated place before use.",
        ],
      },
    ],
  },
];

export const policyContent = {
  "shipping-policy": {
    title: "Shipping Policy",
    intro: "Processing times, delivery estimates and tracking information.",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "We offer free tracked shipping. Orders are normally processed within 1 to 3 business days.",
          "Once dispatched, transit normally takes 3 to 10 business days depending on destination and courier conditions. These estimates are guidelines rather than guaranteed delivery dates.",
        ],
      },
      {
        heading: "Tracking",
        paragraphs: [
          "We send tracking details by email when the order is dispatched. Please allow 1 to 2 business days for the first courier scan to appear.",
          "Courier scans can pause while a parcel moves between facilities. Contact support if tracking has not updated for five business days.",
        ],
      },
      {
        heading: "Delivery estimates",
        paragraphs: [
          "Business days exclude weekends and public holidays. Remote destinations, customs checks, severe weather and carrier disruption can extend delivery time.",
          "An order containing more than one item may arrive in separate parcels. Each dispatched parcel will receive its own tracking information where available.",
        ],
      },
      {
        heading: "Address changes",
        paragraphs: [
          "Contact support@juujo.com as soon as possible if the delivery address is incorrect. Processing begins quickly, so an address change cannot be guaranteed after the order is placed.",
        ],
      },
      {
        heading: "Missing or delivered parcels",
        paragraphs: [
          "If tracking shows delivered but the parcel cannot be found, first check safe places, household members and neighbours. Then contact the courier and Juujo support with the order number and tracking reference.",
          "Claims for parcels damaged in transit should include photographs of the outer packaging, delivery label and affected product.",
        ],
      },
    ],
  },
  "return-policy": {
    title: "Return Policy",
    intro: "How to report an issue with an order.",
    sections: [
      {
        heading: "Order issues",
        paragraphs: [
          "Contact us through the website contact form within 7 business days of delivery and include your order number, a clear description and supporting photographs or video.",
          "Our customer service team will review the evidence and confirm the appropriate replacement or refund process. Do not post an item back unless our team provides return instructions.",
        ],
      },
      {
        heading: "Return condition",
        paragraphs: [
          "Where a return is approved, the item must be sent using the instructions provided by support. Include all supplied components and use protective packaging.",
          "For hygiene reasons, opened or used sleep products may have return restrictions unless they are faulty, damaged or otherwise covered by applicable consumer law.",
        ],
      },
      {
        heading: "Return shipping",
        paragraphs: [
          "The support team will confirm the return destination and whether return postage is covered for the approved reason. Unauthorised returns may not be traceable or refundable.",
          "Keep the postage receipt and tracking reference until the return has been inspected and resolved.",
        ],
      },
      {
        heading: "Your statutory rights",
        paragraphs: [
          "Nothing in this policy limits rights that cannot be excluded under applicable consumer law.",
        ],
      },
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    intro: "Order cancellations, replacements and refunds.",
    sections: [
      {
        heading: "Order adjustments",
        paragraphs: [
          "We begin processing orders quickly. Contact us within 6 hours if you need to request a colour, height or address change. Changes cannot be guaranteed once fulfilment has started.",
        ],
      },
      {
        heading: "Replacement or refund",
        paragraphs: [
          "Quality or delivery claims require the order number, delivery label and clear evidence of the issue. Approved replacements are normally prepared within 7 business days.",
          "Approved refunds are returned to the original payment method. The payment provider controls when the credit appears in your account.",
        ],
      },
      {
        heading: "Refund timing",
        paragraphs: [
          "After an approved refund is submitted, banks and payment providers may take several business days to post the credit. Original currency conversion or bank fees are controlled by the payment provider.",
        ],
      },
      {
        heading: "Partial refunds",
        paragraphs: [
          "A partial refund may apply where only part of a multi-item order is affected or where an agreed remedy does not require the full order to be refunded.",
        ],
      },
      {
        heading: "Promotions and bundles",
        paragraphs: [
          "Refund calculations use the amount actually paid after bundle pricing or discounts. Returning part of a bundle may change the discount applied to the retained items.",
        ],
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    intro: "How Juujo collects, uses and protects personal information.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We collect information needed to operate the store, fulfil orders, provide support, prevent fraud and understand how customers use the website. This can include identity, contact, delivery, order, device and campaign-attribution information.",
        ],
      },
      {
        heading: "How we use information",
        paragraphs: [
          "We use personal information to provide the website, prepare checkout, fulfil and track orders, respond to support requests, secure the service and meet legal obligations.",
          "Where configured and permitted, analytics and marketing tools help measure campaign performance and improve the store experience.",
        ],
      },
      {
        heading: "Service providers",
        paragraphs: [
          "Payment, fulfilment, hosting, authentication, analytics and customer-support providers may process information only as needed to provide their services. PlusBase remains the checkout and payment authority once activated.",
        ],
      },
      {
        heading: "Retention and security",
        paragraphs: [
          "Information is retained only as long as reasonably required for orders, support, fraud prevention, legal obligations and legitimate business records.",
          "We use technical and organisational safeguards appropriate to the service, but no internet transmission or storage system can be guaranteed completely secure.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You may request access, correction or deletion of eligible personal information, or object to certain processing, by contacting support@juujo.com.",
          "Some information must be retained where required for tax, fraud-prevention, dispute or other legal purposes.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Privacy questions can be sent to support@juujo.com. The final legal company name and correspondence address will be published before checkout activation.",
        ],
      },
    ],
  },
  "cookies-policy": {
    title: "Cookies Policy",
    intro: "How cookies support the basket, analytics and advertising measurement.",
    sections: [
      {
        heading: "Essential cookies",
        paragraphs: [
          "Essential cookies remember basket selections, security state and account sessions. Disabling them may prevent core store functions from working.",
        ],
      },
      {
        heading: "Analytics and advertising",
        paragraphs: [
          "When configured, analytics and advertising partners may use cookies to measure visits and campaign performance. Browser settings can restrict or remove cookies.",
        ],
      },
      {
        heading: "Attribution",
        paragraphs: [
          "Campaign parameters such as UTM values and Microsoft click identifiers may be stored temporarily so they can follow the customer from a comparison page to the store and checkout.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can delete or block cookies through your browser settings. Blocking essential storage can remove basket contents, end an account session or prevent checkout preparation.",
        ],
      },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    intro: "The terms governing use of the Juujo website and store.",
    sections: [
      {
        heading: "Store terms",
        paragraphs: [
          "By using this website or placing an order, you agree to the store terms, product descriptions, prices and policies shown at the time of purchase.",
          "Prices and availability may change without notice. We may refuse or cancel orders where information is incomplete, payment is not authorised or fraud is suspected.",
        ],
      },
      {
        heading: "Product information",
        paragraphs: [
          "We aim to present dimensions, colours and product images accurately. Screen settings and manufacturing tolerances can cause small differences in colour or measurement.",
          "Sleep comfort is personal. Product information is not medical advice and the product is not intended to diagnose, treat or prevent a medical condition.",
        ],
      },
      {
        heading: "Orders and payment",
        paragraphs: [
          "An order is not accepted until checkout is completed and an order confirmation is issued. PlusBase and its payment providers control payment authorisation once checkout is activated.",
          "Customers are responsible for providing accurate contact, billing and delivery information.",
        ],
      },
      {
        heading: "Website use",
        paragraphs: [
          "You may not misuse the website, attempt unauthorised access, interfere with service operation, submit malicious material or use store content in a way that infringes applicable rights.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "Nothing in these terms excludes liability that cannot legally be excluded. To the extent permitted by law, Juujo is not responsible for indirect loss arising from use of the website or delays outside reasonable control.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of England and Wales. Final company and correspondence details will be added before checkout activation.",
        ],
      },
    ],
  },
} as const;

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: siteConfig.currency,
  }).format(cents / 100);
}

const pillowTier = ({ colour, height }: PricedPillowChoice) => {
  if (colour === "white" && height === "regular") return 0;
  if (colour === "white" || height === "regular") return 1;
  return 2;
};

export function getPillowUnitPriceCents(choice: PricedPillowChoice) {
  return [4999, 5499, 5999][pillowTier(choice)];
}

export function getPillowColourName(colour: PillowColour) {
  return colours.find((option) => option.id === colour)?.name ?? "White";
}

export function getPillowBundlePriceCents(
  pillows: readonly PricedPillowChoice[],
) {
  const quantity = pillows.length;
  const bundle = getBundle(quantity);

  if (quantity === 1) return getPillowUnitPriceCents(pillows[0]);

  const tierAdjustments =
    quantity === 2 ? [0, 500, 1000] : [0, 400, 775];

  return pillows.reduce(
    (total, pillow) => total + tierAdjustments[pillowTier(pillow)],
    bundle.priceCents,
  );
}

export function getPillowSelectionTotalCents(
  pillows: readonly PricedPillowChoice[],
  includeCovers: boolean,
) {
  const bundle = getBundle(pillows.length);
  return (
    getPillowBundlePriceCents(pillows) +
    (includeCovers ? bundle.coverPriceCents : 0)
  );
}

export function getBundle(quantity: number) {
  return bundles.find((bundle) => bundle.quantity === quantity) ?? bundles[0];
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
