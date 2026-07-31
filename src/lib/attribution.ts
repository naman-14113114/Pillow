export const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "msclkid",
  "gclid",
] as const;

export type Attribution = Partial<Record<(typeof attributionKeys)[number], string>>;

export function cleanAttribution(input?: Record<string, unknown>): Attribution {
  const output: Attribution = {};

  attributionKeys.forEach((key) => {
    const value = input?.[key];
    if (typeof value === "string" && value.trim()) {
      output[key] = value.trim().slice(0, 500);
    }
  });

  return output;
}

export function appendAttribution(url: string, attribution: Attribution) {
  const target = new URL(url);
  Object.entries(attribution).forEach(([key, value]) => {
    if (value) target.searchParams.set(key, value);
  });
  return target.toString();
}
