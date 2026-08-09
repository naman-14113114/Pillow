"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PillowColour, PillowHeight } from "@/data/store";
import { getPillowSelectionTotalCents } from "@/data/store";

export type PillowChoice = {
  colour: PillowColour;
  height: PillowHeight;
};

export type CartLine = {
  id: string;
  pillows: PillowChoice[];
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
const storageKey = "juujo-cart-v2";
const previousStorageKey = "juujo-cart-v1";

function isPillowChoice(value: unknown): value is PillowChoice {
  if (!value || typeof value !== "object") return false;
  const choice = value as Partial<PillowChoice>;
  return (
    ["white", "grey", "blue", "navy"].includes(choice.colour || "") &&
    ["regular", "high"].includes(choice.height || "")
  );
}

function normaliseStoredLine(value: unknown): CartLine | null {
  if (!value || typeof value !== "object") return null;
  const stored = value as Partial<CartLine> & {
    colour?: PillowColour;
    height?: PillowHeight;
    quantity?: number;
  };

  if (
    Array.isArray(stored.pillows) &&
    [1, 2, 4].includes(stored.pillows.length) &&
    stored.pillows.every(isPillowChoice)
  ) {
    return {
      id: stored.id || crypto.randomUUID(),
      pillows: stored.pillows,
      includeCovers: Boolean(stored.includeCovers),
    };
  }

  if (
    stored.colour &&
    stored.height &&
    isPillowChoice({ colour: stored.colour, height: stored.height }) &&
    [1, 2, 4].includes(stored.quantity || 0)
  ) {
    return {
      id: stored.id || crypto.randomUUID(),
      pillows: Array.from({ length: stored.quantity || 1 }, () => ({
        colour: stored.colour as PillowColour,
        height: stored.height as PillowHeight,
      })),
      includeCovers: Boolean(stored.includeCovers),
    };
  }

  return null;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [line, setLine] = useState<CartLine | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored =
          window.localStorage.getItem(storageKey) ||
          window.localStorage.getItem(previousStorageKey);
        if (stored) setLine(normaliseStoredLine(JSON.parse(stored)));
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
    const quantity = line?.pillows.length ?? 0;
    return {
      line,
      isOpen,
      isHydrated,
      itemCount: quantity,
      totalCents:
        line == null
          ? 0
          : getPillowSelectionTotalCents(line.pillows, line.includeCovers),
      addLine(next) {
        setLine({
          ...next,
          pillows: next.pillows.map((pillow) => ({ ...pillow })),
          id: crypto.randomUUID(),
        });
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
