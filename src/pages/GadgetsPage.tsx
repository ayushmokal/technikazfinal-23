import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { categories } from "@/types/blog";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { MobileProductList } from "@/components/product/MobileProductList";
import { LaptopProductGrid } from "@/components/product/LaptopProductGrid";
import type { MobileProduct, LaptopProduct } from "@/types/product";

export default function GadgetsPage() {
  const [subcategory, setSubcategory] = useState<"MOBILE" | "LAPTOPS">("MOBILE");

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
      
      if (error) throw error;
      return data || [];
    }
  });

  // Query for all gadgets articles
  const { data: articles = [] } = useQuery({
    queryKey: ['gadgets-articles', subcategory],
    queryFn: async () => {
      console.log('Fetching gadgets articles with subcategory:', subcategory);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'GADGETS')
        .eq('subcategory', subcategory)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
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
      return data as MobileProduct[];
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
      return data as LaptopProduct[];
    }
  });

  const ProductGrids = () => (
    <>
      {subcategory === "MOBILE" && <MobileProductList products={mobileProducts} />}
      {subcategory === "LAPTOPS" && <LaptopProductGrid products={laptops} />}
    </>
  );

  return (
    <CategoryPageLayout
      title="Gadgets"
      category="GADGETS"
      articles={articles}
      featuredArticles={featuredArticles}
      subcategories={categories.GADGETS}
      selectedSubcategory={subcategory}
      onSubcategoryChange={(sub) => setSubcategory(sub as typeof subcategory)}
    >
      <ProductGrids />
    </CategoryPageLayout>
  );
}