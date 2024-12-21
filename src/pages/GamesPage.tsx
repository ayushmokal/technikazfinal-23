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

  // Separate query for featured articles
  const { data: featuredArticles } = useQuery({
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

  // Regular articles query
  const { data: articles } = useQuery({
    queryKey: ['games-articles', platform],
    queryFn: async () => {
      console.log('Fetching games articles with platform:', platform);
      let query = supabase
        .from('blogs')
        .select('*')
        .eq('category', 'GAMES')
        .order('created_at', { ascending: false });

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

  const mainFeaturedArticle = featuredArticles?.[0];
  const gridFeaturedArticles = featuredArticles?.slice(1) || [];
  const popularArticles = articles?.filter(article => article.popular)?.slice(0, 6) || [];
  const recentArticles = articles?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Ad Banner */}
      <div className="w-full h-[100px] bg-gray-200 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc" 
          alt="Advertisement" 
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
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

        {/* Featured Articles Section */}
        {mainFeaturedArticle && (
          <CategoryHero 
            featuredArticle={mainFeaturedArticle} 
            gridArticles={gridFeaturedArticles}
          />
        )}

        {/* Grid Section */}
        <ArticleGrid articles={articles || []} />

        {/* Middle Ad */}
        <div className="w-full h-[200px] bg-gray-200 overflow-hidden mb-8">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
            alt="Advertisement" 
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
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
            <div className="w-full h-[300px] bg-gray-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Advertisement" 
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>

            {/* Bottom Ad Space */}
            <div className="w-full h-[300px] bg-gray-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Advertisement" 
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}