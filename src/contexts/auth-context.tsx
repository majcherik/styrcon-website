'use client';

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

// Updated UserProfile interface to match database schema
export interface UserProfile {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  company: string | null
  phone: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthReady: boolean;
  error: string | null;
  signUp: (email: string, password: string, userData?: { first_name?: string; last_name?: string }) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create supabase client outside component to avoid hook violations
const supabaseClient = createClient();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Profile fetching with retry logic
  const fetchProfile = useCallback(async (userId: string, retries = 3): Promise<UserProfile | null> => {
    for (let i = 0; i < retries; i++) {
      try {
        const { data, error } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // Profile doesn't exist yet, return null
            return null;
          }
          throw error;
        }

        return data;
      } catch (error) {
        console.error(`Profile fetch attempt ${i + 1} failed:`, error);
        if (i === retries - 1) {
          setError('Failed to load profile data');
          return null;
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    return null;
  }, []);

  // Refresh profile data
  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const profileData = await fetchProfile(user.id);
    setProfile(profileData);
  }, [user, fetchProfile]);

  // Handle auth state changes
  const handleAuthChange = useCallback(async (event: string, session: Session | null) => {
    console.log('Auth event:', event, session?.user?.id);
    
    setSession(session);
    setUser(session?.user ?? null);
    setError(null);

    if (session?.user) {
      // Fetch profile for authenticated user
      const profileData = await fetchProfile(session.user.id);
      setProfile(profileData);
    } else {
      // Clear profile for unauthenticated user
      setProfile(null);
    }

    setIsAuthReady(true);
    setIsLoading(false);
  }, [fetchProfile]);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Handle URL hash tokens (email confirmations)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        if (accessToken && refreshToken) {
          console.log('Processing auth tokens from URL');
          const { data, error } = await supabaseClient.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (!mounted) return;
          
          if (!error && data.session) {
            // Clear the hash from URL
            window.history.replaceState(null, '', window.location.pathname);
            await handleAuthChange('session_from_url', data.session);
            return;
          } else {
            console.error('Failed to set session from URL:', error);
            setError('Failed to authenticate from email link');
          }
        }
        
        // Get existing session
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('Failed to get session:', error);
          setError('Failed to retrieve session');
        }

        await handleAuthChange('initial_session', session);
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setError('Authentication initialization failed');
          setIsAuthReady(true);
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(handleAuthChange);

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [handleAuthChange]);

  const signUp = async (email: string, password: string, userData?: { first_name?: string; last_name?: string }) => {
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: userData || {}
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-hesla`,
    });
    
    return { error };
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { error } = await supabaseClient
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (!error) {
        await refreshProfile();
      }

      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    isAuthReady,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}