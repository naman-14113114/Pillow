# Pillow Project Context

This is an append-only operational history for `E:\1st YEAR DTU\New folder\Pillow`.
Read the complete workspace AGENTS.md and CONTEXT.md, this complete file, and
the governing project documents before future work. Preserve earlier entries
and append corrections when source state changes. Do not copy secrets or
reviewer/customer personal information into this record.

## 2026-09-13 23:39:54 +05:30 - Full local and GitHub memory refresh, including PlusBase work

### Request, interpretation and protected scope

- User request: update memory for the pillow project locally and on GitHub,
  account for the new "plusebase" folders where the user has started adding
  code, and become current enough to continue from the latest work, without
  making any code changes.
- Interpretation: read and reconcile both local files and current GitHub refs;
  understand the Next.js storefront and the new PlusBase Custom HTML work;
  persist findings locally in context. This was not a request to publish
  documentation to GitHub, pull source changes, edit the website or deploy.
- Protected: all existing source, HTML, CSS, JavaScript, assets, product data,
  copy, pricing, reviews, review dates/order/media, links, routes, checkout,
  tracking, metadata, dependencies, configuration and production settings.
- No repository CONTEXT.md existed before this task, and Git history contained
  no CONTEXT.md entry. This file establishes the detailed starting record.

### Repository identity and current GitHub baseline

- Exact repository: `E:\1st YEAR DTU\New folder\Pillow`.
- Remote: `https://github.com/naman-14113114/Pillow.git`.
- Branch: `main`; upstream: `origin/main`.
- Local HEAD, fetched upstream and independently queried GitHub main ref all:
  `6babb4f2f11dbaa5c7590e88a8253f9615425049`.
- Ahead/behind after `git fetch --all --prune`: `0/0`.
- Starting state: clean, with no staged, unstaged or untracked files. There are
  207 tracked files. A SHA-256 baseline of every tracked file was captured for
  final preservation verification.
- Latest commit: `6babb4f`, dated 2026-09-13 20:00:22 +05:30,
  `feat(reviews): add 42.7k PlusBase-formatted reviews CSV for regular pillow (1000000676452166)`.
- No pull was needed or performed. No local/remote divergence or conflicting
  user edit was found. Fetch updated remote references only.

### Folder distinction and current source authority

- `Pillow\src`, `Pillow\public`, `Pillow\scripts` and `Pillow\supabase` contain
  the Next.js Juujo storefront and its supporting services.
