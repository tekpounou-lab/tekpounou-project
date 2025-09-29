// src/routes/index.ts

export const ROUTES = {
  // Public pages
  home: "/",
  about: "/about",
  contact: "/contact",
  pricing: "/pricing",
  community: "/community",

  // Courses
  courses: "/courses",
  courseDetail: (id: string | number = ":id") => `/courses/${id}`,

  // Blog & News (same page, different URLs)
  blog: "/blog",
  blogPost: (id: string | number = ":id") => `/blog/${id}`,
  news: "/news", // Alias for blog — will render BlogPage

  // Services
  services: "/services",
  serviceDetail: (id: string | number = ":id") => `/services/${id}`,

  // Groups (Community)
  groups: "/groups",
  groupDetail: (id: string | number = ":id") => `/groups/${id}`,

  // Events
  events: "/events",
  eventDetail: (id: string | number = ":id") => `/events/${id}`,

  // Networking
  networking: "/networking",

  // Partners
  partners: "/partners",

  // Resources
  resources: "/resources",

  // Projects
  projects: "/projects",

  // Analytics
  analytics: "/analytics",

  // Auth
  login: "/auth/login",
  register: "/auth/register",
  resetPassword: "/auth/reset-password",

  // User profile & certificates
  profile: "/profile",
  certificates: "/certificates",

  // Dashboard (main entry — redirects to role-specific dashboards)
  dashboard: "/dashboard",

  // Role-specific dashboards
  dashboards: {
    student: "/dashboard/student",
    teacher: "/dashboard/teacher",
    client: "/dashboard/client",
    settings: "/dashboard/settings",
    notifications: "/dashboard/notifications",
  },

  // Landing pages (dynamic slugs)
  landingPage: (slug: string = ":slug") => `/landing/${slug}`,

  // Newsletter
  newsletterUnsubscribe: "/newsletter/unsubscribe",

  // Admin area
  admin: {
    root: "/admin",
    content: "/admin/content", // Added for super_admin link
    marketing: "/admin/marketing",
    landingPages: "/admin/landing-pages",
    landingPageNew: "/admin/landing-pages/new",
    landingPageDetail: (id: string | number = ":id") => `/admin/landing-pages/${id}`,
  },

  // Catch-all (404)
  notFound: "*",
} as const;

// ✅ Export individual paths for safer router registration
export const PUBLIC_ROUTES = [
  ROUTES.home,
  ROUTES.about,
  ROUTES.contact,
  ROUTES.pricing,
  ROUTES.community,
  ROUTES.courses,
  ROUTES.blog,
  ROUTES.news,
  ROUTES.services,
  ROUTES.groups,
  ROUTES.events,
  ROUTES.networking,
  ROUTES.partners,
  ROUTES.resources,
  ROUTES.projects,
  ROUTES.analytics,
  ROUTES.certificates,
] as const;

export const AUTH_ROUTES = [
  ROUTES.login,
  ROUTES.register,
  ROUTES.resetPassword,
] as const;

export const DASHBOARD_ROUTES = [
  ROUTES.dashboard,
  ROUTES.dashboards.student,
  ROUTES.dashboards.teacher,
  ROUTES.dashboards.client,
  ROUTES.dashboards.settings,
  ROUTES.dashboards.notifications,
] as const;
