import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import type { BlogFormData } from "@/types/blog";
import { useToast } from "@/components/ui/use-toast";
import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArticlePage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogFormData | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogFormData[]>([]);
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
      fetchRelatedArticles(data.category);
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

  const fetchRelatedArticles = async (category: string) => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("category", category)
        .neq("slug", slug as string)
        .limit(5);

      if (error) throw error;
      setRelatedArticles(data || []);
    } catch (error) {
      console.error("Error fetching related articles:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-8 bg-white rounded-lg shadow-lg overflow-hidden">
            {blog.image_url && (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-[400px] object-cover"
              />
            )}
            <div className="p-8">
              <div className="mb-6">
                <div className="flex gap-2 mb-4">
                  <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-semibold rounded-full">
                    {blog.category}
                  </span>
                  {blog.subcategory && (
                    <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-sm font-semibold rounded-full">
                      {blog.subcategory}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                <div className="flex items-center text-gray-600 mb-4 text-sm">
                  <span className="mr-4">By {blog.author}</span>
                  <span>
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Facebook className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="w-4 h-4 mr-2" />
                    Tweet
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              <div className="prose max-w-none">
                {blog.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Related Articles */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Related Articles</h2>
              <div className="space-y-4">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/article/${article.slug}`}
                    className="group block"
                  >
                    <div className="flex gap-4">
                      <img
                        src={article.image_url || "/placeholder.svg"}
                        alt={article.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {new Date(article.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad Space */}
            <div className="bg-gray-200 rounded-lg p-6 text-center">
              <span className="text-gray-600">Advertisement Space</span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}