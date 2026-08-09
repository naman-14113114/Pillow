import fs from "node:fs";
import path from "node:path";

function readEnvironment() {
  const source = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
  return Object.fromEntries(
    source
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        return [line.slice(0, separator), line.slice(separator + 1)];
      }),
  );
}

const env = readEnvironment();
const storeUrl = env.SHOPBASE_STORE_URL?.replace(/\/$/, "");
const apiKey = env.SHOPBASE_API_KEY;
const password = env.SHOPBASE_PASSWORD;
const scriptUrl =
  env.SHOPBASE_BRIDGE_SCRIPT_URL ||
  "https://juujo-uk.vercel.app/shopbase-add-to-cart.js";

if (!storeUrl || !apiKey || !password) {
  throw new Error("ShopBase credentials are missing from .env.local.");
}

const authorization = Buffer.from(`${apiKey}:${password}`).toString("base64");

async function shopbase(endpoint, init = {}) {
  const response = await fetch(`${storeUrl}${endpoint}`, {
    ...init,
    headers: {
      authorization: `Basic ${authorization}`,
      "content-type": "application/json",
      ...init.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `ShopBase ${init.method || "GET"} ${endpoint} failed (${response.status}): ${JSON.stringify(payload)}`,
    );
  }
  return payload;
}

const variantPrices = new Map([
  ["1000020655426740", 72.59],
  ["1000020655426741", 79.19],
  ["1000020655426742", 72.59],
  ["1000020655426743", 79.19],
  ["1000020655426744", 72.59],
  ["1000020655426745", 79.19],
  ["1000020655426746", 65.99],
  ["1000020655426747", 72.59],
]);

for (const [id, price] of variantPrices) {
  await shopbase(`/admin/variants/${id}.json`, {
    method: "PUT",
    body: JSON.stringify({
      variant: { id: Number(id), price, compare_at_price: 134.66 },
    }),
  });
}

const pageResponse = await shopbase("/admin/pages.json?limit=250");
let bridgePage = pageResponse.pages?.find(
  (page) => page.handle === "add-to-cart",
);

if (!bridgePage) {
  const created = await shopbase("/admin/pages.json", {
    method: "POST",
    body: JSON.stringify({
      page: {
        title: "Add to cart",
        handle: "add-to-cart",
        body_html: "",
        published: true,
        is_show_in_search: false,
      },
    }),
  });
  bridgePage = created.page;
}

const scriptResponse = await shopbase("/admin/script_tags.json");
const existingScript = scriptResponse.script_tags?.find(
  (script) => script.src === scriptUrl,
);

if (!existingScript) {
  await shopbase("/admin/script_tags.json", {
    method: "POST",
    body: JSON.stringify({ script_tag: { event: "onload", src: scriptUrl } }),
  });
}

console.log(
  JSON.stringify({
    pageId: bridgePage.id,
    pageHandle: bridgePage.handle,
    variantPricesUpdated: variantPrices.size,
    scriptUrl,
  }),
);
