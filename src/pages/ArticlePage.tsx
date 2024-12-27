import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BlogSidebar } from "@/components/BlogSidebar";
import type { BlogFormData } from "@/types/blog";
import { useToast } from "@/components/ui/use-toast";
import { ArticleContent } from "@/components/article/ArticleContent";
import { NextArticles } from "@/components/article/NextArticles";
import { SEO } from "@/components/SEO";

export default function ArticlePage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogFormData | null>(null);
  const [nextArticles, setNextArticles] = useState<BlogFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      console.log("Fetching blog with slug:", slug);
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

      // Increment view count
      await supabase.rpc('increment_view_count', { blog_id: data.id });
      
      console.log("Found blog:", data);
      setBlog(data);
      fetchNextArticles(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load the article. Please try again later.",
      });
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNextArticles = async (currentBlog: BlogFormData) => {
    try {
      console.log("Fetching next articles for category:", currentBlog.category);
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("category", currentBlog.category)
        .gt("created_at", currentBlog.created_at)
        .order("created_at", { ascending: true })
        .limit(2);

      if (error) throw error;
      
      console.log("Found next articles:", data);
      setNextArticles(data || []);
    } catch (error) {
      console.error("Error fetching next articles:", error);
      toast({
        variant: "destructive",
        title: "Warning",
        description: "Unable to load more articles at this time.",
      });
    }
  };

  const loadMoreArticles = async () => {
    if (!blog || !nextArticles.length) return;
    
    setIsLoadingMore(true);
    try {
      const lastArticle = nextArticles[nextArticles.length - 1];
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("category", blog.category)
        .gt("created_at", lastArticle.created_at)
        .order("created_at", { ascending: true })
        .limit(2);

      if (error) throw error;
      
      if (data) {
        setNextArticles([...nextArticles, ...data]);
      }
    } catch (error) {
      console.error("Error loading more articles:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load more articles. Please try again.",
      });
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blog) return null;

  // Extract the first paragraph for meta description
  const getMetaDescription = (content: string) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const firstParagraph = div.querySelector('p');
    return firstParagraph ? firstParagraph.textContent?.slice(0, 160) + '...' : '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${blog.title} | Technikaz`}
        description={getMetaDescription(blog.content)}
        image={blog.image_url || '/og-image.png'}
        type="article"
        keywords={`${blog.category.toLowerCase()}, ${blog.subcategory?.toLowerCase()}, tech news`}
      />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <ArticleContent blog={blog} />
            <NextArticles 
              articles={nextArticles}
              isLoadingMore={isLoadingMore}
              onLoadMore={loadMoreArticles}
            />
          </div>
          <div className="lg:col-span-4">
            <BlogSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}