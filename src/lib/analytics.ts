/**
 * Conversion events (Plan §13/§17: "key conversions fire correctly").
 * Events are pushed to window.dataLayer, which GA4 / Tag Manager pick up when configured.
 * With no analytics configured this is a harmless no-op.
 */
type EventName = "lead_submit" | "call_click" | "whatsapp_click" | "email_click" | "cta_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: EventName, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  } else {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...params });
  }
}
