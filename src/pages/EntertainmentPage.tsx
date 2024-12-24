import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ArticleTabs } from "@/components/ArticleTabs";
import { categories } from "@/types/blog";
import type { Subcategory } from "@/types/blog";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function EntertainmentPage() {
  const [subcategory, setSubcategory] = useState<Subcategory>(categories.ENTERTAINMENT[0]);
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
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'ENTERTAINMENT')
        .eq('subcategory', subcategory)
        .order('created_at', { ascending: false });
      
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

        <div className="flex justify-center gap-4 mb-8">
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

        {/* Featured Articles Section - 60-20-20 Layout */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* Main Featured Article - 60% width */}
          {mainFeaturedArticle && (
            <div className="col-span-12 lg:col-span-7">
              <Link to={`/article/${mainFeaturedArticle.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-xl">
                  <AspectRatio ratio={4/3}>
                    <img
                      src={mainFeaturedArticle.image_url || '/placeholder.svg'}
                      alt={mainFeaturedArticle.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                </div>
                <h2 className="mt-4 text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                  {mainFeaturedArticle.title}
                </h2>
              </Link>
            </div>
          )}

          {/* Side Articles - 20% width each */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            {sideFeaturedArticles.map((article) => (
              <div key={article.slug} className="bg-white rounded-xl overflow-hidden group">
                <Link to={`/article/${article.slug}`} className="block">
                  <div className="relative overflow-hidden">
                    <AspectRatio ratio={4/3}>
                      <img
                        src={article.image_url || '/placeholder.svg'}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </AspectRatio>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Articles */}
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
                {articles.slice(0, 5).map((article) => (
                  <div
                    key={article.slug}
                    className="flex gap-4 p-4 hover:bg-gray-50"
                  >
                    <img
                      src={article.image_url || '/placeholder.svg'}
                      alt={article.title}
                      className="w-20 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium line-clamp-2">{article.title}</h4>
                      <p className="text-sm text-gray-500">
                        Coming {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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