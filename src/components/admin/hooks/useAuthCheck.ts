import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase, handleAuthError } from "@/integrations/supabase/client";

export function useAuthCheck() {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          handleAuthError(error);
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
        handleAuthError(error);
      }
    };

    // Check auth on mount
    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || (!session && event === 'TOKEN_REFRESHED')) {
        navigate("/admin/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return { toast, navigate };
}