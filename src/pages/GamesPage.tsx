import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoryHero } from "@/components/CategoryHero";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ArticleTabs } from "@/components/ArticleTabs";
import { categories } from "@/types/blog";
import type { Subcategory } from "@/types/blog";

export default function GamesPage() {
  const [platform, setPlatform] = useState<Subcategory | "ALL">("ALL");
  const [activeTab, setActiveTab] = useState("popular");

  // Separate query for featured articles
  const { data: featuredArticles = [] } = useQuery({
    queryKey: ['games-featured-articles'],
    queryFn: async () => {
      console.log('Fetching featured games articles');
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'GAMES')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(7);
      
      if (error) {
        console.error('Error fetching featured games articles:', error);
        throw error;
      }
      
      console.log('Featured games articles fetched:', data);
      return data || [];
    }
  });

  // Regular articles query with platform filter
  const { data: articles = [] } = useQuery({
    queryKey: ['games-articles', platform],
    queryFn: async () => {
      console.log('Fetching games articles with platform:', platform);
      let query = supabase
        .from('blogs')
        .select('*')
        .eq('category', 'GAMES')
        .order('created_at', { ascending: false });
      
      // Only apply platform filter if not "ALL"
      if (platform !== "ALL") {
        query = query.eq('subcategory', platform);
      }
      
      const { data, error } = await query.limit(4); // Limit to 4 articles for one row
      
      if (error) {
        console.error('Error fetching games articles:', error);
        throw error;
      }
      
      console.log('Games articles fetched:', data);
      return data || [];
    }
  });

  const mainFeaturedArticle = featuredArticles[0];
  const gridFeaturedArticles = featuredArticles.slice(1, 3); // Only take 2 articles for the hero section
  const popularArticles = articles.filter(article => article.popular)?.slice(0, 6) || [];
  const recentArticles = articles.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8">Games</h1>

        {/* Platform Filter */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={platform === "ALL" ? "default" : "outline"}
            onClick={() => setPlatform("ALL")}
            className="min-w-[100px]"
          >
            All
          </Button>
          {categories.GAMES.map((p) => (
            <Button
              key={p}
              variant={platform === p ? "default" : "outline"}
              onClick={() => setPlatform(p)}
              className="min-w-[100px]"
            >
              {p}
            </Button>
          ))}
        </div>

        {/* Hero Section */}
        {mainFeaturedArticle && (
          <CategoryHero 
            featuredArticle={mainFeaturedArticle} 
            gridArticles={gridFeaturedArticles} 
          />
        )}

        {/* Grid Section - Only one row */}
        <ArticleGrid articles={articles.slice(0, 4)} />

        {/* Middle Ad */}
        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center my-8">
          <span className="text-gray-500">Advertisement</span>
        </div>

        {/* Popular/Recent Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <ArticleTabs
              popularArticles={popularArticles}
              recentArticles={recentArticles}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Ad Space */}
            <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Advertisement</span>
            </div>

            {/* Bottom Ad Space */}
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