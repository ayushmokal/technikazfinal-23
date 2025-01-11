import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables
const supabaseUrl = 'https://iovmjhrcmveftdokffrf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvdm1qaHJjbXZlZnRkb2tmZnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3OTIzMzMsImV4cCI6MjA1MDM2ODMzM30.CSwFapyih5AroslJ6VVNBpOU1MT4MAKTX9cuDPLPsjY';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Clean and validate URL format
const cleanUrl = supabaseUrl.trim().replace(/\/$/, ''); // Remove trailing slash
if (!cleanUrl.startsWith('https://')) {
  throw new Error('Invalid Supabase URL format');
}

export const supabase = createClient<Database>(
  cleanUrl,
  supabaseAnonKey.trim(),
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: window.localStorage,
      storageKey: 'supabase.auth.token',
    },
    global: {
      headers: {
        'x-my-custom-header': 'my-app-name',
      },
    },
  }
);

// Add better error handling for auth state changes
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('Auth state changed:', event);
  
  if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
    console.log('Session state:', session);
  }

  if (event === 'TOKEN_REFRESHED' && !session) {
    console.error('Token refresh failed');
    // Clear any stale session data
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  }
});

// Handle token refresh errors
supabase.auth.onAuthStateChange(async (event) => {
  if (event === 'TOKEN_REFRESHED') {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      console.error('Token refresh failed:', error);
      // Force a new sign in if token refresh fails
      await supabase.auth.signOut();
      window.location.href = '/admin/login';
    }
  }
});

// Add a custom error handler for auth errors
const handleAuthError = async (error: any) => {
  console.error('Auth error:', error);
  
  if (error.message?.includes('refresh_token_not_found') || 
      error.message?.includes('invalid_grant') ||
      error.message?.includes('Token expired')) {
    console.log('Invalid or expired token, signing out...');
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  }
};

// Export the error handler for use in components
export { handleAuthError };