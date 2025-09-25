// src/lib/stripe.ts
import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

/**
 * Returns a cached instance of Stripe.js
 * Uses only the publishable key (safe for frontend)
 */
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");
  }
  return stripePromise;
};

export default getStripe;

/**
 * Stripe frontend configuration
 */
export const STRIPE_CONFIG = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",

  // Payment method types to accept
  paymentMethodTypes: ["card", "bancontact", "ideal"] as const,

  // Supported currencies
  supportedCurrencies: ["USD", "EUR", "HTG"] as const,

  // Default currency
  defaultCurrency: "USD" as const,
};

/**
 * Format price for display
 */
export const formatPrice = (
  amount: number,
  currency: string = STRIPE_CONFIG.defaultCurrency
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
};

/**
 * Convert amount to Stripe's expected smallest currency unit
 * (e.g., USD → cents, EUR → cents, HTG → centimes)
 */
export const convertToStripeAmount = (amount: number, currency: string) => {
  const zeroDecimalCurrencies = [
    "BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA",
    "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF",
  ];

  if (zeroDecimalCurrencies.includes(currency.toUpperCase())) {
    return Math.round(amount);
  }

  return Math.round(amount * 100);
};

/**
 * Convert amount back from Stripe’s smallest currency unit
 */
export const convertFromStripeAmount = (amount: number, currency: string) => {
  const zeroDecimalCurrencies = [
    "BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA",
    "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF",
  ];

  if (zeroDecimalCurrencies.includes(currency.toUpperCase())) {
    return amount;
  }

  return amount / 100;
};

/**
 * Validate that a payment amount meets Stripe’s minimum requirements
 */
export const validatePaymentAmount = (amount: number, currency: string) => {
  const minAmounts: Record<string, number> = {
    USD: 0.5,
    EUR: 0.5,
    HTG: 25.0, // ~ $0.50 USD
  };

  const minAmount = minAmounts[currency.toUpperCase()] || 0.5;
  return amount >= minAmount;
};

/**
 * Create PaymentIntent options
 * (used when calling your backend function to create a PaymentIntent)
 */
export const createPaymentIntentOptions = (
  amount: number,
  currency: string,
  metadata: Record<string, string> = {}
) => {
  return {
    amount: convertToStripeAmount(amount, currency),
    currency: currency.toLowerCase(),
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  };
};
