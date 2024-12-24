import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoryHero } from "@/components/CategoryHero";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ArticleTabs } from "@/components/ArticleTabs";
import { BlogSidebar } from "@/components/BlogSidebar";
import { categories } from "@/types/blog";
import type { Subcategory } from "@/types/blog";

export default function EntertainmentPage() {
  const [subcategory, setSubcategory] = useState<Subcategory | "ALL">("ALL");
  const [activeTab, setActiveTab] = useState("popular");

  // Query for category-specific featured articles
  const { data: featuredArticles = [] } = useQuery({
    queryKey: ['entertainment-featured-articles'],
    queryFn: async () => {
      console.log('Fetching featured entertainment articles');
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'ENTERTAINMENT')
        .eq('featured_in_category', true)
        .order('created_at', { ascending: false })
        .limit(7);
      
      if (error) {
        console.error('Error fetching featured entertainment articles:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Regular articles query with subcategory filter
  const { data: articles = [] } = useQuery({
    queryKey: ['entertainment-articles', subcategory],
    queryFn: async () => {
      console.log('Fetching entertainment articles with subcategory:', subcategory);
      let query = supabase
        .from('blogs')
        .select('*')
        .eq('category', 'ENTERTAINMENT')
        .order('created_at', { ascending: false });
      
      // Only apply subcategory filter if not "ALL"
      if (subcategory !== "ALL") {
        query = query.eq('subcategory', subcategory);
      }
      
      const { data, error } = await query.limit(4);
      
      if (error) {
        console.error('Error fetching entertainment articles:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  const mainFeaturedArticle = featuredArticles[0];
  const gridFeaturedArticles = featuredArticles.slice(1, 3);
  const popularArticles = articles.filter(article => article.popular)?.slice(0, 6) || [];
  const recentArticles = articles.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Entertainment</h1>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={subcategory === "ALL" ? "default" : "outline"}
            onClick={() => setSubcategory("ALL")}
            className="min-w-[100px]"
          >
            All
          </Button>
          {categories.ENTERTAINMENT.map((sub) => (
            <Button
              key={sub}
              variant={subcategory === sub ? "default" : "outline"}
              onClick={() => setSubcategory(sub)}
              className="min-w-[100px]"
            >
              {sub}
            </Button>
          ))}
        </div>

        {subcategory === "ALL" && mainFeaturedArticle && (
          <CategoryHero 
            featuredArticle={mainFeaturedArticle} 
            gridArticles={gridFeaturedArticles} 
          />
        )}

        <ArticleGrid articles={articles.slice(0, 4)} />

        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center my-8">
          <span className="text-gray-500">Advertisement</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <ArticleTabs
              popularArticles={popularArticles}
              recentArticles={recentArticles}
              onTabChange={setActiveTab}
              category="ENTERTAINMENT"
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