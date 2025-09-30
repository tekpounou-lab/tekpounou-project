// src/components/auth/RouteGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Loading } from "@/components/ui/Loading"; // ✅ ensure this file exists
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
  redirectTo = ROUTES.login,
  requireAuth = true,
}) => {
  const { user, isLoading, isAuthenticated } = useAuthStore();

  // 🔄 Show loading while checking authentication
  if (isLoading) {
    return <Loading message="Verifying authentication..." />;
  }

  // 🔒 If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // 👤 If a specific role is required
  if (requiredRole && user) {
    // Take first role as primary role
    const primaryRole: UserRole | undefined = user.roles?.[0];

    // If primaryRole is undefined, treat as guest
    const roleToCheck: UserRole = primaryRole ?? "guest";

    const userHasRole = Array.isArray(requiredRole)
      ? requiredRole.some((role) => hasRole(roleToCheck, role))
      : hasRole(roleToCheck, requiredRole);

    if (!userHasRole) {
      // 🚦 Redirect based on primary role
      switch (roleToCheck) {
        case "guest":
          return <Navigate to={ROUTES.login} replace />;
        case "student":
          return <Navigate to={ROUTES.dashboard} replace />;
        case "teacher":
          return <Navigate to={ROUTES.courses ?? ROUTES.dashboard} replace />;
        case "admin":
          return <Navigate to={ROUTES.admin?.root ?? ROUTES.dashboard} replace />;
        default:
          return <Navigate to={ROUTES.home} replace />;
      }
    }
  }

  // ⚡ Future extension: social logins or admin override can be added here

  return <>{children}</>;
};

export default RouteGuard;
