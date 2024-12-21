import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export default function EntertainmentPage() {
  const [subcategory, setSubcategory] = useState("MOVIES");
  const [activeTab, setActiveTab] = useState("popular");

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
      return data;
    }
  });

  const featuredArticle = articles?.[0];
  const gridArticles = articles?.slice(1, 5) || [];
  const popularArticles = articles?.filter(article => article.popular)?.slice(0, 6) || [];
  const recentArticles = articles?.slice(0, 6) || [];
  const upcomingArticles = articles?.filter(article => article.upcoming)?.slice(0, 5) || [];

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {featuredArticle && (
            <>
              <div className="lg:col-span-2">
                <Link to={`/article/${featuredArticle.slug}`} className="block">
                  <img
                    src={featuredArticle.image_url}
                    alt={featuredArticle.title}
                    className="w-full aspect-[16/9] object-cover rounded-lg"
                  />
                  <h2 className="text-2xl font-bold mt-4">{featuredArticle.title}</h2>
                </Link>
              </div>
              <div className="space-y-4">
                {gridArticles.slice(0, 2).map((article) => (
                  <Link
                    key={article.slug}
                    to={`/article/${article.slug}`}
                    className="block"
                  >
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full aspect-[16/9] object-cover rounded-lg"
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {gridArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/article/${article.slug}`}
              className="block group"
            >
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full aspect-[4/3] object-cover rounded-lg mb-2"
              />
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Middle Ad */}
        <div className="w-full h-[100px] bg-gray-200 flex items-center justify-center mb-8">
          <span className="text-gray-500">Ads Here</span>
        </div>

        {/* Popular/Recent/Upcoming Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Tabs defaultValue="popular" className="w-full" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>

              <TabsContent value="popular" className="space-y-4">
                {popularArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/article/${article.slug}`}
                    className="flex gap-4 group hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-32 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(article.created_at!).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
                <Button variant="outline" className="w-full">Load More</Button>
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                {recentArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/article/${article.slug}`}
                    className="flex gap-4 group hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-32 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(article.created_at!).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
                <Button variant="outline" className="w-full">Load More</Button>
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/article/${article.slug}`}
                    className="flex gap-4 group hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-32 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Coming {new Date(article.created_at!).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
                <Button variant="outline" className="w-full">Load More</Button>
              </TabsContent>
            </Tabs>
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
                        Coming {new Date(article.created_at!).toLocaleDateString()}
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
