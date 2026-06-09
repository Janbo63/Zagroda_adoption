/**
 * Centralised conversion tracking for Google Analytics/Ads + Meta Pixel.
 *
 * Fires events when visitors interact with contact buttons (phone, WhatsApp, Messenger).
 * Google Ads can use the 'generate_lead' event as a conversion goal.
 *
 * Setup:
 * 1. In Google Ads → Tools → Conversions → New conversion action → Website
 * 2. Choose "Use Google Analytics" and import the 'generate_lead' event
 * 3. That's it — every WhatsApp/phone/messenger click will count as a conversion
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

type ContactChannel = 'whatsapp' | 'phone' | 'messenger' | 'email';

interface TrackContactParams {
  channel: ContactChannel;
  page?: string;
  label?: string;
}

/**
 * Track a contact interaction (WhatsApp click, phone call, etc.)
 * Fires to both Google Analytics/Ads AND Meta Pixel.
 */
export function trackContactClick({ channel, page, label }: TrackContactParams) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4 / Google Ads — 'generate_lead' is a recommended event
  // that Google Ads can automatically import as a conversion
  window.gtag?.('event', 'generate_lead', {
    event_category: 'contact',
    event_label: label || channel,
    contact_channel: channel,
    page_location: page || window.location.href,
  });

  // Also fire a custom event for granular tracking
  window.gtag?.('event', 'contact_click', {
    channel,
    page: page || window.location.pathname,
  });

  // Meta Pixel — 'Lead' is a standard event Meta Ads can optimise for
  window.fbq?.('track', 'Lead', {
    content_name: channel,
    content_category: 'contact',
  });
}

/**
 * Track a booking widget interaction (checking availability, selecting dates)
 */
export function trackBookingIntent(action: string, details?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', 'begin_checkout', {
    event_category: 'booking',
    event_label: action,
    ...details,
  });

  window.fbq?.('track', 'InitiateCheckout', {
    content_name: action,
    ...details,
  });
}
