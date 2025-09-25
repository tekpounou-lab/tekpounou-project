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

  // Auth
  login: "/auth/login",
  register: "/auth/register",
  resetPassword: "/auth/reset-password",

  // User profile
  profile: "/profile",
  certificates: "/certificates",

  // Dashboard (for students, teachers, etc.)
  dashboard: "/dashboard",

  // Landing pages (dynamic slugs)
  landingPage: (slug: string = ":slug") => `/landing/${slug}`,

  // Newsletter
  newsletterUnsubscribe: "/newsletter/unsubscribe",

  // Admin area
  admin: {
    root: "/admin",
    marketing: "/admin/marketing",
    landingPages: "/admin/landing-pages",
    landingPageNew: "/admin/landing-pages/new", // ✅ renamed for clarity
    landingPageDetail: (id: string | number = ":id") =>
      `/admin/landing-pages/${id}`,
  },

  // Teacher area (optional if you separate teacher routes)
  teacher: "/teacher",

  // Catch-all (NotFound)
  notFound: "*",
};
