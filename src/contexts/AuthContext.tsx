// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { User as AppUser } from "@/types"; // use your local User type

// Define allowed roles
type UserRole = "student" | "teacher" | "guest" | "sme_client";

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const mapSupabaseUserToAppUser = (sessionUser: any): AppUser => {
    return {
      id: sessionUser.id,
      email: sessionUser.email ?? "",
      roles: (sessionUser.user_metadata?.role as UserRole) || "guest", // use role from metadata or default to 'guest'
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: true,
      name: sessionUser.user_metadata?.name ?? "",
    };
  };

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Auth session error:", error);
      } else {
        const sessionUser = data.session?.user;
        setUser(sessionUser ? mapSupabaseUserToAppUser(sessionUser) : null);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user;
      setUser(sessionUser ? mapSupabaseUserToAppUser(sessionUser) : null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
