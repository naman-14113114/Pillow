import type { Metadata } from "next";
import { AccountForm } from "@/components/AccountForm";

export const metadata: Metadata = {
  title: "Create Account",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AccountForm mode="sign-up" />;
}
