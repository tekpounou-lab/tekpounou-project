import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { LoadingPage } from "@/components/ui/Loading";
import { UserRole } from "@/types";
import { hasRole } from "@/utils";
import { ROUTES } from "@/routes";

export interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  redirectTo?: string;
  requireAuth?: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requiredRole,
  redirectTo = ROUTES.login, // ✅ centralized login route
  requireAuth = true,
}) => {
  const { user, isLoading, isAuthenticated } = useAuthStore();

  // 🔄 Show loading while checking authentication
  if (isLoading) {
    return <LoadingPage message="Verifying authentication..." />;
  }

  // 🔒 If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // 👤 If a specific role is required
  if (requiredRole && user) {
    const userHasRole = Array.isArray(requiredRole)
      ? requiredRole.some((role) => hasRole(user.role, role))
      : hasRole(user.role, requiredRole);

    if (!userHasRole) {
      // 🚦 Redirect based on user role
      switch (user.role) {
        case "guest":
          return <Navigate to={ROUTES.login} replace />;
        case "student":
          return <Navigate to={ROUTES.dashboard} replace />;
        case "teacher":
          return <Navigate to={ROUTES.teacher} replace />;
        case "admin":
          return <Navigate to={ROUTES.admin.root} replace />; // ✅ use string, not object
        default:
          return <Navigate to={ROUTES.home} replace />;
      }
    }
  }

  return <>{children}</>;
};

export default RouteGuard;
