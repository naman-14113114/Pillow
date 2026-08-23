export const checkoutMarketCookies = [
  { name: "X-Global-Market", value: "GB" },
  { name: "X-Global-Market-Currency", value: "GBP" },
] as const;

type CheckoutItem = {
  productId: string | number;
  variantId: string | number;
  quantity: number;
};

type CheckoutProperty = {
  name: string;
  value: string;
};

type CreatePlusbaseCheckoutOptions = {
  origin: string;
  items: CheckoutItem[];
  properties?: CheckoutProperty[];
  fetchImpl?: typeof fetch;
};

function appendCookies(current: string, response: Response) {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
  };
  const setCookies =
    typeof headers.getSetCookie === "function"
      ? headers.getSetCookie()
      : headers.get("set-cookie")
        ? [headers.get("set-cookie") as string]
        : [];

  const cookieMap = new Map<string, string>();
  [...current.split(";"), ...setCookies.map((cookie) => cookie.split(";")[0])]
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((pair) => {
      const [name] = pair.split("=");
      if (name) cookieMap.set(name, pair);
    });

  return Array.from(cookieMap.values()).join("; ");
}

function numericShopbaseId(value: string | number, label: string) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid ShopBase ${label}.`);
  }
  return parsed;
}

export async function createPlusbaseCheckout({
  origin,
  items,
  properties = [],
  fetchImpl = fetch,
}: CreatePlusbaseCheckoutOptions) {
  if (!items.length) {
    throw new Error("Cannot create an empty ShopBase cart.");
  }

  const plusbaseOrigin = new URL(origin).origin;
  let cookie = checkoutMarketCookies
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const requestHeaders = {
    accept: "application/json",
    cookie,
  };

  const createResponse = await fetchImpl(
    `${plusbaseOrigin}/api/checkout/next/cart.json`,
    {
      method: "POST",
      headers: requestHeaders,
      cache: "no-store",
    },
  );
  cookie = appendCookies(cookie, createResponse);

  const createJson = await createResponse.json();
  const cartToken = createJson?.result?.token;
  const checkoutToken = createJson?.result?.checkout_token;

  if (
    !createResponse.ok ||
    typeof cartToken !== "string" ||
    !cartToken ||
    typeof checkoutToken !== "string" ||
    !checkoutToken
  ) {
    throw new Error("Could not create ShopBase cart.");
  }

  for (const item of items) {
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error("Invalid ShopBase item quantity.");
    }

    const response = await fetchImpl(
      `${plusbaseOrigin}/api/checkout/next/cart.json?cart_token=${encodeURIComponent(
        cartToken,
      )}`,
      {
        method: "PUT",
        headers: {
          ...requestHeaders,
          "content-type": "application/json",
          cookie,
        },
        cache: "no-store",
        body: JSON.stringify({
          cartItem: {
            product_id: numericShopbaseId(item.productId, "product ID"),
            variant_id: numericShopbaseId(item.variantId, "variant ID"),
            qty: item.quantity,
            properties,
            metadata: {
              image_preview_id: "",
            },
          },
          from: "add-to-cart",
        }),
      },
    );
    cookie = appendCookies(cookie, response);

    const json = await response.json();
    if (!response.ok || json?.code !== 0) {
      throw new Error("Could not add item to ShopBase cart.");
    }
  }

  return {
    checkoutToken,
    checkoutUrl: `${plusbaseOrigin}/checkouts/${checkoutToken}`,
  };
}
