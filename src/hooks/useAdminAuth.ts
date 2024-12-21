import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { handleAuthError } from "./useAuthError";
import { AdminAuthState } from "./useAuthTypes";
import { handleAdminUserCreation } from "./useAdminUserManagement";

export const useAdminAuth = () => {
  const [state, setState] = useState<AdminAuthState>({
    email: "",
    password: "",
    isSigningUp: false,
    isLoading: false,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (state.isLoading) {
      toast({
        variant: "destructive",
        title: "Please wait",
        description: "A request is already in progress.",
      });
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: state.email,
        password: state.password,
      });

      if (signUpError) throw signUpError;

      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create user",
        });
        return;
      }

      await handleAdminUserCreation(user, setState, toast);
      
    } catch (error: any) {
      handleAuthError(error, toast);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (state.isLoading) return;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email: state.email,
        password: state.password,
      });

      if (authError) throw authError;

      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Authentication failed",
        });
        return;
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select()
        .eq("id", user.id)
        .maybeSingle();

      if (adminError) throw adminError;

      if (!adminData) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You are not authorized to access the admin panel",
        });
        await supabase.auth.signOut();
        return;
      }

      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate("/admin");
    } catch (error: any) {
      handleAuthError(error, toast);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return {
    ...state,
    setEmail: (email: string) => setState(prev => ({ ...prev, email })),
    setPassword: (password: string) => setState(prev => ({ ...prev, password })),
    setIsSigningUp: (isSigningUp: boolean) => setState(prev => ({ ...prev, isSigningUp })),
    handleSignUp,
    handleLogin,
  };
};