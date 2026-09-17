// --- FIXED EXCHANGE RATES ---
// Reviewed quarterly by Jan. Last reviewed: Sep 2026
// Source: approximate market rates rounded to clean conversion numbers.
// These are NOT live rates — they are fixed business prices.

export const SUPPORTED_CURRENCIES = ['PLN', 'CZK', 'EUR', 'GBP'] as const;
export type Currency = typeof SUPPORTED_CURRENCIES[number];

export const LOCALE_CURRENCY_MAP: Record<string, Currency> = {
  pl: 'PLN',
  cs: 'CZK',
  de: 'EUR',
  en: 'GBP',
  nl: 'EUR',
};

// How many units of target currency = 1 PLN
export const PLN_TO_CURRENCY: Record<Currency, number> = {
  PLN: 1,
  CZK: 5.8,
  EUR: 0.234,
  GBP: 0.199,
};

// Stripe currency codes (lowercase)
export const STRIPE_CURRENCY: Record<Currency, string> = {
  PLN: 'pln',
  CZK: 'czk',
  EUR: 'eur',
  GBP: 'gbp',
};

// Smallest unit multiplier (Stripe requires amounts in smallest units)
export const SMALLEST_UNIT_MULTIPLIER: Record<Currency, number> = {
  PLN: 100,
  CZK: 100,
  EUR: 100,
  GBP: 100,
};

// Display formatting
export const CURRENCY_SYMBOL: Record<Currency, string> = {
  PLN: 'PLN',
  CZK: 'Kč',
  EUR: '€',
  GBP: '£',
};

export const CURRENCY_SYMBOL_POSITION: Record<Currency, 'before' | 'after'> = {
  PLN: 'after',
  CZK: 'after',
  EUR: 'before',
  GBP: 'before',
};

/**
 * Convert a PLN amount to target currency.
 * Uses FIXED rates — no live API calls.
 * Rounds to nearest whole unit (no decimals for display).
 */
export function convertFromPLN(plnAmount: number, targetCurrency: Currency): number {
  if (targetCurrency === 'PLN') return plnAmount;
  return Math.round(plnAmount * PLN_TO_CURRENCY[targetCurrency]);
}

/**
 * Convert target currency amount back to PLN (for internal records).
 */
export function convertToPLN(amount: number, fromCurrency: Currency): number {
  if (fromCurrency === 'PLN') return amount;
  return Math.round(amount / PLN_TO_CURRENCY[fromCurrency]);
}

/**
 * Convert amount to Stripe's smallest-unit integer.
 */
export function toStripeAmount(displayAmount: number, currency: Currency): number {
  return Math.round(displayAmount * SMALLEST_UNIT_MULTIPLIER[currency]);
}

/**
 * Format a price for display: "€75" or "1 856 Kč" or "320 PLN"
 */
export function formatPrice(amount: number, currency: Currency): string {
  const formatted = amount.toLocaleString('cs-CZ'); // space as thousands separator
  const symbol = CURRENCY_SYMBOL[currency];
  return CURRENCY_SYMBOL_POSITION[currency] === 'before'
    ? `${symbol}${formatted}`
    : `${formatted} ${symbol}`;
}

/**
 * Get the booking currency from locale string.
 */
export function getCurrencyForLocale(locale: string): Currency {
  return LOCALE_CURRENCY_MAP[locale] || 'PLN';
}
