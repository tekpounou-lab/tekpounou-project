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

  // Blog
  blog: "/blog",
  blogPost: (id: string | number = ":id") => `/blog/${id}`,

  // Services
  services: "/services",
  serviceDetail: (id: string | number = ":id") => `/services/${id}`,

  // Groups (Community)
  groups: "/groups",
  groupDetail: (id: string | number = ":id") => `/groups/${id}`,

  // Events
  events: "/events",
  eventDetail: (id: string | number = ":id") => `/events/${id}`,

  // Networking (from your project structure: src/pages/networking/)
  networking: "/networking",

  // News (from your project structure: src/pages/news/)
  news: "/news",

  // Partners (from your project structure: src/pages/partners/)
  partners: "/partners",

  // Resources (from your project structure: src/pages/resources/)
  resources: "/resources",

  // Projects (from your project structure: src/pages/projects/)
  projects: "/projects",

  // Auth
  login: "/auth/login",
  register: "/auth/register",
  resetPassword: "/auth/reset-password",

  // User profile & certificates
  profile: "/profile",
  certificates: "/certificates",

  // Dashboard (main entry — redirects to role-specific dashboards)
  dashboard: "/dashboard",

  // Role-specific dashboards (optional but aligned with your structure)
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
    marketing: "/admin/marketing",
    landingPages: "/admin/landing-pages",
    landingPageNew: "/admin/landing-pages/new",
    landingPageDetail: (id: string | number = ":id") => `/admin/landing-pages/${id}`,
    // You may add more admin sub-routes later (e.g., users, payments, etc.)
  },

  // Teacher area (if used separately from dashboard)
  teacher: "/teacher",

  // Catch-all (for NotFoundPage)
  notFound: "*",
};