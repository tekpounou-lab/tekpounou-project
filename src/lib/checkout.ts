import getStripe from "./stripe";

/**
 * Create a PaymentIntent via your Netlify function
 */
export async function createPaymentIntent(
  type: "course" | "subscription",
  options: { course_id?: string; plan_id?: string },
  token: string // Supabase user JWT
) {
  const response = await fetch("/.netlify/functions/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Important for Supabase auth
    },
    body: JSON.stringify({ type, ...options }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create payment intent");
  }

  return response.json();
}

/**
 * Confirm payment on the frontend using Stripe.js
 */
export async function confirmPayment(clientSecret: string) {
  const stripe = await getStripe();
  if (!stripe) throw new Error("Stripe.js failed to load");

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: { token: "tok_visa" }, // replace with real CardElement later
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return paymentIntent;
}
