import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { categories } from "@/types/blog";
import { CategorySection } from "./CategorySection";

export function BlogManager() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: blogs, refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      console.log('Fetching all blogs...');
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
        throw error;
      }
      
      console.log('All blogs fetched successfully:', data);
      return data || [];
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete blog post",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Blog post deleted successfully",
    });
    refetch();
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/edit/${id}`);
  };

  const togglePopular = async (id: string, currentValue: boolean) => {
    const { error } = await supabase
      .from('blogs')
      .update({ popular: !currentValue })
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update blog status",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Blog status updated successfully",
    });
    refetch();
  };

  const toggleFeatured = async (id: string, currentValue: boolean, category: string) => {
    // Check featured count for the category
    if (!currentValue) {
      const { data: featuredCount } = await supabase
        .from('blogs')
        .select('id', { count: 'exact' })
        .eq('category', category)
        .eq('featured_in_category', true);

      if (featuredCount && featuredCount.length >= 7) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Maximum of 7 featured blogs allowed for ${category} category`,
        });
        return;
      }
    }

    const { error } = await supabase
      .from('blogs')
      .update({ featured_in_category: !currentValue })
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update featured status",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Featured status updated successfully",
    });
    refetch();
  };

  if (!blogs) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.keys(categories).map((category) => {
        const categoryBlogs = blogs.filter((blog) => blog.category === category) || [];
        console.log(`Filtered blogs for ${category}:`, categoryBlogs);
        
        return (
          <CategorySection
            key={category}
            category={category}
            blogs={categoryBlogs}
            onToggleFeatured={toggleFeatured}
            onTogglePopular={togglePopular}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}