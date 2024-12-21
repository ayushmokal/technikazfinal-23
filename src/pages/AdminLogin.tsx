import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: signUpError.message,
      });
      return;
    }

    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create user",
      });
      return;
    }

    // Add user to admin_users table
    const { error: adminError } = await supabase
      .from("admin_users")
      .insert([{ id: user.id, email: user.email }]);

    if (adminError) {
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
    setIsSigningUp(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
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

    // Check if user is an admin
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin {isSigningUp ? "Sign Up" : "Login"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={isSigningUp ? handleSignUp : handleLogin}>
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            {isSigningUp ? "Sign Up" : "Sign In"}
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSigningUp(!isSigningUp)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {isSigningUp
                ? "Already have an account? Sign in"
                : "Need to create an admin account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}