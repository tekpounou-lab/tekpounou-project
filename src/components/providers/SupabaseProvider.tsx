// src/components/providers/SupabaseProvider.tsx
import React, { createContext, useContext } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

type SupabaseContextType = {
  client: SupabaseClient;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SupabaseContext.Provider value={{ client: supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const ctx = useContext(SupabaseContext);
  if (!ctx) throw new Error("useSupabase must be used inside SupabaseProvider");
  return ctx.client;
};

// 👇 add this line
export const useSupabaseClient = useSupabase;
