"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type {
  BundleQuantity,
  PillowColour,
  PillowHeight,
} from "@/data/store";
import { getBundle } from "@/data/store";

export type CartLine = {
  id: string;
  colour: PillowColour;
  height: PillowHeight;
  quantity: BundleQuantity;
  includeCovers: boolean;
};

type CartContextValue = {
  line: CartLine | null;
  isOpen: boolean;
  isHydrated: boolean;
  itemCount: number;
  totalCents: number;
  addLine: (line: Omit<CartLine, "id">) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "juujo-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [line, setLine] = useState<CartLine | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) setLine(JSON.parse(stored) as CartLine);
      } catch {
        // Browsing can continue when local storage is unavailable.
      } finally {
        setIsHydrated(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (line) window.localStorage.setItem(storageKey, JSON.stringify(line));
      else window.localStorage.removeItem(storageKey);
    } catch {
      // Browsing can continue when local storage is unavailable.
    }
  }, [isHydrated, line]);

  const value = useMemo<CartContextValue>(() => {
    const bundle = line ? getBundle(line.quantity) : null;
    return {
      line,
      isOpen,
      isHydrated,
      itemCount: line?.quantity ?? 0,
      totalCents:
        bundle == null
          ? 0
          : bundle.priceCents +
            (line?.includeCovers ? bundle.coverPriceCents : 0),
      addLine(next) {
        setLine({ ...next, id: crypto.randomUUID() });
        setIsOpen(true);
      },
      clear() {
        setLine(null);
      },
      open() {
        setIsOpen(true);
      },
      close() {
        setIsOpen(false);
      },
    };
  }, [isHydrated, isOpen, line]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}
