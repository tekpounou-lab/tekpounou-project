import { useEffect } from "react";
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
import {
  SupabaseProvider,
  useSupabaseClient,
} from "./components/providers/SupabaseProvider";
import { AuthProvider } from "./components/providers/AuthProvider";

// Components
import {
  SEOHead,
  defaultSEOConfigs,
} from "./components/common/SEOHead";
import { FloatingNewsletterPopup } from "./components/marketing/NewsletterSignup";
import { useReferralTracking } from "./components/marketing/ReferralSystem";

// Analytics
import { analytics, useAnalytics } from "./lib/analytics";

// Routes
import { ROUTES } from "./routes";

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
import { MarketingDashboard } from "./components/admin/MarketingDashboard";
import { LandingPageBuilder } from "./components/admin/LandingPageBuilder";

// Styles
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

// Analytics initialization component
function AnalyticsInit() {
  const supabase = useSupabaseClient();
  const location = useLocation();
  const { trackPageView } = useAnalytics();

  // Initialize GA + Supabase
  useEffect(() => {
    const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;
    analytics.init(supabase, gaTrackingId);
  }, [supabase]);

  // Track page view on route change
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
    if (pathname === ROUTES.home) return defaultSEOConfigs.home;
    if (pathname.startsWith(ROUTES.courses))
      return defaultSEOConfigs.courses;
    if (pathname.startsWith(ROUTES.blog)) return defaultSEOConfigs.blog;
    if (pathname.startsWith(ROUTES.services))
      return defaultSEOConfigs.services;
    if (pathname === ROUTES.about) return defaultSEOConfigs.about;
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
                  <Route path={ROUTES.home} element={<HomePage />} />
                  <Route path={ROUTES.courses} element={<CoursesPage />} />
                  <Route
                    path={ROUTES.courseDetail()}
                    element={<CourseDetailPage />}
                  />
                  <Route path={ROUTES.blog} element={<BlogPage />} />
                  <Route
                    path={ROUTES.blogPost()}
                    element={<BlogPostPage />}
                  />
                  <Route path={ROUTES.services} element={<ServicesPage />} />
                  <Route
                    path={ROUTES.serviceDetail()}
                    element={<ServiceDetailPage />}
                  />
                  <Route path={ROUTES.about} element={<AboutPage />} />
                  <Route path={ROUTES.contact} element={<ContactPage />} />
                  <Route path={ROUTES.pricing} element={<PricingPage />} />

                  {/* Auth Routes (all nested in AuthPage) */}
                  <Route path="/auth/*" element={<AuthPage />} />

                  {/* Landing Pages */}
                  <Route
                    path={ROUTES.landingPage()}
                    element={<LandingPage />}
                  />

                  {/* Newsletter */}
                  <Route
                    path={ROUTES.newsletterUnsubscribe}
                    element={<NewsletterUnsubscribePage />}
                  />

                  {/* User Dashboard */}
                  <Route
                    path={ROUTES.dashboard}
                    element={<DashboardPage />}
                  />

                  {/* Admin Routes */}
                  <Route
                    path={ROUTES.admin.root}
                    element={<AdminLayout />}
                  >
                    <Route
                      index
                      element={
                        <Navigate
                          to={ROUTES.admin.marketing}
                          replace
                        />
                      }
                    />
                    <Route
                      path={ROUTES.admin.marketing}
                      element={<MarketingDashboard />}
                    />
                    <Route
                      path={ROUTES.admin.landingPages}
                      element={<LandingPageBuilder />}
                    />
                    <Route
                      path={ROUTES.admin.landingPageNew}
                      element={<LandingPageBuilder />}
                    />
                    <Route
                      path={ROUTES.admin.landingPageDetail()}
                      element={<LandingPageBuilder />}
                    />
                  </Route>

                  {/* 404 */}
                  <Route
                    path={ROUTES.notFound}
                    element={<NotFoundPage />}
                  />
                </Routes>

                {/* Global Components */}
                <FloatingNewsletterPopup />
                <Toaster />
              </div>
            </Router>

            {/* Dev Tools */}
            {import.meta.env.DEV && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </AuthProvider>
        </SupabaseProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
