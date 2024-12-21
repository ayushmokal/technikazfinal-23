import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import type { BlogFormData } from "@/types/blog";
import { useToast } from "@/components/ui/use-toast";

export default function ArticlePage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        toast({
          variant: "destructive",
          title: "Article not found",
          description: "The article you're looking for doesn't exist.",
        });
        navigate("/");
        return;
      }

      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load the article. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!blog) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {blog.image_url && (
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-[400px] object-cover"
            />
          )}
          <div className="p-8">
            <div className="mb-4">
              <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-semibold rounded-full">
                {blog.category}
              </span>
              {blog.subcategory && (
                <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-sm font-semibold rounded-full ml-2">
                  {blog.subcategory}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center text-gray-600 mb-8">
              <span className="mr-4">By {blog.author}</span>
              <span>
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="prose max-w-none">
              {blog.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}