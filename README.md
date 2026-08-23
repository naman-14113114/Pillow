# Juujo UK

Production Next.js storefront for the Juujo OrthoAlign Pillow.

## Local development

```bash
npm install
npm run dev
```

The default local URL is `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm run verify
npm run build
```

`npm run verify` checks required routes and assets, scans for inherited store
branding, and verifies that the product-only comfort-trial statement does not
leak into other routes.

## Integrations

Copy `.env.example` to `.env.local` and supply the owner-controlled credentials.
The storefront is fully previewable without them. Checkout, accounts, mirrored
orders, analytics, chat and live tracking remain in staging mode until their
corresponding variables are configured.

PlusBase remains the payment and fulfilment authority. Supabase stores customer
profiles, checkout sessions, mirrored order status and review records.

## Product mapping

Eight pillow variants are required:

- White, Grey, Baby Blue and Navy Blue
- Regular and High for each colour

Four matching replacement-cover variant IDs are required. The server validates
all product, height, colour, bundle and cover combinations before preparing a
PlusBase checkout.

Claims that require transferable certification, award, professional approval or
measured performance evidence are retained in the central product configuration
with `enabled: false`. They must not be enabled until the supporting evidence is
available for the exact supplied product.

## Physical product imagery

The physical pillow and cover have no Juujo wordmark, logo, printed label or
sewn brand tag. Branding is limited to the storefront UI, packaging and printed
guide.
