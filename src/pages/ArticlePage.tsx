import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BlogSidebar } from "@/components/BlogSidebar";
import type { BlogFormData } from "@/types/blog";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

export default function ArticlePage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogFormData | null>(null);
  const [nextArticle, setNextArticle] = useState<BlogFormData | null>(null);
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
      
      // Fetch next article from same category
      const { data: nextArticleData } = await supabase
        .from("blogs")
        .select("*")
        .eq("category", data.category)
        .gt("created_at", data.created_at)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      setNextArticle(nextArticleData);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div>Loading...</div>
        </main>
        <Footer />
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
          <article className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                </div>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </div>

            {/* Next Article Section */}
            {nextArticle && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Link to={`/article/${nextArticle.slug}`} className="block group">
                  <div className="p-6">
                    <div className="flex items-center text-primary mb-2">
                      <span className="text-sm font-semibold">Next Article</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                    <div className="grid md:grid-cols-4 gap-4">
                      {nextArticle.image_url && (
                        <img
                          src={nextArticle.image_url}
                          alt={nextArticle.title}
                          className="w-full h-32 object-cover rounded-lg md:col-span-1"
                        />
                      )}
                      <div className="md:col-span-3">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {nextArticle.title}
                        </h3>
                        <div className="flex gap-2">
                          <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-semibold rounded-full">
                            {nextArticle.category}
                          </span>
                          {nextArticle.subcategory && (
                            <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-sm font-semibold rounded-full">
                              {nextArticle.subcategory}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <BlogSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}