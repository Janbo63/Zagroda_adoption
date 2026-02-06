// Utility functions for voucher system

/**
 * Generates a unique voucher code
 * Format: ALPACA-XXXXX (where X is alphanumeric)
 */
export function generateVoucherCode(): string {
    const prefix = 'ALPACA';
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No confusing chars (0, O, I, 1)
    const length = 6;

    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `${prefix}-${code}`;
}

/**
 * Calculates expiration date (12 months from now)
 */
export function calculateExpirationDate(): Date {
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    return expiresAt;
}

/**
 * Currency conversion rates (fixed)
 */
export const CURRENCY_RATES = {
    EUR_TO_PLN: 4.0, // 1 EUR = 4 PLN (approximate)
    PLN_TO_EUR: 0.25,
} as const;

/**
 * Preset voucher amounts in cents
 */
export const VOUCHER_AMOUNTS = {
    EUR: [2000, 5000, 10000], // 20, 50, 100 EUR
    PLN: [10000, 20000, 50000], // 100, 200, 500 PLN
} as const;

/**
 * Converts amount between currencies
 */
export function convertCurrency(
    amount: number,
    fromCurrency: 'EUR' | 'PLN',
    toCurrency: 'EUR' | 'PLN'
): number {
    if (fromCurrency === toCurrency) return amount;

    if (fromCurrency === 'EUR' && toCurrency === 'PLN') {
        return Math.round(amount * CURRENCY_RATES.EUR_TO_PLN);
    }

    if (fromCurrency === 'PLN' && toCurrency === 'EUR') {
        return Math.round(amount * CURRENCY_RATES.PLN_TO_EUR);
    }

    return amount;
}

/**
 * Formats currency amount for display
 */
export function formatVoucherAmount(amountInCents: number, currency: 'EUR' | 'PLN'): string {
    const amount = amountInCents / 100;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}