- `Pillow\Plusebase\homePage.html` and
  `Pillow\Plusebase\ProductPage-Pillow\` contain the new RestAlign Custom HTML
  implementation intended for ShopBase/PlusBase Web Builder. All twelve HTML
  files are already tracked in GitHub at the baseline above.
- Preserve the actual folder spelling `Plusebase`; do not rename it casually.
- The sibling `E:\1st YEAR DTU\New folder\PluseBase` is a different directory
  containing reference PDFs, spreadsheets, policy documents and images. Its
  top-level inventory showed no .git or Pillow application source. Only its
  file inventory was inspected; private/business attachment contents were not
  read. It is not the new Pillow Custom HTML source directory.
- Next.js and PlusBase are separate implementations. A source edit in one does
  not establish that the other, or the saved PlusBase builder page, changed.
  Do not synchronize them or rebrand the Next.js app without a scoped request.

### Recent development history established from Git

- Initial Next.js history began 31 July 2026 with Create Next App and a Juujo
  CloudAlign storefront, followed by approved product layout, shell, mobile,
  photography, variants, pricing and checkout work.
- August history includes direct ShopBase cart/checkout integration, bundle
  pricing and discount rules, hidden unavailable cover upsell, cart UX,
  homepage visuals, licensed review import, inline review-video playback,
  product rename to Juujo OrthoAlign, GBP checkout handling and direct checkout
  replacing the older bridge.
- `1b8c28a` on 10 September repaired ESLint/build configuration. There are 20
  commits after that revision through the current HEAD.
- `d91214b` on 11 September introduced the PlusBase custom HTML files.
- 13 September PlusBase sequence: `9ea12af` press logos/CDN dimensions;
  `49e8150` Miroooo-style gallery/CDN/layout; `89d6fe1` scoped builder resets,
  sticky gallery, Grey/Blue image correction, bundle accordions and rings;
  `b1d3c50` trust badges, SVG rings and sticky ancestor correction;
  `b91ff63` synchronized ring animation, floating bundle badges and intermediate
  RestArch naming; `bb81ad0` hover zoom/gallery arrows; `bc14587` removed that
  hover magnification and corrected Buy 2 price visibility;
  `276b3f0` blue review stars and native review anchor;
  `678875e` latest RestAlign name and new Regular/High IDs;
  `f7a7117` Buy 1 selections and positional sequential SDK cart adds;
  `8cc06a2` direct cart navigation;
  `a4c6253` flush bundle/upsell borders and rotating button spinner;
  `eeb5b42` and `4a4ac1e` corrected drawer suppression to preserve header cart;
  `87e2cd2` reset loading after return/BFCache;
  `1e2e51a` then `7c330a7` finalized sticky layering at z-index 50 and removed
  the previous overlay override rules.
- Latest review work: `3d33fb1` shifted licensed review dates forward by 46 days
  and added `update-review-dates.js`; `6babb4f` added the 42,760-record CSV.
- These are observed collaborator commits, not actions performed by this task.
  Preserve their final state rather than restoring an intermediate fix.

### Next.js storefront map

- Package `juujo-uk`; Next.js 16.2.11; React/React DOM 19.2.4; TypeScript;
  Tailwind 4; Supabase SSR/client; Zod; lucide-react. Uses npm scripts and
  package-lock.json. Governing AGENTS.md says to read installed Next.js docs
  before writing code for this version.
- Documents fully read: AGENTS.md, CLAUDE.md (references AGENTS.md), PRODUCT.md,
  DESIGN.md and README.md. Product/design identity remains Juujo OrthoAlign.
  Blue/navy/powder/white, no orange or purple; Melbourne display and Inter body;
  real unbranded pillow imagery; clear height/colour selection; readable text,
  keyboard access and reduced motion. Existing rendered source may contain
  claims not controlled by disabled evidence flags; no claims audit/change was
  part of this task.
- `src/data/store.ts`: Juujo; default site URL `https://pillow.juujo.com` unless
  overridden by NEXT_PUBLIC_SITE_URL; support@juujo.com; GBP;
  product path `/products/juujo-cloudalign-pillow`; current product name
  `Juujo OrthoAlign™ Pillow`; SKU JUUJO-ORTHOALIGN. Do not infer that the old slug
  should be renamed merely because the display name changed.
- `/` renders HomePage.tsx. `/v2` renders HomePageV2.tsx with home-v2.css.
  The product route renders ProductPage.tsx, with styles also in
  approved-product.css and globals.css. Root layout supplies local fonts,
  marketing integrations, cart provider, attribution capture, header, footer
  and drawer.
- Other route families: cart, about/contact/FAQs/customer-reviews/sleep-quiz,
  how-it-works/height/cover guides, six blog articles, six policies,
  order-tracking, sign-in/sign-up/auth callback, profile/account settings/order
  history/admin, and APIs for checkout preparation, reviews, contact,
  order-tracking and PlusBase webhook. sitemap.ts, robots.ts and llms route
  describe discovery; sitemap excludes the experimental /v2 route.
- Pillow colours: White, Grey, Baby Blue, Navy Blue. Heights: Regular 8.9 cm,
  High 10.9 cm. Source dimensions 68.5 x 37 cm, approximately 1.36 kg;
  shape-retaining memory foam; removable cover washable at 30 C.
- Eleven ordered gallery assets under `/assets/gallery-01-hero-juujo.png`
  through the named gallery-11 asset; variant images under `/assets/variants/`.
- Product default: Buy 2, White/Regular, optional covers off. Next.js source
  has 1/2/4 bundles with base GBP 49.99/88.99/151.99; compare GBP 100/200/400;
  cover add-ons GBP 9.99/19.99/29.99 per respective bundle.
- Pricing is tiered: White/Regular unit GBP 49.99; White/High or coloured
  Regular GBP 54.99; coloured High GBP 59.99. Two-pillow increments per pillow
  are 0/500/1000 cents; four-pillow increments are 0/400/775 cents.
- CartProvider stores one configured bundle in `juujo-cart-v2`, with migration
  from `juujo-cart-v1`. Replacement covers depend on
  NEXT_PUBLIC_REPLACEMENT_COVERS_AVAILABLE. CartPage posts to
  `/api/checkout/prepare` and follows the returned hosted checkout URL.
