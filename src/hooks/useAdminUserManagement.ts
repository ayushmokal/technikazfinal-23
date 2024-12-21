import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
type Toast = ReturnType<typeof useToast>["toast"];

export const handleAdminUserCreation = async (
  user: User,
  setState: React.Dispatch<React.SetStateAction<any>>,
  toast: Toast
) => {
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
      
      throw adminError;
    }

    toast({
      title: "Success",
      description: "Admin account created successfully. Please check your email to confirm your account before logging in.",
    });
    setState(prev => ({ ...prev, isSigningUp: false }));
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message,
    });
  }
};