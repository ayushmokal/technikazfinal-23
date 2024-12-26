import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { categories } from "@/types/blog";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export default function TechPage() {
  const [subcategory, setSubcategory] = useState<"Tech Deals" | "News" | "ALL">("ALL");

  // Query for category-specific featured articles
  const { data: featuredArticles = [] } = useQuery({
    queryKey: ['tech-featured-articles'],
    queryFn: async () => {
      console.log('Fetching featured tech articles');
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'TECH')
        .eq('featured_in_category', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching featured tech articles:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Query for all tech articles
  const { data: articles = [] } = useQuery({
    queryKey: ['tech-articles', subcategory],
    queryFn: async () => {
      console.log('Fetching tech articles with subcategory:', subcategory);
      let query = supabase
        .from('blogs')
        .select('*')
        .eq('category', 'TECH')
        .order('created_at', { ascending: false });
      
      if (subcategory !== "ALL") {
        query = query.eq('subcategory', subcategory);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching tech articles:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <CategoryPageContent
        title="Tech"
        articles={articles}
        featuredArticles={featuredArticles}
        subcategories={categories.TECH}
        selectedSubcategory={subcategory}
        onSubcategoryChange={setSubcategory}
        category="TECH"
      />
      <Footer />
    </div>
  );
}