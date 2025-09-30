// lib/config.ts

// Environment variables
export const env = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL as string,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  APP_NAME: import.meta.env.VITE_APP_NAME || "Tek Pou Nou",
  DEFAULT_LANGUAGE: import.meta.env.VITE_DEFAULT_LANGUAGE || "ht-HT",
  SUPER_ADMIN_EMAIL:
    import.meta.env.VITE_SUPER_ADMIN_EMAIL || "admin@tekpounou.com",
} as const;

// Validate required environment variables
export const validateEnv = () => {
  const required = ["SUPABASE_URL", "SUPABASE_ANON_KEY"] as const;
  const missing = required.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
};

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    PROFILE: "/api/auth/profile",
  },
  // Admin APIs
  ADMIN: {
    USERS: "/api/admin/users",
    COURSES: "/api/admin/courses",
    BLOG: "/api/admin/blog",
    SERVICES: "/api/admin/services",
    ANALYTICS: "/api/admin/analytics",
  },
  // Public APIs
  COURSES: "/api/courses",
  BLOG: "/api/blog",
  SERVICES: "/api/services",
  PRICING: "/api/pricing", // future: fetch plans from backend
} as const;

// ---------------------------
// Pricing plans (static config)
// ---------------------------

export type PricingPlan = {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year" | "lifetime";
  description: string;
  mostPopular?: boolean;
  features: string[];
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 0,
    interval: "month",
    description: "Great for getting started with Tek Pou Nou.",
    features: [
      "Access to free community resources",
      "Basic discussion board",
      "Limited course previews",
    ],
  },
  {
    id: "pro-student",
    name: "Pro Student",
    price: 9,
    interval: "month",
    description: "For students who want full access to learning content.",
    features: [
      "Unlimited course access",
      "Downloadable certificates",
      "Participation in community groups",
      "Email support",
    ],
  },
  {
    id: "pro-teacher",
    name: "Pro Teacher",
    price: 19,
    interval: "month",
    description: "For teachers who want to earn and engage with students.",
    mostPopular: true,
    features: [
      "Everything in Pro Student",
      "Create and sell courses",
      "Track student progress",
      "Payment dashboard",
      "Priority support",
    ],
  },
] as const;
