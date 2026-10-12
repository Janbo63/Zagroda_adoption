/**
 * Content model for AEO landing pages (/cs/vylet, /romantic-getaway, /family-farm-stay).
 *
 * FACT RULE: every claim must be traceable to site copy (messages/*.json) or owner
 * confirmation (Jan, 2026-10-12): card / cash PLN / cash CZK / BLIK at the farm, prices on
 * request for day visits, PL+EN service, covered barn, mini goats, shared lounge fireplace,
 * double beds in Garden & Jungle rooms, parking. Drive times: OSRM, rounded up.
 *
 * Tokens like {gardenPrice} are resolved at render time from messages/<locale>.json so
 * prices and activity names never drift from the room cards.
 */

export type Capsule = { q: string; a: string };

export type LandingContent = {
    meta: { title: string; description: string };
    badge: string;
    h1: string;
    intro: string;
    image: { src: string; alt: string };
    highlights: { title: string; text: string }[];
    capsulesTitle: string;
    capsules: Capsule[];
    table?: { title: string; note: string; headers: [string, string, string]; rows: [string, string, string][] };
    comparison?: { title: string; intro: string; headers: [string, string, string]; rows: [string, string, string][] };
    cta: { title: string; text: string; primary: { label: string; href: string }; whatsappLabel: string };
    relatedTitle: string;
    related: { label: string; href: string }[];
    breadcrumb: string;
};

export type Tokens = Record<string, string>;

export function resolveTokens(text: string, tokens: Tokens): string {
    return text.replace(/\{(\w+)\}/g, (m, k) => (k in tokens ? tokens[k] : m));
}

/** Deep-resolve tokens in every string of a content object. */
export function withTokens<T>(value: T, tokens: Tokens): T {
    if (typeof value === 'string') return resolveTokens(value, tokens) as unknown as T;
    if (Array.isArray(value)) return value.map((v) => withTokens(v, tokens)) as unknown as T;
    if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withTokens(v, tokens)])) as T;
    }
    return value;
}

export const PHONE_DISPLAY = '+48 695 545 330';
export const WHATSAPP_URL = 'https://wa.me/48695545330';
