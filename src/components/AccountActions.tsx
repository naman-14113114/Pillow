"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, LogOut, Save } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function AccountActions({
  userId,
  email,
  initialName,
  initialPhone,
}: {
  userId: string;
  email: string;
  initialName: string;
  initialPhone: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function updateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      email,
      full_name: String(form.get("full_name") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      updated_at: new Date().toISOString(),
    });
    setLoading(false);
    setMessage(error ? error.message : "Account details updated.");
  }

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.assign("/");
  }

  return (
    <div className="account-settings-panel">
      <form onSubmit={updateProfile}>
        <label>
          Full name
          <input
            name="full_name"
            type="text"
            defaultValue={initialName}
            autoComplete="name"
          />
        </label>
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            defaultValue={initialPhone}
            autoComplete="tel"
          />
        </label>
        <label>
          Account email
          <input type="email" value={email} readOnly />
        </label>
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? <LoaderCircle className="spin" /> : <Save />}
          Save details
        </button>
      </form>
      {message && <p className="integration-message">{message}</p>}
      <button className="secondary-button account-signout" type="button" onClick={signOut}>
        <LogOut />
        Sign out
      </button>
    </div>
  );
}
