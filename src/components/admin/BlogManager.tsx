import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Star, Trash2, Crown } from "lucide-react";
import { categories } from "@/types/blog";

export function BlogManager() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: blogs, refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      console.log('Fetching blogs...');
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, content, category, subcategory, author, image_url, slug, featured, popular, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
        throw error;
      }
      console.log('Blogs fetched successfully:', data);
      return data;
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
    // If trying to feature a new blog, check the count for this category
    if (!currentValue) {
      const { data: featuredCount } = await supabase
        .from('blogs')
        .select('id', { count: 'exact' })
        .eq('category', category)
        .eq('featured', true);

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
      .update({ featured: !currentValue })
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

  return (
    <div className="space-y-4">
      {Object.keys(categories).map((category) => {
        const categoryBlogs = blogs?.filter((blog) => blog.category === category) || [];
        const featuredCount = categoryBlogs.filter(blog => blog.featured).length;
        
        return (
          <div key={category} className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{category}</h3>
              <span className="text-sm text-gray-500">
                Featured blogs: {featuredCount}/7
              </span>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subcategory</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryBlogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>{blog.subcategory}</TableCell>
                      <TableCell>{blog.author}</TableCell>
                      <TableCell>
                        {new Date(blog.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFeatured(blog.id, blog.featured || false, blog.category)}
                            title={blog.featured ? "Remove from featured" : "Add to featured"}
                          >
                            <Crown className={`h-4 w-4 ${blog.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => togglePopular(blog.id, blog.popular || false)}
                            title={blog.popular ? "Remove from popular" : "Add to popular"}
                          >
                            <Star className={`h-4 w-4 ${blog.popular ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(blog.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(blog.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      })}
    </div>
  );
}