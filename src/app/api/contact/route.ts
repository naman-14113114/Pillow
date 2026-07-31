import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().email(),
  orderNumber: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  if (!process.env.CONTACT_WEBHOOK_URL) {
    return NextResponse.json({
      message:
        "Your message passed validation. Delivery activates when the Juujo support webhook is connected.",
      staging: true,
    });
  }

  const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Support delivery failed. Please email support@juujo.com." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Thanks. Juujo support will reply soon." });
}
