import fs from "node:fs";
import path from "node:path";

function readKeyValueFile(filePath) {
  return Object.fromEntries(
    fs
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        return [line.slice(0, separator), line.slice(separator + 1)];
      }),
  );
}

const env = readKeyValueFile(path.join(process.cwd(), ".env.local"));
const discountConfig = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "src/data/checkout-discounts.json"),
    "utf8",
  ),
);
const storeUrl = env.SHOPBASE_STORE_URL?.replace(/\/$/, "");
const apiKey = env.SHOPBASE_API_KEY;
const password = env.SHOPBASE_PASSWORD;
const productId = Number(
  env.PLUSBASE_PILLOW_PRODUCT_ID || "1000000673217468",
);

if (!storeUrl || !apiKey || !password) {
  throw new Error("ShopBase credentials are missing from .env.local.");
}

const authorization = Buffer.from(`${apiKey}:${password}`).toString("base64");
const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

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
  await sleep(600);
  return payload;
}

const definitions = [
  {
    code: discountConfig.two,
    quantity: 2,
    discountUsd: 15,
  },
];

// ShopBase stores fixed discounts in USD and converts the aggregated cart to
// GBP. These values are calibrated against the live GBP market rate on
// 2026-08-23, including ShopBase's cart-level penny rounding.
const fourPillowDiscounts = {
  "0-0": 65.44,
  "0-1": 68.51,
  "0-2": 71.58,
  "0-3": 74.65,
  "0-4": 77.72,
  "1-0": 66.81,
  "1-1": 69.88,
  "1-2": 72.94,
  "1-3": 76.01,
  "2-0": 68.17,
  "2-1": 71.24,
  "2-2": 74.31,
  "3-0": 69.53,
  "3-1": 72.6,
  "4-0": 70.9,
};

for (let tierOneCount = 0; tierOneCount <= 4; tierOneCount += 1) {
  for (
    let tierTwoCount = 0;
    tierTwoCount <= 4 - tierOneCount;
    tierTwoCount += 1
  ) {
    const key = `${tierOneCount}-${tierTwoCount}`;
    definitions.push({
      code: discountConfig.four[key],
      quantity: 4,
      discountUsd: fourPillowDiscounts[key],
    });
  }
}

const existingRules =
  (await shopbase("/admin/price_rules.json?limit=250")).price_rules || [];
const startsAt = new Date(Date.now() - 60_000).toISOString();
const published = [];

for (const definition of definitions) {
  let rule = existingRules.find((candidate) => candidate.title === definition.code);
  const rulePayload = {
    title: definition.code,
    type: "manual",
    target_type: "line_item",
    target_selection: "all",
    allocation_method: "across",
    value_type: "fixed_amount",
    value: -definition.discountUsd,
    customer_selection: "all",
    prerequisite_product_ids: [productId],
    prerequisite_quantity_range: {
      greater_than_or_equal_to: definition.quantity,
    },
    usage_limit: -1,
    once_per_customer: false,
    starts_at: startsAt,
  };

  if (rule) {
    rule = (
      await shopbase(`/admin/price_rules/${rule.id}.json`, {
        method: "PUT",
        body: JSON.stringify({ price_rule: { id: rule.id, ...rulePayload } }),
      })
    ).price_rule;
  } else {
    rule = (
      await shopbase("/admin/price_rules.json", {
        method: "POST",
        body: JSON.stringify({ price_rule: rulePayload }),
      })
    ).price_rule;
  }

  const codes =
    (
      await shopbase(
        `/admin/price_rules/${rule.id}/discount_codes.json`,
      )
    ).discount_codes || [];
  if (!codes.some((discount) => discount.code === definition.code)) {
    await shopbase(`/admin/price_rules/${rule.id}/discount_codes.json`, {
      method: "POST",
      body: JSON.stringify({ discount_code: { code: definition.code } }),
    });
  }

  published.push({
    code: definition.code,
    quantity: definition.quantity,
    discountUsd: definition.discountUsd,
    ruleId: rule.id,
  });
}

console.log(JSON.stringify({ publishedCount: published.length, published }));
