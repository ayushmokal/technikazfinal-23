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

const ARTICLES_PER_PAGE = 2;

export default function ArticlePage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogFormData | null>(null);
  const [nextArticles, setNextArticles] = useState<BlogFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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
        .neq("id", currentBlog.id)
        .order("created_at", { ascending: false })
        .limit(ARTICLES_PER_PAGE);

      if (error) throw error;
      
      console.log("Found next articles:", data);
      setNextArticles(data || []);
      setHasMore(data && data.length === ARTICLES_PER_PAGE);
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
    if (!blog || !nextArticles.length || isLoadingMore) return;
    
    setIsLoadingMore(true);
    try {
      const lastArticle = nextArticles[nextArticles.length - 1];
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("category", blog.category)
        .neq("id", blog.id)
        .lt("created_at", lastArticle.created_at)
        .order("created_at", { ascending: false })
        .limit(ARTICLES_PER_PAGE);

      if (error) throw error;
      
      if (data) {
        setNextArticles(prev => [...prev, ...data]);
        setHasMore(data.length === ARTICLES_PER_PAGE);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <ArticleContent blog={blog} />
            <NextArticles 
              articles={nextArticles}
              isLoadingMore={isLoadingMore}
              onLoadMore={loadMoreArticles}
              hasMore={hasMore}
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