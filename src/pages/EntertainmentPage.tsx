import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ArticleTabs } from "@/components/ArticleTabs";
import { CategoryHero } from "@/components/CategoryHero";
import { EntertainmentCategories } from "@/components/entertainment/EntertainmentCategories";
import { UpcomingEntertainment } from "@/components/entertainment/UpcomingEntertainment";

export default function EntertainmentPage() {
  const [subcategory, setSubcategory] = useState<string>("ALL");
  const [activeTab, setActiveTab] = useState("popular");

  // Query for featured articles
  const { data: featuredArticles = [], isLoading: isFeaturedLoading } = useQuery({
    queryKey: ['entertainment-featured-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'ENTERTAINMENT')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(7);
      
      if (error) {
        console.error('Error fetching featured entertainment articles:', error);
        return [];
      }
      
      return data || [];
    }
  });

  // Regular articles query with subcategory filter
  const { data: articles = [], isLoading: isArticlesLoading } = useQuery({
    queryKey: ['entertainment-articles', subcategory],
    queryFn: async () => {
      let query = supabase
        .from('blogs')
        .select('*')
        .eq('category', 'ENTERTAINMENT')
        .order('created_at', { ascending: false });

      if (subcategory !== "ALL") {
        query = query.eq('subcategory', subcategory);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching entertainment articles:', error);
        return [];
      }
      
      return data || [];
    }
  });

  const mainFeaturedArticle = featuredArticles[0];
  const sideFeaturedArticles = featuredArticles.slice(1, 3);
  const gridArticles = articles.slice(0, 4);
  const popularArticles = articles.filter(article => article.popular)?.slice(0, 6);
  const recentArticles = articles.slice(0, 6);
  const upcomingArticles = articles.slice(0, 5);

  if (isFeaturedLoading || isArticlesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading articles...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Entertainment</h1>

        <EntertainmentCategories 
          subcategory={subcategory} 
          setSubcategory={setSubcategory} 
        />

        <CategoryHero 
          featuredArticle={mainFeaturedArticle} 
          gridArticles={sideFeaturedArticles} 
        />

        <ArticleGrid articles={gridArticles} />

        <div className="w-full h-[100px] bg-gray-200 flex items-center justify-center mb-8">
          <span className="text-gray-500">Advertisement</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <ArticleTabs
              popularArticles={popularArticles}
              recentArticles={recentArticles}
              onTabChange={setActiveTab}
            />
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Advertisement</span>
            </div>

            <UpcomingEntertainment upcomingArticles={upcomingArticles} />

            <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Advertisement</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}