import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoryHero } from "@/components/CategoryHero";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ArticleTabs } from "@/components/ArticleTabs";
import { BlogSidebar } from "@/components/BlogSidebar";
import { categories } from "@/types/blog";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function GadgetsPage() {
  const [subcategory, setSubcategory] = useState<"MOBILE" | "LAPTOPS" | "ALL">("ALL");
  const [activeTab, setActiveTab] = useState("popular");

  // Query for category-specific featured articles
  const { data: featuredArticles = [] } = useQuery({
    queryKey: ['gadgets-featured-articles'],
    queryFn: async () => {
      console.log('Fetching featured gadgets articles');
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'GADGETS')
        .eq('featured_in_category', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching featured gadgets articles:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Query for all gadgets articles
  const { data: articles = [] } = useQuery({
    queryKey: ['gadgets-articles', subcategory],
    queryFn: async () => {
      console.log('Fetching gadgets articles with subcategory:', subcategory);
      let query = supabase
        .from('blogs')
        .select('*')
        .eq('category', 'GADGETS')
        .order('created_at', { ascending: false });
      
      if (subcategory !== "ALL") {
        query = query.eq('subcategory', subcategory);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching gadgets articles:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Query for latest mobile products
  const { data: mobileProducts = [] } = useQuery({
    queryKey: ['latest-mobiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mobile_products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data;
    }
  });

  // Query for latest laptops
  const { data: laptops = [] } = useQuery({
    queryKey: ['latest-laptops'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('laptops')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data;
    }
  });

  const mainFeaturedArticle = featuredArticles[0];
  const gridFeaturedArticles = featuredArticles.slice(1, 3);
  const popularArticles = articles || [];
  const recentArticles = articles.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Gadgets</h1>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={subcategory === "ALL" ? "default" : "outline"}
            onClick={() => setSubcategory("ALL")}
            className="min-w-[100px]"
          >
            All
          </Button>
          {categories.GADGETS.map((sub) => (
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

        {subcategory === "ALL" && mainFeaturedArticle && (
          <CategoryHero 
            featuredArticle={mainFeaturedArticle} 
            gridArticles={gridFeaturedArticles} 
          />
        )}

        {/* Mobile Products Grid */}
        {(subcategory === "ALL" || subcategory === "MOBILE") && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Latest Mobile Phones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mobileProducts.map((product) => (
                <Link 
                  key={product.id}
                  to={`/product/${product.id}?type=mobile`}
                  className="bg-white rounded-xl overflow-hidden group hover:shadow-lg transition-shadow"
                >
                  <AspectRatio ratio={16/9}>
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600">₹{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Laptops Grid */}
        {(subcategory === "ALL" || subcategory === "LAPTOPS") && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Latest Laptops</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {laptops.map((laptop) => (
                <Link 
                  key={laptop.id}
                  to={`/product/${laptop.id}?type=laptop`}
                  className="bg-white rounded-xl overflow-hidden group hover:shadow-lg transition-shadow"
                >
                  <AspectRatio ratio={16/9}>
                    <img
                      src={laptop.image_url || "/placeholder.svg"}
                      alt={laptop.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">{laptop.name}</h3>
                    <p className="text-gray-600">₹{laptop.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <ArticleGrid articles={articles.slice(0, 4)} />

        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center my-8">
          <span className="text-gray-500">Advertisement</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <ArticleTabs
              popularArticles={popularArticles}
              recentArticles={recentArticles}
              onTabChange={setActiveTab}
              category="GADGETS"
            />
          </div>

          <div className="lg:col-span-4">
            <BlogSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}