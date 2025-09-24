import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/Toaster";

// Providers
import { SupabaseProvider, useSupabaseClient } from "./components/providers/SupabaseProvider";
import { AuthProvider } from "./components/providers/AuthProvider";

// Components
import { SEOHead, defaultSEOConfigs } from "./components/common/SEOHead";
import { FloatingNewsletterPopup } from "./components/marketing/NewsletterSignup";
import { useReferralTracking } from "./components/marketing/ReferralSystem";

// Analytics
import { analytics, useAnalytics } from "./lib/analytics";

// Pages
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/courses/CourseDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/blog/BlogPostPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/services/ServiceDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import PricingPage from "./pages/pricing/PricingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import NewsletterUnsubscribePage from "./pages/NewsletterUnsubscribePage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";
import {MarketingDashboard} from "./components/admin/MarketingDashboard";
import {LandingPageBuilder} from "./components/admin/LandingPageBuilder";

// Styles
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // react-query v5 replaces cacheTime with gcTime
    },
  },
});

// Analytics initialization component
function AnalyticsInit() {
  const supabase = useSupabaseClient();
  const location = useLocation();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;
    analytics.init(supabase, gaTrackingId);
  }, [supabase]);

  useEffect(() => {
    trackPageView({
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname,
    });
  }, [location, trackPageView]);

  return null;
}

// SEO manager
function SEOManager() {
  const location = useLocation();

  const getSEOForRoute = (pathname: string) => {
    if (pathname === "/") return defaultSEOConfigs.home;
    if (pathname.startsWith("/courses")) return defaultSEOConfigs.courses;
    if (pathname.startsWith("/blog")) return defaultSEOConfigs.blog;
    if (pathname.startsWith("/services")) return defaultSEOConfigs.services;
    if (pathname === "/about") return defaultSEOConfigs.about;
    return null;
  };

  const seoConfig = getSEOForRoute(location.pathname);
  if (!seoConfig) return null;

  return <SEOHead {...seoConfig} />;
}

function App() {
  useReferralTracking();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <SupabaseProvider>
          <AuthProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                {/* SEO + Analytics */}
                <SEOManager />
                <AnalyticsInit />

                {/* Routes */}
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/courses/:id" element={<CourseDetailPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogPostPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:id" element={<ServiceDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/pricing" element={<PricingPage />} />

                  {/* Auth Routes */}
                  <Route path="/auth/login" element={<AuthPage type="login" />} />
                  <Route path="/auth/register" element={<AuthPage type="register" />} />
                  <Route path="/auth/reset-password" element={<AuthPage type="reset" />} />

                  {/* Landing Pages */}
                  <Route path="/landing/:slug" element={<LandingPage />} />

                  {/* Newsletter */}
                  <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribePage />} />

                  {/* User Dashboard */}
                  <Route path="/dashboard/*" element={<DashboardPage />} />

                  {/* Admin Routes (nested with Outlet in AdminLayout) */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="marketing" replace />} />
                    <Route path="marketing" element={<MarketingDashboard />} />
                    <Route path="landing-pages" element={<LandingPageBuilder />} />
                    <Route path="landing-pages/new" element={<LandingPageBuilder />} />
                    <Route path="landing-pages/:id" element={<LandingPageBuilder />} />
                  </Route>

                  {/* 404 */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>

                {/* Global Components */}
                <FloatingNewsletterPopup />
                <Toaster />
              </div>
            </Router>

            {/* Dev Tools */}
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          </AuthProvider>
        </SupabaseProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