- Server default checkout origin is `https://www.juujo.com`; default pillow
  product ID is `1000000673217468`. Old default variants remain White
  1000020655426746/1000020655426747, Grey 1000020655426744/1000020655426745,
  Blue 1000020655426742/1000020655426743, Navy
  1000020655426740/1000020655426741 (Regular/High). Environment overrides can
  replace these; configured secret/environment values were not inspected.
- Direct checkout creates a fresh cart through `/api/checkout/next/cart.json`,
  adds grouped selected items, maintains GB/GBP market cookies and returns
  `/checkouts/<token>`. Cover checkout requires configured product and variant
  IDs and returns 503 when requested mappings are absent. The two-pillow code
  is J2-7QF9MK; four-pillow selection-dependent codes live in
  `src/data/checkout-discounts.json`. Attribution includes UTMs, msclkid and
  gclid. The optional Supabase mirror records checkout sessions.
- Supabase schema defines profiles, orders, checkout_sessions and reviews.
  MarketingIntegrations reads optional GTM, Clarity and Tawk public environment
  settings. Their production configuration was not checked.
- `scripts/publish-shopbase-bridge.mjs` and
  `scripts/publish-shopbase-discounts.mjs` are external mutation tools, not
  routine verification commands. They were not run.

### PlusBase Custom HTML map and latest contracts

`Plusebase/ProductPage-Pillow` contains these separately pasteable sections:

1. `01-announcement-marquee.html`
2. `02-product-hero-buybox.html`
3. `03-press-logos.html`
4. `04-feature-zones-story.html`
5. `05-customer-reviews.html`
6. `06-chiropractor-video.html`
7. `07-ergonomic-support-grid.html`
8. `08-faq-accordion.html`
9. `09-counter-rings-social-proof.html`
10. `10-sticky-atc-bar.html`

- `all-sections-combined.html` is a separate complete-page composition. Its
  header instructs pasting the entire file into one Full-Width Custom HTML
  block. It is not a byte-for-byte concatenation of sections 01-10: its review,
  chiropractor, section layout and pricing implementations differ. Establish
  which composition the user is editing before applying a future change.
- Combined root `pb-product-page-root`; separate hero `pb-prod-sec-hero`;
  separate sticky `pb-prod-sec-sticky`; homepage `pb-custom-home-root`.
  Components use scoped `pb-*` CSS and builder wrapper rules with :has to avoid
  leaking resets. Hero ancestors are adjusted for sticky positioning.
- Latest visible name in all twelve HTML files is RestAlign Pillow, replacing
  the intermediate RestArch/older OrthoAlign name. Historical `juujo` state,
  event and CSS identifiers remain intentionally; no global rename is implied.
- Hero and combined product mappings: Regular product 1000000676452166;
  High product 1000000676452167. Current variants are:

| Colour | Regular variant | High variant |
| --- | --- | --- |
| White | 1000020747722825 | 1000020747723105 |
| Grey | 1000020747722821 | 1000020747723104 |
| Baby Blue | 1000020747722827 | 1000020747723101 |
| Navy Blue | 1000020747722824 | 1000020747723102 |

- Cooling cover remains variant 1000020655426748. Its validity in the new
  sleepingpillow store was not verified. Do not silently replace it.
- Both product variants use `window.juujoProductState` and the
  `juujo:state-change` event. Separate hero broadcasts state directly in
  event.detail; combined broadcasts `{ state, source }`. Combined initializes
  with `window.juujoProductState || ...`; separate hero assigns its own state.
  Do not assume it is safe to mount both compositions on one page.
- Default Buy 2 and per-pillow White/Regular state; individual colour and
  height selectors also exist for Buy 1. Covers add a quantity equal to the
  selected pillow count. Codes remain J2-7QF9MK for Buy 2 and J4-8NW3AX for Buy 4.
- Combined pricing uses the same tier increments as Next.js. Separate
  `02-product-hero-buybox.html` getTotalCents uses fixed bundle base price plus
  cover add-on, without colour/height tier increments. This is a current source
  difference, not a corrected defect or confirmed owner preference.
