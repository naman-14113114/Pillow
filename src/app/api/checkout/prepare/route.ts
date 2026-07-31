import { NextResponse } from "next/server";
import { z } from "zod";
import { appendAttribution, cleanAttribution } from "@/lib/attribution";
import {
  createSupabaseAdmin,
  createSupabaseServer,
  isSupabaseConfigured,
} from "@/lib/supabase-server";

const lineSchema = z.object({
  colour: z.enum(["white", "grey", "blue", "navy"]),
  height: z.enum(["regular", "high"]),
  quantity: z.union([z.literal(1), z.literal(2), z.literal(4)]),
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
  const pillowVariant =
    process.env[variantEnvironmentKeys[line.colour][line.height]];
  const coverVariant = process.env[coverEnvironmentKeys[line.colour]];
  const productId = process.env.PLUSBASE_PILLOW_PRODUCT_ID;
  const coverProductId = process.env.PLUSBASE_COVER_PRODUCT_ID;
  const checkoutBase = process.env.PLUSBASE_CHECKOUT_BASE_URL;

  if (
    !checkoutBase ||
    !productId ||
    !pillowVariant ||
    (line.includeCovers && (!coverProductId || !coverVariant))
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
  target.searchParams.set("variant_id", pillowVariant);
  target.searchParams.set("quantity", String(line.quantity));
  target.searchParams.set("colour", line.colour);
  target.searchParams.set("height", line.height);

  if (line.includeCovers && coverProductId && coverVariant) {
    target.searchParams.set("cover_product_id", coverProductId);
    target.searchParams.set("cover_variant_id", coverVariant);
    target.searchParams.set("cover_quantity", String(line.quantity));
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
