import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const bridgeSource = await readFile(
  new URL("../public/shopbase-add-to-cart.js", import.meta.url),
  "utf8",
);

function createElement() {
  const bridge = { classList: { add() {} } };
  const status = { textContent: "" };
  const retry = { addEventListener() {} };

  return {
    id: "",
    innerHTML: "",
    setAttribute() {},
    querySelector(selector) {
      if (selector === ".juujo-bridge") return bridge;
      if (selector === "[data-status]") return status;
      if (selector === "button") return retry;
      return null;
    },
  };
}

async function runBridge() {
  const errors = [];
  const cart = {
    items: [{ id: 99, variant_id: 999, qty: 1 }],
    total_quantity: 1,
  };
  let href =
    "https://www.juujo.com/cart?juujo_bridge=1" +
    "&items=" +
    encodeURIComponent(
      JSON.stringify([
        {
          product_id: "1000000673217468",
          variant_id: "1000020655426746",
          quantity: 2,
        },
      ]),
    ) +
    "&discount=J2-TEST";
  const location = {
    origin: "https://www.juujo.com",
    pathname: "/cart",
    search: new URL(href).search,
    get href() {
      return href;
    },
    set href(value) {
      href = new URL(value, this.origin).toString();
    },
  };
  const storage = new Map([["cartCheckoutToken", "checkout-token-123"]]);
  const shell = createElement();
  const cookies = [];

  const window = {
    location,
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      removeItem: (key) => storage.delete(key),
    },
    sessionStorage: { setItem() {} },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    sbsdk: {
      ready(callback) {
        callback();
      },
      cart: {
        // ShopBase's current SDK returns a plain object from get(), not a Promise.
        get() {
          return {
            ...cart,
            items: cart.items.map((item) => ({ ...item })),
          };
        },
        async remove(id) {
          cart.items = cart.items.filter((item) => item.id !== id);
          cart.total_quantity = cart.items.reduce(
            (total, item) => total + item.qty,
            0,
          );
          return { success: true };
        },
        async add(variantId, quantity) {
          if (!storage.has("cartCheckoutToken")) {
            storage.set("cartCheckoutToken", "fresh-checkout-token-456");
          }
          cart.items.push({
            id: variantId,
            variant_id: variantId,
            qty: quantity,
          });
          cart.total_quantity += quantity;
          return { success: true };
        },
      },
    },
  };

  const document = {
    readyState: "complete",
    body: { appendChild() {} },
    documentElement: { appendChild() {} },
    createElement: () => shell,
    getElementById: () => null,
    querySelector: () => null,
  };
  Object.defineProperty(document, "cookie", {
    set(value) {
      cookies.push(value);
    },
  });

  vm.runInNewContext(bridgeSource, {
    URL,
    URLSearchParams,
    console: { error: (...args) => errors.push(args.map(String).join(" ")) },
    document,
    window,
  });

  await new Promise((resolve) => setTimeout(resolve, 350));
  return { cart, cookies, errors, href };
}

test("bridge supports ShopBase's synchronous cart.get and opens checkout", async () => {
  const result = await runBridge();

  assert.deepEqual(result.errors, []);
  assert.equal(result.cart.items.length, 1);
  assert.equal(result.cart.items[0].variant_id, 1000020655426746);
  assert.equal(result.cart.items[0].qty, 2);
  assert.ok(result.cookies.some((cookie) => cookie.startsWith("X-Global-Market=GB;")));
  assert.ok(
    result.cookies.some((cookie) =>
      cookie.startsWith("X-Global-Market-Currency=GBP;"),
    ),
  );
  assert.equal(
    result.href,
    "https://www.juujo.com/checkouts/fresh-checkout-token-456?discount=J2-TEST",
  );
});
