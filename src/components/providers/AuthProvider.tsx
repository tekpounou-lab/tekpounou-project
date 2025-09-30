import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import type { User, Profile, LanguageCode } from "@/types";

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: any; // Supabase session
  isAuthenticated: boolean;
  isLoading: boolean;

  // Core auth actions
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    password: string,
    displayName?: string,
    preferredLanguage?: LanguageCode
  ) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: string }>;

  // Optional future extensions
  signInWithProvider?: (provider: "google" | "github" | "facebook") => Promise<void>;
  adminOverride?: boolean; // Can be used in RouteGuard for bypass
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    user,
    profile,
    session,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    initialize,
  } = useAuthStore();

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      initialize().finally(() => setInitialized(true));
    }
  }, [initialized, initialize]);

  // Optional: Social login helper
  const signInWithProvider = async (provider: "google" | "github" | "facebook") => {
    try {
      const { error } = await (await import("@/lib/supabase")).supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (err) {
      console.error("Social login error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        signInWithProvider, // ✅ ready for social login
        adminOverride: false, // ✅ placeholder for future admin override
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
