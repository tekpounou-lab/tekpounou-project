import { useState } from "react";
import { createPaymentIntent, confirmPayment } from "@/lib/checkout";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type CheckoutButtonProps =
  | { type: "course"; courseId: string }
  | { type: "subscription"; planId: string };

export default function CheckoutButton(props: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();

  const handleCheckout = async () => {
    try {
      setLoading(true);

      // Get the current Supabase session token
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Not logged in");

      // 1. Create PaymentIntent on backend
      const { client_secret } =
        props.type === "course"
          ? await createPaymentIntent(
              "course",
              { course_id: props.courseId },
              session.access_token
            )
          : await createPaymentIntent(
              "subscription",
              { plan_id: props.planId },
              session.access_token
            );

      // 2. Confirm payment on frontend
      const paymentIntent = await confirmPayment(client_secret);
      console.log("Payment successful:", paymentIntent);

      alert("✅ Payment complete!");
    } catch (err: any) {
      console.error("Payment error:", err.message);
      alert(`❌ Payment failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-indigo-600 text-white px-4 py-2 rounded"
    >
      {loading
        ? "Processing..."
        : props.type === "course"
        ? "Buy Course"
        : "Subscribe"}
    </button>
  );
}
