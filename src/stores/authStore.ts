import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Profile, LanguageCode } from '@/types';
import { supabase, auth } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null; // ✅ add session
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
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setSession: (session: Session | null) => void; // ✅ setter
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      session: null, // ✅
      isLoading: true,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await auth.signIn(email, password);
          if (error) {
            set({ isLoading: false });
            return { error: error.message };
          }

          if (data.session) {
            set({ session: data.session }); // ✅ store session
          }

          if (data.user) {
            // Get user + profile
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

            // Update last login
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
        } catch (error) {
          set({ isLoading: false });
          return { error: 'An unexpected error occurred' };
        }
      },

      signUp: async (
        email: string,
        password: string,
        displayName?: string,
        preferredLanguage: LanguageCode = 'ht-HT'
      ) => {
        set({ isLoading: true });
        try {
          const { data, error } = await auth.signUp(email, password, {
            display_name: displayName,
            preferred_language: preferredLanguage,
          });
          if (error) {
            set({ isLoading: false });
            return { error: error.message };
          }

          if (data.session) {
            set({ session: data.session }); // ✅
          }

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

          set({ isLoading: false });
          return {};
        } catch (error) {
          set({ isLoading: false });
          return { error: 'An unexpected error occurred' };
        }
      },

      signOut: async () => {
        set({ isLoading: true });
        try {
          await auth.signOut();
          set({
            user: null,
            profile: null,
            session: null, // ✅ clear session
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          console.error('Error signing out:', error);
          set({ isLoading: false });
        }
      },

      updateProfile: async (updates: Partial<Profile>) => {
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
        } catch {
          return { error: 'An unexpected error occurred' };
        }
      },

      initialize: async () => {
        set({ isLoading: true });
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session) {
            set({ session }); // ✅ keep session
          }

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

            if (userData) {
              set({
                user: userData,
                profile: profileData,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              set({ isLoading: false });
            }
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({ isLoading: false });
        }
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProfile: (profile) => set({ profile }),
      setSession: (session) => set({ session }), // ✅
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        session: state.session, // ✅ persist session
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Listen to auth state changes
supabase.auth.onAuthStateChange(async (event, session) => {
  const { setUser, setProfile, setSession, setLoading } = useAuthStore.getState();

  if (event === 'SIGNED_IN' && session?.user) {
    setSession(session); // ✅ keep session
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

    if (userData) {
      setUser(userData);
      setProfile(profileData);
    }
  } else if (event === 'SIGNED_OUT') {
    setUser(null);
    setProfile(null);
    setSession(null); // ✅ clear
  }

  setLoading(false);
});