- Product ATC uses sequential `await sbsdk.cart.add(variantId, quantity)` calls,
  then navigates to `/cart`, optionally `?discount=<code>`. It has a SDK-ready
  branch; current error/no-SDK branches can still navigate to cart. Code
  constructs item properties but the positional SDK call only sends variant
  ID and quantity. No live cart mutation was performed to test that behavior.
- During ATC only, body class `pb-atc-in-progress` hides drawer elements.
  Header cart clicks otherwise retain native sidebar behavior. Button spinner
  and body state reset on pageshow, popstate, visible visibilitychange and
  focus; other clicks also clear the suppression class. Latest sticky z-index
  is 50. Preserve these fixes and do not restore global drawer suppression.
- Gallery has eleven slides, thumbnails, arrows and lightbox. Latest source
  removed the briefly added hover magnification. White hero image is
  `https://e-assets.beeketing.net/10690/10690847/themes/1789267483ad01c077dd.png`;
  Grey `17892697294e1cdac6bb.jpeg`, Baby Blue `1789269720ae4d4e7c78.jpeg`, Navy
  `17892697457e14a8efdf.jpeg` under the same CDN directory. Preserve Grey/Blue
  assignment. Sticky thumb is the fixed CDN image `17892693643c6457e34f.jpeg`.
- Product rating links target native PlusBase reviews `#O9zSDc`, with fallback
  selectors; rating colour is #0092e4. The separate section 05 has four static
  review cards, UI controls and a Show more reviews button but no script or
  fetch. It is distinct from native PlusBase reviews and Next.js's review API.
- Standalone rings animate SVG stroke and numeric label together over 1100ms
  with quartic ease-out, triggered by IntersectionObserver threshold 0.2.
- Hero and press assets are on e-assets.beeketing.net. Some lower-section
  imagery/videos still depend on `https://pillow-sepia.vercel.app/assets/...`.
  Do not remove or change that Vercel media host without checking these links.
- `Plusebase/homePage.html` is a vanilla HTML/CSS/JS V2 blue homepage export
  (data-juujo-version 2.4.0), based on HomePageV2 and home-v2.css. Includes hero,
  comparison/support stories, interactive six zones, lifestyle sections,
  heights, bundles, chiropractor video, reviews, specifications, FAQ and
  sticky quick-buy. Most imagery comes from pillow-sepia.vercel.app.
- Homepage visible copy was renamed RestAlign, but its variant matrix still
  contains the old 1000020655426740-6747 IDs. Its cart handler still calls
  `sbsdk.cart.add({items: ...})`, falls back to `/cart/add.js`, navigates to
  `/checkout?discount=...` for discounted bundles, and has a final fallback
  containing only the first line item. Those are observed differences from
  the new product page and must not be described as already migrated/fixed.

### Reviews, CSV and earlier import-format task

- `src/data/licensed-product-reviews.json` has 500 records: 453 five-star,
  44 four-star, one three-star, no two-star, two one-star; 312 image and 188
  video records. Properly parsed date range is 16 September 2025 through
  30 September 2026, with zero invalid dates. Some dates are after this task
  date; preserved exactly. An initial diagnostic sorted human-readable dates
  lexically; it was corrected to chronological parsing before this record.
- `siteConfig.reviewRating` is 4.9 and `reviewCount` is 42,093. API
  `/api/reviews` separately reports aggregateTotal and totalImported, with
  default page size 8, cap 48 and rating/media filters. Do not conflate the
  aggregate claim, the 500 imported records and the 42,760-row CSV.
- Root CSV `list_reviews_1000000676452166_2026_September_13.csv` contains 42,760
  data records and 14 fields. Its SHA-256 is
  `f4ff91100d767bede9c12e3d2ca150a62473b37fda39c19a8d92e4a27697e2b8`.
  This matches the original CSV audited in the earlier 13 September standalone
  import-format task, not the corrected Downloads output.
- Earlier workspace history records preserved product 1000000676452166 / handle
  restalign-pillow; outputs `C:\Users\sahil\Downloads\pillow_reviews_corrected.csv`
  and `pillow_reviews_small_batches.zip` (11 batches). They are not installed
  in this Git repository. Earlier checks preserved one original blank review
  text/title record and two duplicate-email occurrences, validated all 441
  unique image URLs, and did not establish actual import acceptance. This task
  did not re-import, regenerate, replace or alter any review file.
