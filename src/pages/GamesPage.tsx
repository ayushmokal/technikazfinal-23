import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoryHero } from "@/components/CategoryHero";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ArticleTabs } from "@/components/ArticleTabs";

export default function GamesPage() {
  const [platform, setPlatform] = useState("ALL");
  const [activeTab, setActiveTab] = useState("popular");

  const { data: articles } = useQuery({
    queryKey: ['games-articles', platform],
    queryFn: async () => {
      console.log('Fetching games articles with platform:', platform);
      let query = supabase
        .from('blogs')
        .select('id, title, content, category, subcategory, author, image_url, slug, featured, popular, created_at')
        .eq('category', 'GAMES')
        .order('created_at', { ascending: false });

      // Only apply subcategory filter if not "ALL"
      if (platform !== "ALL") {
        query = query.eq('subcategory', platform);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching games articles:', error);
        throw error;
      }
      
      console.log('Games articles fetched successfully:', data);
      return data;
    }
  });

  const featuredArticle = articles?.[0];
  const gridArticles = articles?.slice(1, 5) || [];
  const popularArticles = articles?.filter(article => article.popular)?.slice(0, 6) || [];
  const recentArticles = articles?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Ad Banner */}
      <div className="w-full h-[50px] bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Ads Here</span>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8">Games</h1>

        {/* Platform Filter */}
        <div className="flex justify-center gap-4 mb-8">
          {["ALL", "PS5", "Xbox", "Nintendo", "PC"].map((p) => (
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
        <CategoryHero featuredArticle={featuredArticle} gridArticles={gridArticles} />

        {/* Grid Section */}
        <ArticleGrid articles={gridArticles} />

        {/* Middle Ad */}
        <div className="w-full h-[100px] bg-gray-200 flex items-center justify-center mb-8">
          <span className="text-gray-500">Ads Here</span>
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
              <span className="text-gray-500">Ads Here</span>
            </div>

            {/* Bottom Ad Space */}
            <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Ads Here</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}