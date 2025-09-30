// src/pages/pricing/PriceDetailsPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import CheckoutButton from "@/components/ui/CheckoutButton"; // default export
import { PRICING_PLANS, PricingPlan } from "@/lib/config";

const PriceDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // route /pricing/:id
  const navigate = useNavigate();

  // Find plan by ID
  const plan: PricingPlan | undefined = PRICING_PLANS.find(
    (p) => p.id === id
  );

  if (!plan) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Plan not found</h2>
        <button
          className="mt-4 text-blue-600 underline"
          onClick={() => navigate("/pricing")}
        >
          Back to Pricing
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <Card className="p-8">
        <h1 className="text-3xl font-bold">{plan.name}</h1>
        <p className="text-gray-600 mt-2">{plan.description}</p>

        <div className="mt-4">
          <span className="text-4xl font-extrabold">${plan.price}</span>
          <span className="ml-2 text-gray-500">/ {plan.interval}</span>
        </div>

        {plan.mostPopular && (
          <Badge variant="success" className="mt-4">
            Most Popular
          </Badge>
        )}

        <ul className="mt-6 space-y-2 list-disc list-inside">
          {plan.features.map((feature: string, idx: number) => (
            <li key={idx} className="text-gray-700">
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <CheckoutButton type="subscription" planId={plan.id} />
        </div>
      </Card>
    </div>
  );
};

export default PriceDetailsPage;
