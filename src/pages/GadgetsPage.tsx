import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { categories } from "@/types/blog";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";

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

  const ProductGrids = () => (
    <>
      {/* Mobile Products Grid */}
      {subcategory === "MOBILE" && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Latest Mobile Phones</h2>
            <div className="flex gap-4">
              <button className="p-2 border rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9H21M3 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="p-2 border rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3H10V10H3V3ZM14 3H21V10H14V3ZM3 14H10V21H3V14ZM14 14H21V21H14V14Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {mobileProducts.map((product) => (
              <Link 
                key={product.id}
                to={`/product/${product.id}?type=mobile`}
                className="block bg-white rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-6">
                  <div className="w-48 h-48 flex-shrink-0">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-medium text-primary mb-2">
                      {product.name} – Full Phone Specification
                    </h3>
                    <div className="text-2xl font-bold mb-4">
                      ₹{product.price.toLocaleString()}
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex gap-2">
                        <span className="font-medium">Display:</span>
                        <span>{product.display_specs}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-medium">Processor & RAM:</span>
                        <span>{product.ram} | {product.processor}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-medium">Camera:</span>
                        <span>{product.camera}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-medium">Battery:</span>
                        <span>{product.battery}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <Link 
                        to={`/product/${product.id}?type=mobile`}
                        className="text-primary hover:underline"
                      >
                        View Details →
                      </Link>
                      <div className="flex items-center gap-2">
                        <Checkbox id={`compare-${product.id}`} />
                        <label 
                          htmlFor={`compare-${product.id}`}
                          className="text-sm text-gray-600"
                        >
                          Add to Compare
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Laptops Grid */}
      {subcategory === "LAPTOPS" && (
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
