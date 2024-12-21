import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { supabase } from "@/integrations/supabase/client";
import type { BlogFormData } from "@/types/blog";
import { cn } from "@/lib/utils";

const platforms = ["PS5", "Xbox", "Nintendo", "PC"];

export default function CategoryPage() {
  const { category } = useParams();
  const [articles, setArticles] = useState<BlogFormData[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("PS5");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, [category, selectedPlatform]);

  const fetchArticles = async () => {
    try {
      let query = supabase
        .from("blogs")
        .select("*")
        .eq("category", category?.toUpperCase());

      if (selectedPlatform) {
        query = query.eq("subcategory", selectedPlatform);
      }

      const { data, error } = await query;

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-8">Games</h1>
          
          {/* Platform Filters */}
          <div className="flex justify-center gap-8 mb-8">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  selectedPlatform === platform
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600"
                )}
              >
                {platform}
              </button>
            ))}
          </div>
        </header>

        {/* Hero Article */}
        <div className="mb-12">
          <ArticleCard
            title="PlayStation 5 Pro Release Date, Price, Specs, Preorder Details"
            image="/lovable-uploads/c8618d7a-0934-449b-8f91-0bdb472e025e.png"
            category="GAMES"
            slug="ps5-pro-announcement"
            mainFeatured={true}
          />
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              image={article.image_url || "/placeholder.svg"}
              category={article.category}
              slug={article.slug}
            />
          ))}
        </div>
      </main>
    </div>
  );
}