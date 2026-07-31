import { NextResponse } from "next/server";
import { z } from "zod";
import { appendAttribution, cleanAttribution } from "@/lib/attribution";
import {
  createSupabaseAdmin,
  createSupabaseServer,
  isSupabaseConfigured,
} from "@/lib/supabase-server";

const pillowSchema = z.object({
  colour: z.enum(["white", "grey", "blue", "navy"]),
  height: z.enum(["regular", "high"]),
});

const lineSchema = z.object({
  pillows: z
    .array(pillowSchema)
    .min(1)
    .max(4)
    .refine((pillows) => [1, 2, 4].includes(pillows.length), {
      message: "Choose a one, two or four pillow bundle.",
    }),
  includeCovers: z.boolean(),
});

const requestSchema = z.object({
  line: lineSchema,
  attribution: z.record(z.string(), z.unknown()).optional(),
});

const variantEnvironmentKeys = {
  white: {
    regular: "PLUSBASE_VARIANT_WHITE_REGULAR",
    high: "PLUSBASE_VARIANT_WHITE_HIGH",
  },
  grey: {
    regular: "PLUSBASE_VARIANT_GREY_REGULAR",
    high: "PLUSBASE_VARIANT_GREY_HIGH",
  },
  blue: {
    regular: "PLUSBASE_VARIANT_BLUE_REGULAR",
    high: "PLUSBASE_VARIANT_BLUE_HIGH",
  },
  navy: {
    regular: "PLUSBASE_VARIANT_NAVY_REGULAR",
    high: "PLUSBASE_VARIANT_NAVY_HIGH",
  },
} as const;

const coverEnvironmentKeys = {
  white: "PLUSBASE_COVER_VARIANT_WHITE",
  grey: "PLUSBASE_COVER_VARIANT_GREY",
  blue: "PLUSBASE_COVER_VARIANT_BLUE",
  navy: "PLUSBASE_COVER_VARIANT_NAVY",
} as const;

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json(
      { message: "The selected pillow configuration is invalid." },
      { status: 400 },
    );
  }

  const { line } = parsed.data;
  const productId = process.env.PLUSBASE_PILLOW_PRODUCT_ID;
  const coverProductId = process.env.PLUSBASE_COVER_PRODUCT_ID;
  const checkoutBase = process.env.PLUSBASE_CHECKOUT_BASE_URL;
  const pillowItems = line.pillows.map((pillow) => ({
    ...pillow,
    productId,
    variantId:
      process.env[variantEnvironmentKeys[pillow.colour][pillow.height]],
    quantity: 1,
  }));
  const coverItems = line.includeCovers
    ? line.pillows.map((pillow) => ({
        colour: pillow.colour,
        productId: coverProductId,
        variantId: process.env[coverEnvironmentKeys[pillow.colour]],
        quantity: 1,
      }))
    : [];

  if (
    !checkoutBase ||
    !productId ||
    pillowItems.some((item) => !item.variantId) ||
    (line.includeCovers &&
      (!coverProductId || coverItems.some((item) => !item.variantId)))
  ) {
    return NextResponse.json(
      {
        message:
          "Checkout is in staging mode until the Juujo PlusBase product and variant IDs are connected.",
        missingConfiguration: true,
      },
      { status: 503 },
    );
  }

  const target = new URL(checkoutBase);
  target.searchParams.set("product_id", productId);
  target.searchParams.set("variant_id", pillowItems[0].variantId || "");
  target.searchParams.set("quantity", String(line.pillows.length));
  target.searchParams.set(
    "items",
    JSON.stringify(
      [...pillowItems, ...coverItems].map((item) => ({
        product_id: item.productId,
        variant_id: item.variantId,
        quantity: item.quantity,
      })),
    ),
  );

  if (line.includeCovers && coverProductId && coverItems[0]?.variantId) {
    target.searchParams.set("cover_product_id", coverProductId);
    target.searchParams.set("cover_variant_id", coverItems[0].variantId);
    target.searchParams.set("cover_quantity", String(line.pillows.length));
  }

  const attribution = cleanAttribution(parsed.data.attribution);
  const checkoutUrl = appendAttribution(target.toString(), attribution);

  if (isSupabaseConfigured() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = await createSupabaseServer();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const admin = createSupabaseAdmin();

      await admin.from("checkout_sessions").insert({
        customer_id: user?.id || null,
        customer_email: user?.email?.toLowerCase() || null,
        selection: line,
        attribution,
        plusbase_checkout_url: checkoutUrl,
      });
    } catch (error) {
      console.error("Checkout session mirror failed", error);
    }
  }

  return NextResponse.json({ checkoutUrl });
}
