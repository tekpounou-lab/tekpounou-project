// src/pages/PricingPage.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { usePayments, SubscriptionPlan } from "@/hooks/usePayments";
import { useAuthStore } from "@/stores/authStore";
import { formatPrice } from "@/lib/stripe";
import { PaymentModal } from "@/components/payments/PaymentModal";
import Layout from "@/components/layout/Layout";

const PricingPage: React.FC = () => {
  const { user } = useAuthStore();
  const { getSubscriptionPlans, getUserSubscriptions } = usePayments();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [plansData, subscriptionsData] = await Promise.all([
        getSubscriptionPlans(),
        user ? getUserSubscriptions() : Promise.resolve([]),
      ]);
      setPlans(plansData);
      setUserSubscriptions(subscriptionsData);
    } catch (error) {
      console.error("Error loading pricing data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (!user) {
      window.location.href = "/login?redirect=/pricing";
      return;
    }
    if (plan.price === 0) return; // Free plan
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const isCurrentPlan = (planId: string) =>
    userSubscriptions.some((sub) => sub.plan_id === planId && sub.status === "active");

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "free":
        return <Star className="w-8 h-8 text-blue-500" />;
      case "pro teacher":
        return <Zap className="w-8 h-8 text-purple-500" />;
      case "enterprise":
        return <Crown className="w-8 h-8 text-yellow-500" />;
      default:
        return <Star className="w-8 h-8 text-gray-500" />;
    }
  };

  const getPlanColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "free":
        return "border-blue-200 hover:border-blue-300";
      case "pro teacher":
        return "border-purple-200 hover:border-purple-300 ring-2 ring-purple-100";
      case "enterprise":
        return "border-yellow-200 hover:border-yellow-300";
      default:
        return "border-gray-200 hover:border-gray-300";
    }
  };

  const filteredPlans = plans.filter(
    (plan) => plan.billing_cycle === billingCycle || plan.billing_cycle === "lifetime"
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tpn-gradient-text">
            Choose Your Plan / Chwazi Plan ou
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Unlock the full potential of Tek Pou Nou with our flexible pricing plans. Start free and upgrade as you grow.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted/20 p-1 rounded-lg flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "yearly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly{" "}
              <Badge variant="success" className="ml-2">
                Save 20%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="tpn-card animate-pulse h-80">
                <div className="invisible">loading</div>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPlans.map((plan, index) => (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Card className={`relative p-8 h-full ${getPlanColor(plan.name)}`}>
                  {plan.name.toLowerCase() === "pro teacher" && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge variant="secondary" className="px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">{getPlanIcon(plan.name)}</div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-foreground">{formatPrice(plan.price)}</span>
                      {plan.billing_cycle !== "lifetime" && (
                        <span className="text-muted-foreground ml-2">
                          /{plan.billing_cycle === "yearly" ? "year" : "month"}
                        </span>
                      )}
                    </div>
                    {plan.billing_cycle === "yearly" && plan.price > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        Save {formatPrice(plan.price * 0.2)} per year
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    {isCurrentPlan(plan.id) ? (
                      <Button variant="outline" className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleSelectPlan(plan)}
                        className="w-full"
                        variant={plan.name.toLowerCase() === "pro teacher" ? "primary" : "outline"}
                      >
                        {plan.price === 0 ? "Get Started Free" : "Choose Plan"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Can I change my plan later?</h3>
              <p className="text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, and we're working on adding local payment methods like MonCash and CAM Transfer.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Our Free plan gives you access to basic features. You can upgrade to paid plans anytime to unlock advanced features.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">How do teacher earnings work?</h3>
              <p className="text-muted-foreground">
                Teachers earn 70% of course sales. We handle payments and provide detailed earnings tracking in your dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && selectedPlan && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => {
              setShowPaymentModal(false);
              setSelectedPlan(null);
            }}
            plan={selectedPlan}
            onSuccess={() => {
              setShowPaymentModal(false);
              setSelectedPlan(null);
              loadData();
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default PricingPage;
