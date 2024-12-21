import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

export default function AdminPanel() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const { data: adminData } = await supabase
      .from('admin_users')
      .select()
      .eq('id', session.user.id)
      .single();

    if (!adminData) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You are not authorized to access the admin panel",
      });
      navigate("/admin/login");
      return;
    }

    setIsAdmin(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (!isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Manage Blogs</h2>
            <Button onClick={() => navigate("/admin/blogs/new")}>
              Create New Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}