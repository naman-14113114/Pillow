import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin } from "@/lib/supabase-server";

const schema = z.object({
  orderNumber: z.string().trim().min(3).max(100),
  email: z.string().email(),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Enter the order number and checkout email." },
      { status: 400 },
    );
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return NextResponse.json(
      {
        message:
          "Live tracking activates when the Juujo order mirror is connected. No sample tracking data is shown.",
      },
      { status: 503 },
    );
  }

  const admin = createSupabaseAdmin();
  const { data, error } = await admin
    .from("orders")
    .select(
      "order_number,financial_status,fulfilment_status,tracking_number,tracking_url,created_at",
    )
    .eq("order_number", parsed.data.orderNumber)
    .ilike("customer_email", parsed.data.email.toLowerCase())
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { message: "Tracking is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        message:
          "No matching order was found. Check the order number and checkout email.",
      },
      { status: 404 },
    );
  }

  const status =
    data.fulfilment_status ||
    data.financial_status ||
    "Order received";
  return NextResponse.json({
    message: data.tracking_number
      ? `${status}. Tracking number: ${data.tracking_number}`
      : `${status}. Tracking will appear here after dispatch.`,
    order: {
      orderNumber: data.order_number,
      status,
      trackingNumber: data.tracking_number,
      trackingUrl: data.tracking_url,
      createdAt: data.created_at,
    },
  });
}
