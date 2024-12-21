import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export default function StocksPage() {
  const [activeTab, setActiveTab] = useState("popular");

  const { data: articles } = useQuery({
    queryKey: ['stocks-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'STOCKS')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

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
        <h1 className="text-4xl font-bold text-center mb-8">Stocks</h1>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {articles?.map((article) => (
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

        {/* Popular/Recent Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Tabs defaultValue="popular" className="w-full" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
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
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Ad Space */}
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
