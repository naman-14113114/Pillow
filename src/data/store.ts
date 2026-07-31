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
    "Colour-matched spare cover option",
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
    src: "/assets/gallery/studio-product.png",
    alt: "Two tag-free white Juujo CloudAlign pillows showing the sculpted top and side profiles",
  },
  {
    src: "/assets/gallery/hero-bedroom.png",
    alt: "White and navy Juujo CloudAlign pillows in a bright bedroom",
  },
  {
    src: "/assets/gallery/model-side-sleeper.png",
    alt: "A side sleeper resting on the white Juujo CloudAlign pillow",
  },
  {
    src: "/assets/gallery/four-colours.png",
    alt: "Juujo CloudAlign pillow in White, Grey, Baby Blue and Navy Blue",
  },
  {
    src: "/assets/gallery/support-zones.png",
    alt: "Six ergonomic support areas of the Juujo CloudAlign pillow",
  },
  {
    src: "/assets/gallery/bundle-packaging.png",
    alt: "Juujo pillow bundle, replacement cover, packaging and side-sleeper guide",
  },
  {
    src: "/assets/gallery/licensed-zones.png",
    alt: "CloudAlign head, neck and shoulder support zones",
  },
  {
    src: "/assets/gallery/size-guide.png",
    alt: "Regular and High Juujo pillow height guide",
  },
  {
    src: "/assets/gallery/sleep-positions.png",
    alt: "CloudAlign support for side, back and stomach sleeping",
  },
  {
    src: "/assets/gallery/cover-care.png",
    alt: "Breathable removable CloudAlign pillow cover",
  },
  {
    src: "/assets/gallery/feature-callouts.png",
    alt: "CloudAlign contour feature callouts",
  },
  {
    src: "/assets/gallery/pillow-comparison.png",
    alt: "CloudAlign ergonomic pillow compared with a traditional pillow",
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
      "The pillow measures 68.5 x 37 cm. A flexible standard UK pillowcase can fit, but the shaped replacement cover preserves the contour more cleanly.",
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
        ],
      },
      {
        heading: "Address changes",
        paragraphs: [
          "Contact support@juujo.com as soon as possible if the delivery address is incorrect. Processing begins quickly, so an address change cannot be guaranteed after the order is placed.",
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
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    intro: "How Juujo collects, uses and protects personal information.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We collect information needed to operate the store, fulfil orders, provide support, prevent fraud and understand how customers use the website.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You may request access, correction or deletion of eligible personal information by contacting support@juujo.com.",
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

export function getBundle(quantity: number) {
  return bundles.find((bundle) => bundle.quantity === quantity) ?? bundles[0];
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
