"use client";

import { useEffect } from "react";
import { attributionKeys } from "@/lib/attribution";

export function AttributionCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const attribution: Record<string, string> = {};

    attributionKeys.forEach((key) => {
      const value = params.get(key);
      if (value) attribution[key] = value;
    });

    if (Object.keys(attribution).length > 0) {
      window.sessionStorage.setItem(
        "juujo-attribution",
        JSON.stringify(attribution),
      );
    }
  }, []);

  return null;
}
