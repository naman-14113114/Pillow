import type { Metadata } from "next";
import { CartPage } from "@/components/CartPage";

export const metadata: Metadata = {
  title: "Basket",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CartPage />;
}
