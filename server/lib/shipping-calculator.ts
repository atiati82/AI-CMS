/**
 * Shipping Calculator for Andara Ionic CMS
 * 
 * Calculates shipping costs based on destination country.
 * Origin: Germany
 * Shipping: Worldwide via DHL/Deutsche Post
 */

// EU Member Countries (no customs)
const EU_COUNTRIES = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
    'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL',
    'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
];

// Other European Countries (customs may apply)
const EUROPE_NON_EU = [
    'GB', 'CH', 'NO', 'UA', 'RS', 'ME', 'MK', 'AL', 'BA', 'MD',
    'BY', 'RU', 'IS', 'LI', 'AD', 'MC', 'SM', 'VA'
];

export type ShippingRegion = 'germany' | 'eu' | 'europe' | 'worldwide';

export interface ShippingRate {
    region: ShippingRegion;
    baseRate: number;   // in cents (EUR)
    perKg?: number;     // additional per kg (in cents)
    freeThreshold: number; // free shipping over this amount (in cents)
    estimatedDays: { min: number; max: number };
}

// Shipping rates in EUR cents
const SHIPPING_RATES: Record<ShippingRegion, ShippingRate> = {
    germany: {
        region: 'germany',
        baseRate: 590,        // €5.90
        freeThreshold: 7500,  // Free over €75
        estimatedDays: { min: 1, max: 3 }
    },
    eu: {
        region: 'eu',
        baseRate: 990,        // €9.90
        freeThreshold: 10000, // Free over €100
        estimatedDays: { min: 3, max: 7 }
    },
    europe: {
        region: 'europe',
        baseRate: 1490,       // €14.90
        freeThreshold: 15000, // Free over €150
        estimatedDays: { min: 5, max: 10 }
    },
    worldwide: {
        region: 'worldwide',
        baseRate: 2490,       // €24.90
        freeThreshold: 20000, // Free over €200
        estimatedDays: { min: 7, max: 21 }
    }
};

// COD (Cash on Delivery) fee - only available for Germany
const COD_FEE = 490; // €4.90
const COD_AVAILABLE_REGIONS: ShippingRegion[] = ['germany'];

/**
 * Get shipping region from country code
 */
export function getShippingRegion(countryCode: string): ShippingRegion {
    const code = countryCode.toUpperCase();

    if (code === 'DE') return 'germany';
    if (EU_COUNTRIES.includes(code)) return 'eu';
    if (EUROPE_NON_EU.includes(code)) return 'europe';
    return 'worldwide';
}

/**
 * Get shipping rate for a region
 */
export function getShippingRate(region: ShippingRegion): ShippingRate {
    return SHIPPING_RATES[region];
}

/**
 * Calculate shipping cost
 */
export function calculateShipping(
    countryCode: string,
    subtotalCents: number
): {
    region: ShippingRegion;
    shippingCost: number;
    isFreeShipping: boolean;
    estimatedDays: { min: number; max: number };
} {
    const region = getShippingRegion(countryCode);
    const rate = SHIPPING_RATES[region];

    const isFreeShipping = subtotalCents >= rate.freeThreshold;
    const shippingCost = isFreeShipping ? 0 : rate.baseRate;

    return {
        region,
        shippingCost,
        isFreeShipping,
        estimatedDays: rate.estimatedDays
    };
}

/**
 * Check if COD is available for region
 */
export function isCodAvailable(region: ShippingRegion): boolean {
    return COD_AVAILABLE_REGIONS.includes(region);
}

/**
 * Get COD fee (only if COD is selected and available)
 */
export function getCodFee(region: ShippingRegion, paymentMethod: string): number {
    if (paymentMethod !== 'cod') return 0;
    if (!isCodAvailable(region)) return 0;
    return COD_FEE;
}

/**
 * Calculate complete order totals
 */
export function calculateOrderTotals(
    itemsCents: number,
    countryCode: string,
    paymentMethod: 'stripe' | 'cod' | 'bank_transfer' = 'cod'
): {
    subtotal: number;
    shipping: number;
    codFee: number;
    tax: number;
    total: number;
    region: ShippingRegion;
    isFreeShipping: boolean;
    estimatedDays: { min: number; max: number };
} {
    const shippingResult = calculateShipping(countryCode, itemsCents);
    const codFee = getCodFee(shippingResult.region, paymentMethod);

    // Note: Tax handling - EU B2C sales include VAT in product price
    // This is simplified; real implementation may need VAT calculation
    const tax = 0; // VAT included in price for EU

    const total = itemsCents + shippingResult.shippingCost + codFee + tax;

    return {
        subtotal: itemsCents,
        shipping: shippingResult.shippingCost,
        codFee,
        tax,
        total,
        region: shippingResult.region,
        isFreeShipping: shippingResult.isFreeShipping,
        estimatedDays: shippingResult.estimatedDays
    };
}

/**
 * Get all available payment methods for a region
 */
export function getAvailablePaymentMethods(region: ShippingRegion): ('stripe' | 'cod' | 'bank_transfer')[] {
    const methods: ('stripe' | 'cod' | 'bank_transfer')[] = ['stripe', 'bank_transfer'];

    if (isCodAvailable(region)) {
        methods.push('cod');
    }

    return methods;
}

/**
 * Get country name from code (for display)
 */
export function getCountryName(countryCode: string): string {
    const countries: Record<string, string> = {
        'DE': 'Germany',
        'AT': 'Austria',
        'CH': 'Switzerland',
        'FR': 'France',
        'IT': 'Italy',
        'ES': 'Spain',
        'NL': 'Netherlands',
        'BE': 'Belgium',
        'GB': 'United Kingdom',
        'US': 'United States',
        'CA': 'Canada',
        'AU': 'Australia',
        'JP': 'Japan',
        // Add more as needed
    };

    return countries[countryCode.toUpperCase()] || countryCode;
}

export default {
    calculateShipping,
    calculateOrderTotals,
    getShippingRegion,
    getShippingRate,
    isCodAvailable,
    getCodFee,
    getAvailablePaymentMethods,
    getCountryName,
    EU_COUNTRIES,
    EUROPE_NON_EU,
    SHIPPING_RATES,
    COD_FEE
};
