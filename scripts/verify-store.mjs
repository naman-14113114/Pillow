import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceRoots = ["src", "public"].map((item) => path.join(root, item));
const expectedRoutes = [
  "src/app/page.tsx",
  "src/app/products/juujo-cloudalign-pillow/page.tsx",
  "src/app/cart/page.tsx",
  "src/app/pages/sleep-quiz/page.tsx",
  "src/app/pages/contact-us/page.tsx",
  "src/app/order-tracking/page.tsx",
  "src/app/blog/page.tsx",
  "src/app/api/checkout/prepare/route.ts",
  "src/app/api/plusbase/webhook/route.ts",
];
const requiredAssets = [
  "public/assets/gallery/hero-bedroom.png",
  "public/assets/gallery/model-side-sleeper.png",
  "public/assets/gallery/studio-product.png",
  "public/assets/gallery/four-colours.png",
  "public/assets/gallery/support-zones.png",
  "public/assets/gallery/bundle-packaging.png",
];

const failures = [];
for (const relative of [...expectedRoutes, ...requiredAssets]) {
  if (!fs.existsSync(path.join(root, relative))) failures.push(`Missing ${relative}`);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) return [];
      return walk(full);
    }
    return [full];
  });
}

const textExtensions = new Set([".ts", ".tsx", ".css", ".md", ".json", ".mjs"]);
const forbiddenBrandPatterns = [
  /\bmuuhu\b/i,
  /\bbuudy\b/i,
  /\bsora\b/i,
  /\bmellow\b/i,
];

for (const file of sourceRoots.flatMap(walk)) {
  if (!textExtensions.has(path.extname(file))) continue;
  const relative = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");

  for (const pattern of forbiddenBrandPatterns) {
    if (pattern.test(text)) failures.push(`Inherited brand marker in ${relative}: ${pattern}`);
  }
}

const allSource = walk(path.join(root, "src"))
  .filter((file) => [".ts", ".tsx"].includes(path.extname(file)))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
const trialMatches = allSource.match(/90-night comfort trial/gi) || [];
if (trialMatches.length !== 1) {
  failures.push(`Expected the comfort-trial phrase once, found ${trialMatches.length}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Juujo store verification passed.");
