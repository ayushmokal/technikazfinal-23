import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { handleAuthError } from "@/hooks/useAuthError";

export function useAuthCheck() {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          if (error.message?.includes('refresh_token_not_found')) {
            // Clear any stale session data
            await supabase.auth.signOut();
            toast({
              variant: "destructive",
              title: "Session Expired",
              description: "Please login again to continue.",
            });
            navigate("/admin/login");
            return;
          }
          handleAuthError(error, toast);
          return;
        }

        if (!session) {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "Please login again to continue.",
          });
          navigate("/admin/login");
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Force signout on any auth error to clear stale tokens
        await supabase.auth.signOut();
        handleAuthError(error, toast);
        navigate("/admin/login");
      }
    };

    // Check auth on mount
    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_OUT' || (!session && event === 'TOKEN_REFRESHED')) {
        navigate("/admin/login");
      }
      
      // Handle token refresh errors
      if (event === 'TOKEN_REFRESHED' && !session) {
        console.error('Token refresh failed');
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Please login again to continue.",
        });
        navigate("/admin/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return { toast, navigate };
}