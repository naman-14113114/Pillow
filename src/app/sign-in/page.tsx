import type { Metadata } from "next";
import { AccountForm } from "@/components/AccountForm";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AccountForm mode="sign-in" />;
}
