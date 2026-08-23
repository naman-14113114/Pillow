import assert from "node:assert/strict";
import test from "node:test";

import {
  checkoutMarketCookies,
  createPlusbaseCheckout,
} from "../src/lib/plusbase-checkout.ts";

function jsonResponse(payload, { status = 200, cookies = [] } = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: {
      getSetCookie: () => cookies,
      get: () => null,
    },
    json: async () => payload,
  };
}

test("creates a hosted checkout directly and preserves every selected line", async () => {
  const requests = [];
  const responses = [
    jsonResponse(
      {
        code: 0,
        result: {
          token: "fresh-cart-token-123",
          checkout_token: "fresh-checkout-token-456",
        },
      },
      { cookies: ["cart_session=session-1; Path=/; HttpOnly"] },
    ),
    jsonResponse({ code: 0 }),
    jsonResponse({ code: 0 }),
  ];
  const fetchImpl = async (url, options) => {
    requests.push({ url: String(url), options });
    return responses.shift();
  };

  const result = await createPlusbaseCheckout({
    origin: "https://www.juujo.com/cart",
    items: [
      {
        productId: "1000000673217468",
        variantId: "1000020655426746",
        quantity: 2,
      },
      {
        productId: "1000000673217468",
        variantId: "1000020655426745",
        quantity: 1,
      },
    ],
    properties: [{ name: "_blfm_msclkid", value: "click-123" }],
    fetchImpl,
  });

  assert.deepEqual(result, {
    checkoutToken: "fresh-checkout-token-456",
    checkoutUrl:
      "https://www.juujo.com/checkouts/fresh-checkout-token-456",
  });
  assert.equal(requests.length, 3);
  assert.equal(
    requests[0].url,
    "https://www.juujo.com/api/checkout/next/cart.json",
  );
  assert.equal(requests[0].options.method, "POST");
  assert.match(requests[0].options.headers.cookie, /X-Global-Market=GB/);
  assert.match(
    requests[0].options.headers.cookie,
    /X-Global-Market-Currency=GBP/,
  );

  const firstAdd = JSON.parse(requests[1].options.body);
  assert.equal(
    requests[1].url,
    "https://www.juujo.com/api/checkout/next/cart.json?cart_token=fresh-cart-token-123",
  );
  assert.equal(firstAdd.cartItem.product_id, 1000000673217468);
  assert.equal(firstAdd.cartItem.variant_id, 1000020655426746);
  assert.equal(firstAdd.cartItem.qty, 2);
  assert.deepEqual(firstAdd.cartItem.properties, [
    { name: "_blfm_msclkid", value: "click-123" },
  ]);
  assert.match(requests[1].options.headers.cookie, /cart_session=session-1/);

  const secondAdd = JSON.parse(requests[2].options.body);
  assert.equal(secondAdd.cartItem.variant_id, 1000020655426745);
  assert.equal(secondAdd.cartItem.qty, 1);
  assert.deepEqual(checkoutMarketCookies, [
    { name: "X-Global-Market", value: "GB" },
    { name: "X-Global-Market-Currency", value: "GBP" },
  ]);
});

test("fails closed when ShopBase rejects a cart item", async () => {
  const responses = [
    jsonResponse({
      code: 0,
      result: {
        token: "cart-token",
        checkout_token: "checkout-token",
      },
    }),
    jsonResponse({ code: 422 }, { status: 200 }),
  ];

  await assert.rejects(
    createPlusbaseCheckout({
      origin: "https://www.juujo.com",
      items: [
        {
          productId: "1000000673217468",
          variantId: "1000020655426746",
          quantity: 1,
        },
      ],
      fetchImpl: async () => responses.shift(),
    }),
    /Could not add item to ShopBase cart/,
  );
});
