"use client";

import Link from "next/link";
import { ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function AccountForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!configured) {
      setMessage(
        "Accounts are ready for activation when the new Juujo Supabase credentials are connected.",
      );
      return;
    }

    setLoading(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const supabase = createSupabaseBrowserClient();
    const result =
      mode === "sign-in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
          });

    if (result.error) {
      setMessage(result.error.message);
      setLoading(false);
      return;
    }

    if (mode === "sign-in") window.location.assign("/my-profile");
    else {
      setMessage("Check your email to confirm your Juujo account.");
      setLoading(false);
    }
  }

  const signIn = mode === "sign-in";
  return (
    <main className="account-route">
      <section className="account-visual">
        <img
          src="/assets/gallery-03-lifestyle-juujo.png"
          alt="OrthoAlign pillows in a calm bedroom"
          width="1536"
          height="1024"
        />
        <div>
          <span>YOUR JUUJO ACCOUNT</span>
          <h1>Keep orders, tracking and support in one quiet place.</h1>
        </div>
      </section>
      <section className="account-form-panel">
        <div className="account-form">
          <LockKeyhole aria-hidden="true" />
          <span className="route-kicker">{signIn ? "Welcome back" : "Join Juujo"}</span>
          <h2>{signIn ? "Sign in to your account." : "Create your account."}</h2>
          <form onSubmit={submit}>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                autoComplete={signIn ? "current-password" : "new-password"}
                minLength={8}
                required
              />
            </label>
            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="spin" /> : signIn ? "Sign in" : "Create account"}
              {!loading && <ArrowRight />}
            </button>
          </form>
          {message && <p className="integration-message">{message}</p>}
          <p>
            {signIn ? "New to Juujo?" : "Already have an account?"}{" "}
            <Link href={signIn ? "/sign-up" : "/sign-in"}>
              {signIn ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
