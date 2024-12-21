import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export interface AdminAuthState {
  email: string;
  password: string;
  isSigningUp: boolean;
  isLoading: boolean;
}

export const useAdminAuth = () => {
  const [state, setState] = useState<AdminAuthState>({
    email: "",
    password: "",
    isSigningUp: false,
    isLoading: false,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Invalid Password",
        description: "Password must be at least 6 characters long.",
      });
      return false;
    }
    return true;
  };

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

    if (!validatePassword(state.password)) {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: state.email,
        password: state.password,
      });

      if (signUpError) {
        if (signUpError.message.includes('rate_limit')) {
          toast({
            variant: "destructive",
            title: "Rate Limit Exceeded",
            description: "Please wait a moment before trying again.",
          });
          return;
        }
        throw signUpError;
      }

      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create user",
        });
        return;
      }

      try {
        const { error: adminError } = await supabase
          .from("admin_users")
          .insert([{ id: user.id, email: user.email }]);

        if (adminError) {
          if (adminError.code === '23505') {
            toast({
              variant: "destructive",
              title: "Email Already Exists",
              description: "This email is already registered. Please try logging in instead.",
            });
            setState(prev => ({ ...prev, isSigningUp: false }));
            return;
          }
          
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to create admin user",
          });
          return;
        }

        toast({
          title: "Success",
          description: "Admin account created successfully. Please log in.",
        });
        setState(prev => ({ ...prev, isSigningUp: false }));
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (state.isLoading) {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email: state.email,
        password: state.password,
      });

      if (authError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: authError.message,
        });
        return;
      }

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

      if (adminError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to verify admin status",
        });
        await supabase.auth.signOut();
        return;
      }

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
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
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