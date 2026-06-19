import { track } from "@vercel/analytics";

/**
 * Log a custom analytics event to Vercel Analytics.
 * @param eventName Name of the event to track (e.g. 'cta_click', 'form_submit')
 * @param properties Key-value map of properties for context
 */
export function trackEvent(eventName: string, properties?: Record<string, string | number | boolean | null>) {
  try {
    // Only track in client-side environment
    if (typeof window !== "undefined") {
      track(eventName, properties);
      
      // Also log to console in development mode
      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] Tracked Event: ${eventName}`, properties);
      }
    }
  } catch (error) {
    console.error("Failed to track event", error);
  }
}
