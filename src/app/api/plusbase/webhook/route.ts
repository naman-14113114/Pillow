import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin } from "@/lib/supabase-server";

const webhookPayloadSchema = z.record(z.string(), z.unknown());

function getString(
  payload: Record<string, unknown>,
  keys: string[],
): string | undefined {
  for (const key of keys) {
    const value = payload[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
}

function secretsMatch(supplied: string | null, expected: string) {
  if (!supplied) return false;
  const suppliedBuffer = Buffer.from(supplied);
  const expectedBuffer = Buffer.from(expected);
  return (
    suppliedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(suppliedBuffer, expectedBuffer)
  );
}

function toCents(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.round(value * 100));
  }
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/[^0-9.-]/g, ""));
    if (Number.isFinite(parsed)) return Math.max(0, Math.round(parsed * 100));
  }
  return 0;
}

export async function POST(request: Request) {
  const supplied =
    request.headers.get("x-juujo-webhook-secret") ||
    new URL(request.url).searchParams.get("secret");
  const expected = process.env.PLUSBASE_WEBHOOK_SECRET;

  if (!expected || !secretsMatch(supplied, expected)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      {
        message:
          "Webhook authentication passed, but Juujo Supabase is not configured.",
      },
      { status: 503 },
    );
  }

  const parsed = webhookPayloadSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const payload = parsed.data;
  const customer =
    payload.customer && typeof payload.customer === "object"
      ? (payload.customer as Record<string, unknown>)
      : {};
  const fulfilments = Array.isArray(payload.fulfillments)
    ? payload.fulfillments
    : [];
  const firstFulfilment =
    fulfilments[0] && typeof fulfilments[0] === "object"
      ? (fulfilments[0] as Record<string, unknown>)
      : {};

  const plusbaseOrderId = getString(payload, ["id", "order_id"]);
  const orderNumber = getString(payload, [
    "order_number",
    "order_no",
    "name",
  ]);
  const customerEmail = (
    getString(payload, ["customer_email", "email"]) ||
    getString(customer, ["email"])
  )?.toLowerCase();

  if (!plusbaseOrderId || !orderNumber || !customerEmail) {
    return NextResponse.json(
      {
        message:
          "Webhook payload must include an order ID, order number and customer email.",
      },
      { status: 422 },
    );
  }

  const admin = createSupabaseAdmin();
  const { data: profile } = await admin
    .from("profiles")
    .select("id")
    .ilike("email", customerEmail)
    .maybeSingle();

  const trackingNumber =
    getString(payload, ["tracking_number"]) ||
    getString(firstFulfilment, ["tracking_number"]);
  const trackingUrl =
    getString(payload, ["tracking_url"]) ||
    getString(firstFulfilment, ["tracking_url"]);
  const totalCents =
    typeof payload.total_cents === "number"
      ? Math.max(0, Math.round(payload.total_cents))
      : toCents(payload.total_price ?? payload.total);

  const { error } = await admin.from("orders").upsert(
    {
      plusbase_order_id: plusbaseOrderId,
      order_number: orderNumber,
      customer_email: customerEmail,
      customer_id: profile?.id || null,
      financial_status: getString(payload, [
        "financial_status",
        "payment_status",
      ]),
      fulfilment_status: getString(payload, [
        "fulfilment_status",
        "fulfillment_status",
      ]),
      tracking_number: trackingNumber || null,
      tracking_url: trackingUrl || null,
      currency: (
        getString(payload, ["currency", "currency_code"]) || "GBP"
      ).toUpperCase(),
      total_cents: totalCents,
      payload,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "plusbase_order_id" },
  );

  if (error) {
    console.error("PlusBase order mirror failed", error);
    return NextResponse.json(
      { message: "Order mirror failed." },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true, orderNumber });
}
