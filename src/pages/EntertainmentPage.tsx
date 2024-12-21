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

export default function EntertainmentPage() {
  const [subcategory, setSubcategory] = useState("MOVIES");
  const [activeTab, setActiveTab] = useState("popular");

  // Separate query for featured articles
  const { data: featuredArticles } = useQuery({
    queryKey: ['entertainment-featured-articles'],
    queryFn: async () => {
      console.log('Fetching featured entertainment articles');
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'ENTERTAINMENT')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(7);
      
      if (error) {
        console.error('Error fetching featured entertainment articles:', error);
        throw error;
      }
      
      console.log('Featured entertainment articles fetched:', data);
      return data || [];
    }
  });

  // Regular articles query
  const { data: articles } = useQuery({
    queryKey: ['entertainment-articles', subcategory],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'ENTERTAINMENT')
        .eq('subcategory', subcategory)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const mainFeaturedArticle = featuredArticles?.[0];
  const gridFeaturedArticles = featuredArticles?.slice(1) || [];
  const popularArticles = articles?.filter(article => article.popular)?.slice(0, 6) || [];
  const recentArticles = articles?.slice(0, 6) || [];
  const upcomingArticles = articles?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Ad Banner */}
      <div className="w-full h-[50px] bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Ads Here</span>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8">Entertainment</h1>

        {/* Subcategory Filter */}
        <div className="flex justify-center gap-4 mb-8">
          {["MOVIES", "SERIES", "COMICS"].map((s) => (
            <Button
              key={s}
              variant={subcategory === s ? "default" : "outline"}
              onClick={() => setSubcategory(s)}
              className="min-w-[100px]"
            >
              {s}
            </Button>
          ))}
        </div>

        {/* Hero Section */}
        <CategoryHero 
          featuredArticle={mainFeaturedArticle} 
          gridArticles={gridFeaturedArticles} 
        />

        {/* Grid Section */}
        <ArticleGrid articles={gridFeaturedArticles} />

        {/* Middle Ad */}
        <div className="w-full h-[100px] bg-gray-200 flex items-center justify-center mb-8">
          <span className="text-gray-500">Ads Here</span>
        </div>

        {/* Popular/Recent/Upcoming Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <ArticleTabs
              popularArticles={popularArticles}
              recentArticles={recentArticles}
              upcomingArticles={upcomingArticles}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Ad Space */}
            <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Ads Here</span>
            </div>

            {/* Upcoming Section */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-primary p-4">
                <h2 className="text-white font-semibold">Upcomings</h2>
                <div className="flex gap-2 mt-2">
                  {["Movies", "Series", "More"].map((tab) => (
                    <Button
                      key={tab}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-primary hover:bg-white"
                    >
                      {tab}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="divide-y">
                {upcomingArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/article/${article.slug}`}
                    className="flex gap-4 p-4 hover:bg-gray-50"
                  >
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-20 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium line-clamp-2">{article.title}</h4>
                      <p className="text-sm text-gray-500">
                        Coming {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
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
