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

// Stores
import { useAuthStore } from "@/stores/authStore";

// Components
import { SEOHead, defaultSEOConfigs } from "./components/common/SEOHead";
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
import StudentDashboardPage from "./pages/dashboard/StudentDashboardPage";
import TeacherDashboardPage from "./pages/dashboard/TeacherDashboardPage";
import ClientDashboardPage from "./pages/dashboard/ClientDashboardPage";
import { DashboardSettingsPage } from "./pages/dashboard/DashboardSettingsPage";
import { NotificationsPage } from "./pages/dashboard/NotificationsPage";
import LandingPage from "./pages/LandingPage";
import NewsletterUnsubscribePage from "./pages/NewsletterUnsubscribePage";
import CommunityPage from "./pages/CommunityPage";
import CertificatesPage from "./pages/CertificatesPage";
import NotFoundPage from "./pages/NotFoundPage";
import GroupsPage from "./pages/GroupsPage";
import GroupDetailPage from "./pages/group/GroupDetailPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/events/EventDetailPage";
import NetworkingPage from "./pages/NetworkingPage";
import PartnersPage from "./pages/PartnersPage";
import ResourcesPage from "./pages/ResourcesPage";
import ProjectsPage from "./pages/ProjectsPage";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";
import { MarketingDashboard } from "./components/admin/MarketingDashboard";
import { LandingPageBuilder } from "./components/admin/LandingPageBuilder";

// Styles
import "./index.css";

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      
    },
  },
});

// Analytics initialization
function AnalyticsInit() {
  const location = useLocation();
  const { trackPageView } = useAnalytics();

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
    if (pathname.startsWith(ROUTES.courses)) return defaultSEOConfigs.courses;
    if (pathname.startsWith(ROUTES.blog) || pathname === ROUTES.news)
      return defaultSEOConfigs.blog;
    if (pathname.startsWith(ROUTES.services)) return defaultSEOConfigs.services;
    if (pathname === ROUTES.about) return defaultSEOConfigs.about;
    return null;
  };

  const seoConfig = getSEOForRoute(location.pathname);
  if (!seoConfig) return null;

  return <SEOHead {...seoConfig} />;
}

// Private route wrapper
function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  return children;
}

function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useReferralTracking();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
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
              <Route path={ROUTES.blogPost()} element={<BlogPostPage />} />
              <Route path={ROUTES.news} element={<BlogPage />} />
              <Route path={ROUTES.services} element={<ServicesPage />} />
              <Route
                path={ROUTES.serviceDetail()}
                element={<ServiceDetailPage />}
              />
              <Route path={ROUTES.about} element={<AboutPage />} />
              <Route path={ROUTES.contact} element={<ContactPage />} />
              <Route path={ROUTES.pricing} element={<PricingPage />} />
              <Route path={ROUTES.community} element={<CommunityPage />} />
              <Route path={ROUTES.certificates} element={<CertificatesPage />} />

              {/* Extra Public Pages */}
              <Route path={ROUTES.groups} element={<GroupsPage />} />
              <Route path={ROUTES.groupDetail()} element={<GroupDetailPage />} />
              <Route path={ROUTES.events} element={<EventsPage />} />
              <Route path={ROUTES.eventDetail()} element={<EventDetailPage />} />
              <Route path={ROUTES.networking} element={<NetworkingPage />} />
              <Route path={ROUTES.partners} element={<PartnersPage />} />
              <Route path={ROUTES.resources} element={<ResourcesPage />} />
              <Route path={ROUTES.projects} element={<ProjectsPage />} />

              {/* Auth Routes */}
              <Route path="/auth/*" element={<AuthPage />} />

              {/* Landing Pages */}
              <Route path={ROUTES.landingPage()} element={<LandingPage />} />

              {/* Newsletter */}
              <Route
                path={ROUTES.newsletterUnsubscribe}
                element={<NewsletterUnsubscribePage />}
              />

              {/* User Dashboards (Protected) */}
              <Route
                path={ROUTES.dashboard}
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.dashboards.student}
                element={
                  <PrivateRoute>
                    <StudentDashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.dashboards.teacher}
                element={
                  <PrivateRoute>
                    <TeacherDashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.dashboards.client}
                element={
                  <PrivateRoute>
                    <ClientDashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.dashboards.settings}
                element={
                  <PrivateRoute>
                    <DashboardSettingsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.dashboards.notifications}
                element={
                  <PrivateRoute>
                    <NotificationsPage />
                  </PrivateRoute>
                }
              />

              {/* Admin Routes (Protected) */}
              <Route
                path={ROUTES.admin.root}
                element={
                  <PrivateRoute>
                    <AdminLayout />
                  </PrivateRoute>
                }
              >
                <Route
                  index
                  element={<Navigate to={ROUTES.admin.marketing} replace />}
                />
                <Route path={ROUTES.admin.marketing} element={<MarketingDashboard />} />
                <Route path={ROUTES.admin.landingPages} element={<LandingPageBuilder />} />
                <Route path={ROUTES.admin.landingPageNew} element={<LandingPageBuilder />} />
                <Route
                  path={ROUTES.admin.landingPageDetail()}
                  element={<LandingPageBuilder />}
                />
              </Route>

              {/* 404 */}
              <Route path={ROUTES.notFound} element={<NotFoundPage />} />
            </Routes>

            {/* Global Components */}
            <FloatingNewsletterPopup />
            <Toaster />
          </div>
        </Router>

        {/* Dev Tools */}
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
