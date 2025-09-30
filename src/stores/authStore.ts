// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Profile, LanguageCode } from '@/types';
import { supabase, auth } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    password: string,
    displayName?: string,
    preferredLanguage?: LanguageCode
  ) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: string }>;
  initialize: () => Promise<void>;

  // Setters
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;

  // OAuth
  signInWithOAuth: (
    provider: 'google' | 'github',
    redirectTo?: string
  ) => Promise<{ error?: string }>;
  signInWithProvider: (
    provider: 'google' | 'github',
    redirectTo?: string
  ) => Promise<{ error?: string }>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      session: null,
      isLoading: true,
      isAuthenticated: false,

      // Sign in with email/password
      signIn: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data, error } = await auth.signIn({ email, password }); // ✅ pass object
          if (error) return { error: error.message };

          if (data.session) set({ session: data.session });

          if (data.user) {
            const { data: userData } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.user.id)
              .single();

            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            await supabase
              .from('users')
              .update({ last_login: new Date().toISOString() })
              .eq('id', data.user.id);

            set({
              user: userData,
              profile: profileData,
              isAuthenticated: true,
              isLoading: false,
            });
          }

          return {};
        } catch (err) {
          set({ isLoading: false });
          return { error: 'An unexpected error occurred' };
        }
      },

      // Sign up new user
      signUp: async (email, password, displayName, preferredLanguage = 'ht-HT') => {
        set({ isLoading: true });
        try {
          const { data, error } = await auth.signUp(
            { email, password }, // ✅ pass object
            { data: { display_name: displayName, preferred_language: preferredLanguage } }
          );
          if (error) return { error: error.message };

          if (data.user) {
            await supabase.from('users').insert({
              id: data.user.id,
              email: data.user.email!,
              role: 'student',
            });

            await supabase.from('profiles').insert({
              id: data.user.id,
              display_name: displayName || null,
              preferred_language: preferredLanguage,
              roles: ['student'],
            });
          }

          if (data.session) set({ session: data.session });
          set({ isLoading: false });
          return {};
        } catch (err) {
          set({ isLoading: false });
          return { error: 'An unexpected error occurred' };
        }
      },

      // Sign out
      signOut: async () => {
        set({ isLoading: true });
        try {
          await auth.signOut();
          set({
            user: null,
            profile: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (err) {
          console.error('Error signing out:', err);
          set({ isLoading: false });
        }
      },

      // Update profile
      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return { error: 'Not authenticated' };
        try {
          const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id);
          if (error) return { error: error.message };

          set((state) => ({
            profile: state.profile ? { ...state.profile, ...updates } : null,
          }));
          return {};
        } catch (err) {
          return { error: 'An unexpected error occurred' };
        }
      },

      // Initialize store
      initialize: async () => {
        set({ isLoading: true });
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) set({ session });

          if (session?.user) {
            const { data: userData } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            set({
              user: userData,
              profile: profileData,
              isAuthenticated: !!userData,
              isLoading: false,
            });
          } else {
            set({ isLoading: false });
          }
        } catch (err) {
          console.error('Error initializing auth:', err);
          set({ isLoading: false });
        }
      },

      // Setters
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProfile: (profile) => set({ profile }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),

      // OAuth login
      signInWithOAuth: async (provider, redirectTo) => {
        try {
          const { error } = await auth.signInWithProvider(provider, { redirectTo });
          if (error) return { error: error.message };
          return {};
        } catch (err) {
          return { error: 'An unexpected error occurred' };
        }
      },

      // Alias for LoginPage
      signInWithProvider: async (provider, redirectTo) => {
        return get().signInWithOAuth(provider, redirectTo);
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Listen to auth state changes
supabase.auth.onAuthStateChange(async (event, session) => {
  const { setUser, setProfile, setSession, setLoading } = useAuthStore.getState();

  if (event === 'SIGNED_IN' && session?.user) {
    setSession(session);

    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    setUser(userData || null);
    setProfile(profileData || null);
  } else if (event === 'SIGNED_OUT') {
    setUser(null);
    setProfile(null);
    setSession(null);
  }

  setLoading(false);
});