- `update-review-dates.js` is a modifying script with optional product filter;
  it was inspected and not executed. No reviewer names/emails/bodies are copied
  into this context.

### Inspection and verification

- Read complete workspace history in chunks, project governing docs, current
  Git history/status/remotes, package/config files, store and discount data,
  page/layout/product/home/cart sources, direct checkout helper/API, reviews
  contract/API, marketing/attribution, route inventory/sitemap, schema table
  definitions and existing verifier/test scripts.
- Read all twelve PlusBase HTML files for structured section, dependency,
  naming and script inventory; inspected product/combined/home/sticky state,
  pricing, variant mappings, cart/reset handlers and ring animation in detail.
- `git fetch --all --prune`, `git rev-list --left-right --count
  'HEAD...@{upstream}'`, `git ls-remote origin refs/heads/main`, recent/reverse
  git log, staged/unstaged diff statistics and complete untracked listing used
  for reconciliation. No dirty files existed to overwrite.
- `npm run verify`: passed, Juujo store verification passed. This verifier
  checks src/public, expected routes/assets, inherited branding and the trial
  phrase; it does not validate the PlusBase HTML directory.
- `npm run test:checkout`: both existing mocked tests passed (line preservation
  and rejection handling). Node emitted MODULE_TYPELESS_PACKAGE_JSON warning;
  package.json was deliberately left unchanged. These tests do not contact
  PlusBase or prove the new HTML's native SDK behavior.
- Read-only public HTTP GET checks: Vercel homepage and
  `/products/juujo-cloudalign-pillow` returned 200 with Juujo OrthoAlign titles.
  `https://sleepingpillow.onshopbase.com/products/restalign-pillow` returned 404.
  The 404 does not establish private builder contents, actual assigned domain,
  correct published route or admin product validity. No production claim is
  made about which Custom HTML block is pasted there.
- Web renderer initially could not open those URLs; direct HTTP GETs supplied
  the status/title evidence. Initial oversized context/search outputs were
  recovered with smaller chunks, exclusions and targeted reads. No source
  was changed by diagnostic errors.
- No browser visual/device check, build, lint, typecheck, live SDK cart flow,
  hosted checkout transaction, admin inspection, import, payment/order,
  production environment verification or deployment audit was performed.
  This is memory reconciliation; build/typecheck could create generated files
  and were unnecessary for an unchanged-code task.

### Files changed, publication boundary and continuation

- Only this new `Pillow\CONTEXT.md` and an append-only workspace
  `E:\1st YEAR DTU\New folder\CONTEXT.md` entry were written.
- Application files/routes changed: none. All 207 pre-existing tracked files
  are protected by the before/after SHA-256 comparison.
- Expected final Git state: main at 6babb4f, equal to origin/main; no staged or
  tracked modifications; only new untracked CONTEXT.md. Final audit is recorded
  below after the writes.
- No commit, push, branch, PR, pull, merge, rebase, reset, stash, source
  overwrite, deployment, promotion, domain/env setting change, PlusBase admin
  mutation, review import, checkout/cart mutation, payment, order or message
  to another person occurred.
- Next work should start from this map and a fresh Git fetch. The newest work
  is RestAlign's PlusBase product page/cart UI followed by review dates/CSV.
  Resolve target composition from the user's next scope/current builder state;
  preserve the old Next.js app, homepage differences and exact assets unless
  the user explicitly includes them. Remaining uncertainty: actual live
  PlusBase domain/route and pasted composition; current native cart/discount
  acceptance; whether the homepage/standalone pricing differences are intended.

### Final preservation audit - 2026-09-14 07:50:52 +05:30

- Rechecked branch `main`, HEAD/upstream
  `6babb4f2f11dbaa5c7590e88a8253f9615425049` and ahead/behind `0/0`.
- Git reports zero tracked unstaged files, zero staged files and exactly one
  untracked file: this `CONTEXT.md`. All 207 pre-existing tracked files still
  match the clean Git index/HEAD. No application or PlusBase HTML file changed.
- Before this audit block, this repository context contained 331 lines and
  21,092 bytes; the workspace context contained 2,035 lines and 283,829 bytes.
  Both complete files were read after the append-only writes. The original
  workspace history remains above the new entry; it was not replaced.
- Final publication state is unchanged: no commit, push, branch, PR, pull,
  merge, rebase, reset, stash, deployment or external-system mutation occurred.

