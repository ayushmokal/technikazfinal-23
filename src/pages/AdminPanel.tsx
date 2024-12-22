import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BlogForm } from "@/components/admin/BlogForm";
import { BlogAnalytics } from "@/components/admin/BlogAnalytics";
import { BlogManager } from "@/components/admin/BlogManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Folders } from "lucide-react";

export default function AdminPanel() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showCategories, setShowCategories] = useState(false);

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
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowCategories(!showCategories)}
            >
              <Folders className="h-4 w-4" />
              Manage Categories
            </Button>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        
        {showCategories ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Category Management</h2>
              <Button variant="outline" onClick={() => setShowCategories(false)}>
                Back to Dashboard
              </Button>
            </div>
            <BlogManager />
          </div>
        ) : (
          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="create">Create Blog</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-4">
              <h2 className="text-xl font-semibold">Blog Analytics</h2>
              <BlogAnalytics />
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <h2 className="text-xl font-semibold">Create New Blog Post</h2>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <BlogForm />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}