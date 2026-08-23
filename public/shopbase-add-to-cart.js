(() => {
  const params = new URLSearchParams(window.location.search);
  if (window.location.pathname !== "/cart" || params.get("juujo_bridge") !== "1") {
    return;
  }

  const allowedVariants = new Set([
    "1000020655426740",
    "1000020655426741",
    "1000020655426742",
    "1000020655426743",
    "1000020655426744",
    "1000020655426745",
    "1000020655426746",
    "1000020655426747",
  ]);
  const attributionKeys = [
    "msclkid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ];
  const attribution = Object.fromEntries(
    attributionKeys
      .map((key) => [key, params.get(key)])
      .filter((entry) => entry[1]),
  );
  const discountCode = params.get("discount") || "";
  if (discountCode && !/^[A-Z0-9-]{4,32}$/.test(discountCode)) return;

  const shell = document.createElement("main");
  shell.setAttribute("aria-live", "polite");
  shell.innerHTML = `
    <style>
      html,body{margin:0;min-height:100%;background:#f4f8ff;color:#0a2353;font-family:Arial,sans-serif}
      .juujo-bridge{display:grid;min-height:100vh;place-items:center;padding:24px;text-align:center}
      .juujo-bridge__mark{margin-bottom:18px;color:#164ea4;font-family:Georgia,serif;font-size:42px;font-weight:700}
      .juujo-bridge__spinner{width:34px;height:34px;margin:0 auto 20px;border:3px solid #c8d9f0;border-top-color:#164ea4;border-radius:50%;animation:juujo-spin .7s linear infinite}
      .juujo-bridge h1{margin:0 0 8px;font-size:24px}
      .juujo-bridge p{margin:0;color:#4f6282;font-size:15px;line-height:1.5}
      .juujo-bridge button{display:none;height:46px;margin:20px auto 0;padding:0 20px;border:0;border-radius:6px;background:#164ea4;color:#fff;font-size:15px;font-weight:700}
      .juujo-bridge.is-error button{display:inline-flex;align-items:center}
      .juujo-bridge.is-error .juujo-bridge__spinner{display:none}
      @keyframes juujo-spin{to{transform:rotate(360deg)}}
      @media(prefers-reduced-motion:reduce){.juujo-bridge__spinner{animation:none}}
    </style>
    <section class="juujo-bridge">
      <div>
        <div class="juujo-bridge__mark">juujo</div>
        <div class="juujo-bridge__spinner" aria-hidden="true"></div>
        <h1>Preparing your secure checkout</h1>
        <p data-status>Adding your selected OrthoAlign pillows.</p>
        <button type="button">Try again</button>
      </div>
    </section>`;
  document.body.replaceChildren(shell);

  const bridge = shell.querySelector(".juujo-bridge");
  const status = shell.querySelector("[data-status]");
  const retry = shell.querySelector("button");
  retry.addEventListener("click", () => window.location.reload());

  const fail = (message) => {
    bridge.classList.add("is-error");
    status.textContent = message;
  };

  let parsedItems;
  try {
    parsedItems = JSON.parse(params.get("items") || "[]");
  } catch {
    fail("We could not read your pillow selection. Please return to Juujo and try again.");
    return;
  }

  const quantities = {};
  let totalQuantity = 0;
  for (const item of parsedItems) {
    const variantId = String(item?.variant_id || "");
    const quantity = Number(item?.quantity || 0);
    if (
      !allowedVariants.has(variantId) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 4
    ) {
      fail("This pillow selection is not available. Please return to Juujo and choose it again.");
      return;
    }
    quantities[variantId] = (quantities[variantId] || 0) + quantity;
    totalQuantity += quantity;
  }

  if (!Object.keys(quantities).length || ![1, 2, 4].includes(totalQuantity)) {
    fail("No pillows were selected. Please return to Juujo and choose your bundle.");
    return;
  }

  try {
    window.sessionStorage.setItem("juujo-attribution", JSON.stringify(attribution));
  } catch {
    // Checkout can continue when browser storage is unavailable.
  }

  const timeout = window.setTimeout(() => {
    fail("Checkout took longer than expected. Please try again.");
  }, 20000);

  const sleep = (milliseconds) =>
    new Promise((resolve) => window.setTimeout(resolve, milliseconds));

  const waitForCart = async (matches) => {
    for (let attempt = 0; attempt < 40; attempt += 1) {
      const cart = await window.sbsdk.cart.get();
      if (matches(cart)) return cart;
      await sleep(150);
    }
    throw new Error("ShopBase cart did not update in time.");
  };

  const beginCheckout = () => {
    window.sbsdk.ready(async () => {
      try {
        const existingCart = await window.sbsdk.cart.get();
        for (const item of existingCart.items || []) {
          await window.sbsdk.cart.remove(item.variant_id);
        }
        if ((existingCart.items || []).length) {
          await waitForCart((cart) => cart.total_quantity === 0);
        }

        for (const [variantId, quantity] of Object.entries(quantities)) {
          await window.sbsdk.cart.add(Number(variantId), quantity);
          await waitForCart((cart) =>
            cart.items?.some(
              (item) =>
                String(item.variant_id) === variantId && item.qty === quantity,
            ),
          );
        }

        const preparedCart = await waitForCart(
          (cart) => cart.total_quantity === totalQuantity,
        );
        window.clearTimeout(timeout);
        status.textContent = "Your pillows are ready. Opening checkout now.";
        if (typeof window.sbsdk.checkout.navigateCheckout === "function") {
          window.sbsdk.checkout.navigateCheckout();
          return;
        }

        if (!preparedCart.checkoutToken) {
          throw new Error("ShopBase did not return a checkout token.");
        }

        const checkoutUrl = new URL(
          `/checkouts/${preparedCart.checkoutToken}`,
          window.location.origin,
        );
        for (const [key, value] of Object.entries(attribution)) {
          checkoutUrl.searchParams.set(key, value);
        }
        if (discountCode) checkoutUrl.searchParams.set("discount", discountCode);
        window.location.assign(checkoutUrl);
      } catch (error) {
        console.error("Juujo checkout bridge failed", error);
        window.clearTimeout(timeout);
        fail("We could not prepare checkout. Please try again.");
      }
    });
  };

  if (window.sbsdk) {
    beginCheckout();
    return;
  }

  let attempts = 0;
  const sdkWait = window.setInterval(() => {
    attempts += 1;
    if (window.sbsdk) {
      window.clearInterval(sdkWait);
      beginCheckout();
    } else if (attempts >= 40) {
      window.clearInterval(sdkWait);
      window.clearTimeout(timeout);
      fail("Checkout could not load. Please try again.");
    }
  }, 200);
})();