## 2026-09-14 08:09:38 +05:30 - All Pillow review dates shifted back one day

### Request, scope and starting state

- User request: use the existing review-date update file to change reviews by
  `-1` day for every Pillow product and country; if Pillow had no updater, copy
  the one from Buudy-Vercel; change nothing else.
- Practical scope: run the existing root `update-review-dates.js` without a
  product filter so it visits every review JSON dataset its built-in discovery
  supports. Do not edit the updater, CSV, reviews' content, application code,
  PlusBase HTML, assets, product data, checkout or configuration.
- Repository: `E:\1st YEAR DTU\New folder\Pillow`; public Next.js context
  `https://pillow-sepia.vercel.app`; branch `main`; starting HEAD and fetched
  `origin/main` both `6babb4f2f11dbaa5c7590e88a8253f9615425049`,
  ahead/behind `0/0`.
- Starting worktree: only the required untracked `CONTEXT.md` from the prior
  memory refresh. No staged or tracked modification existed. The current
  GitHub head was fetched and reconciled before mutation.

### Existing updater and dataset discovery

- Existing `update-review-dates.js` was found and read in full, so nothing was
  copied from or changed in `Buudy-Vercel`.
- Its discovery checks `src/data`, `src/data/reviews`, and country folders under
  `apps/us`, `apps/uk`, `apps/ca`, and `apps/au`. This Pillow repository has no
  `apps` directory and currently has one matching JSON dataset:
  `src/data/licensed-product-reviews.json`.
- The separate root PlusBase review CSV is not discovered or modified by this
  updater. The user's direction to use the existing updater was followed
  exactly; no second custom rewrite was added.

### Change performed

- Exact command: `node update-review-dates.js -1`, with no product handle.
- Script report: `Updated 500 reviews in
  src/data/licensed-product-reviews.json`; `500 total reviews across 1 file`.
- Every one of the 500 `date` fields moved back exactly one UTC calendar day.
  The wrapped dataset's `source.importedAt`, which the existing updater handles
  by design, moved from `2026-10-03` to `2026-10-02`.
- Chronological review range changed from 16 September 2025 through
  30 September 2026 to 15 September 2025 through 29 September 2026.
- Output JSON SHA-256 after the shift:
  `d822a78265897a70796f35f98fb3696f121003c2a0125af92dd9474dca96ea13`.

### Exact preservation and verification

- Compared the changed JSON structurally with the Git HEAD version. Record
  count/order remained 500/500. All 500 date deltas were exactly `-86400000`
  milliseconds. There were zero invalid shifts, zero displayDate failures and
  zero changed non-date review records. All top-level non-date data matched.
- The original 42,760-row CSV remained byte-identical at SHA-256
  `f4ff91100d767bede9c12e3d2ca150a62473b37fda39c19a8d92e4a27697e2b8`.
- `npm run verify` passed with `Juujo store verification passed`.
- `git diff --check` passed. The tracked diff contains exactly one file:
  `src/data/licensed-product-reviews.json` (`1 insertion`, `1 deletion` because
  the compact JSON is a single line). The updater itself is unchanged.
- No lint, typecheck, build or browser test was run because this is a verified
  data-only date shift and those checks would not add evidence about the dates.
- No live PlusBase review import, admin action, cart/checkout, payment or order
  was performed.

### Mistakes, final state and publication boundary

- A broad source search displayed/truncated the one-line review JSON; structured
  Node comparison was then used for concise deterministic verification.
- Two malformed diagnostic command invocations failed before execution due to
  JavaScript/path syntax and changed no file. The corrected read-only command
  then captured the task time and Git state.
- Files changed by the requested operation: only
  `src/data/licensed-product-reviews.json`. Documentation-only appends were made
  to this file and the workspace context as required. No other application or
  data file changed.
- Final expected worktree: tracked modification
  `src/data/licensed-product-reviews.json` plus untracked repository
  `CONTEXT.md`; nothing staged. HEAD/upstream remain `6babb4f`, `0/0`.
- No commit, push, branch, PR, pull, merge, rebase, reset, stash, deploy,
  production setting change or modification to Buudy-Vercel occurred.
- Remaining work: none for the local one-day shift. GitHub/production remain on
  the prior dates until the user separately requests publication.
