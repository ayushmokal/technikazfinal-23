import { useState } from "react";
import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { categories } from "@/types/blog";

const ITEMS_PER_PAGE = 5;

export function BlogSidebar() {
  const [selectedCategory, setSelectedCategory] = useState("TECH");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Tech Deals");

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ['sidebar-items', selectedCategory, selectedSubcategory],
    queryFn: async ({ pageParam = 0 }) => {
      console.log('Fetching sidebar items for:', selectedCategory, selectedSubcategory, 'page:', pageParam);
      let query = supabase
        .from('blogs')
        .select('*')
        .eq('category', selectedCategory);
      
      if (selectedSubcategory) {
        query = query.eq('subcategory', selectedSubcategory);
      }
      
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .range(pageParam * ITEMS_PER_PAGE, (pageParam + 1) * ITEMS_PER_PAGE - 1);
      
      if (error) {
        console.error('Error fetching sidebar items:', error);
        throw error;
      }
      
      return data || [];
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === ITEMS_PER_PAGE ? allPages.length : undefined;
    },
  });

  const mainCategories = ["TECH", "GAMES", "ENTERTAINMENT", "STOCKS"];
  const subcategories = categories[selectedCategory as keyof typeof categories] || [];

  return (
    <aside className="space-y-8">
      <div className="rounded-lg border-2 border-emerald-600">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-3">
          <h2 className="text-xl font-bold">Upcomings</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap border-b border-emerald-600">
          {mainCategories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              className={`flex-1 rounded-none border-b-2 ${
                selectedCategory === category 
                ? "border-emerald-600 text-emerald-600" 
                : "border-transparent"
              }`}
              onClick={() => {
                console.log('Switching to category:', category);
                setSelectedCategory(category);
                setSelectedSubcategory(categories[category as keyof typeof categories][0]);
              }}
            >
              {category.split(' ').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
            </Button>
          ))}
        </div>

        {/* Subcategory Tabs */}
        <div className="flex flex-wrap p-2 gap-2 border-b border-emerald-600">
          {subcategories.map((subcategory) => (
            <Button
              key={subcategory}
              variant={selectedSubcategory === subcategory ? "default" : "outline"}
              size="sm"
              onClick={() => {
                console.log('Switching to subcategory:', subcategory);
                setSelectedSubcategory(subcategory);
              }}
            >
              {subcategory}
            </Button>
          ))}
        </div>

        {/* Infinite Scroll Content */}
        <div className="divide-y">
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {/* First 5 blog posts */}
              {page.map((item, itemIndex) => (
                <Link 
                  to={`/article/${item.slug}`}
                  key={item.id} 
                  className="flex gap-4 p-4 hover:bg-gray-50"
                >
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              ))}
              
              {/* Advertisement Section */}
              {page.length > 0 && (
                <div className="p-4 bg-gray-50">
                  <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Advertisement</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Load More Button */}
          {hasNextPage && (
            <div className="p-4 text-center">
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                variant="outline"
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}

          {/* Empty State */}
          {data?.pages[0]?.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No upcoming items found
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}