import { NextResponse } from "next/server";
import {
  createSupabaseServer,
  isSupabaseConfigured,
} from "@/lib/supabase-server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code && isSupabaseConfigured()) {
    const supabase = await createSupabaseServer();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL("/my-profile", url.origin));
}
