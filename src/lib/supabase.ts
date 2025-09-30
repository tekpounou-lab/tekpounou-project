import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env, validateEnv } from './config';

// Validate environment variables
validateEnv();

// Create Supabase client
export const supabase: SupabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database table types for TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'super_admin' | 'admin' | 'teacher' | 'student' | 'guest';
          created_at: string;
          updated_at: string;
          last_login: string | null;
          is_active: boolean;
        };
        Insert: {
          id: string;
          email: string;
          role?: 'super_admin' | 'admin' | 'teacher' | 'student' | 'guest';
          is_active?: boolean;
        };
        Update: {
          email?: string;
          role?: 'super_admin' | 'admin' | 'teacher' | 'student' | 'guest';
          last_login?: string | null;
          is_active?: boolean;
        };
      };
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          roles: ('super_admin' | 'admin' | 'teacher' | 'student' | 'guest')[];
          preferred_language: 'ht-HT' | 'en-US' | 'fr-FR';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          roles?: ('super_admin' | 'admin' | 'teacher' | 'student' | 'guest')[];
          preferred_language?: 'ht-HT' | 'en-US' | 'fr-FR';
        };
        Update: {
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          roles?: ('super_admin' | 'admin' | 'teacher' | 'student' | 'guest')[];
          preferred_language?: 'ht-HT' | 'en-US' | 'fr-FR';
        };
      };
    };
  };
};

// --- DB Helpers ---
export const db = {
  async getUser(id: string) {
    return supabase.from('users').select('*').eq('id', id).single();
  },
  async updateUser(id: string, updates: Database['public']['Tables']['users']['Update']) {
    return supabase.from('users').update(updates).eq('id', id);
  },
  async getUserWithProfile(id: string) {
    return supabase.from('users').select('*, profiles(*)').eq('id', id).single();
  },
  async getProfile(id: string) {
    return supabase.from('profiles').select('*').eq('id', id).single();
  },
  async updateProfile(id: string, updates: Database['public']['Tables']['profiles']['Update']) {
    return supabase.from('profiles').update(updates).eq('id', id);
  },
  async createProfile(profile: Database['public']['Tables']['profiles']['Insert']) {
    return supabase.from('profiles').insert(profile);
  },
  async getPlatformStats() {
    return supabase.rpc('get_platform_stats');
  },
};

// --- Auth Helpers ---
export const auth = {
  signUp: async (email: string, password: string, metadata?: Record<string, any>) => {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
  },

  signIn: async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  },

  signOut: async () => supabase.auth.signOut(),

  getSession: async () => supabase.auth.getSession(),

  getUser: async () => supabase.auth.getUser(),

  updateUser: async (updates: { email?: string; password?: string; data?: Record<string, any> }) =>
    supabase.auth.updateUser(updates),

  resetPassword: async (email: string) => supabase.auth.resetPasswordForEmail(email),

  // OAuth Login
  signInWithProvider: async (provider: 'google' | 'github', options?: { redirectTo?: string }) => {
    return supabase.auth.signInWithOAuth({ provider, options });
  },
};

// --- Storage Helpers ---
export const storage = {
  uploadFile: async (bucket: string, path: string, file: File) => supabase.storage.from(bucket).upload(path, file),
  getPublicUrl: (bucket: string, path: string) => supabase.storage.from(bucket).getPublicUrl(path),
  deleteFile: async (bucket: string, path: string) => supabase.storage.from(bucket).remove([path]),
};

export default supabase;
