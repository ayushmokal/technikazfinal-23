import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BlogForm } from "@/components/admin/BlogForm";
import { BlogAnalytics } from "@/components/admin/BlogAnalytics";
import { BlogManager } from "@/components/admin/BlogManager";
import { MobileProductManager } from "@/components/admin/MobileProductManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPanel() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin/login");
      return;
    }

    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="manage">Manage Blogs</TabsTrigger>
            <TabsTrigger value="create">Create Blog</TabsTrigger>
            <TabsTrigger value="products">Mobile Products</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-semibold">Blog Analytics</h2>
            <BlogAnalytics />
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
            <BlogManager />
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <h2 className="text-xl font-semibold">Create New Blog Post</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <BlogForm />
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <h2 className="text-xl font-semibold">Manage Mobile Products</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <MobileProductManager />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}