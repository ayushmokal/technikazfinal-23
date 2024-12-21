import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { handleAuthError } from "./useAuthError";

interface AdminAuthState {
  email: string;
  password: string;
  isLoading: boolean;
}

export const useAdminAuth = () => {
  const [state, setState] = useState<AdminAuthState>({
    email: "",
    password: "",
    isLoading: false,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (state.isLoading) return;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: state.email,
        password: state.password,
      });

      if (error) throw error;

      if (!data.user) {
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
        .eq("id", data.user.id)
        .single();

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
    handleLogin,
  };
};