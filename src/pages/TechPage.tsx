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

export default function TechPage() {
  const [subcategory, setSubcategory] = useState("Tech Deals");
  const [activeTab, setActiveTab] = useState("popular");

  const { data: articles } = useQuery({
    queryKey: ['tech-articles', subcategory],
    queryFn: async () => {
      console.log('Fetching tech articles for subcategory:', subcategory);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'TECH')
        .eq('subcategory', subcategory);
      
      if (error) {
        console.error('Error fetching tech articles:', error);
        throw error;
      }
      console.log('Fetched tech articles:', data);
      return data || [];
    }
  });

  const featuredArticle = articles?.[0];
  const gridArticles = articles?.slice(1, 5) || [];
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
        <h1 className="text-4xl font-bold text-center mb-8">Tech</h1>

        {/* Subcategory Filter */}
        <div className="flex justify-center gap-4 mb-8">
          {["Tech Deals", "News"].map((s) => (
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
        <CategoryHero featuredArticle={featuredArticle} gridArticles={gridArticles} />

        {/* Grid Section */}
        <ArticleGrid articles={gridArticles} />

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
                  {["Games", "Phone", "Movies", "More"].map((tab) => (
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