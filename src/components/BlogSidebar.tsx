import { useState } from "react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export function BlogSidebar() {
  const [selectedCategory, setSelectedCategory] = useState("GAMES");

  const { data: upcomingItems } = useQuery({
    queryKey: ['upcoming-items', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('blogs')
        .select('*')
        .eq('category', selectedCategory)
        .order('created_at', { ascending: false })
        .limit(5);
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  return (
    <aside className="space-y-8">
      <div className="rounded-lg border-2 border-emerald-600">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-3">
          <h2 className="text-xl font-bold">Upcomings</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-emerald-600">
          {["GAMES", "PHONE", "MOVIES", "MORE"].map((category) => (
            <Button
              key={category}
              variant="ghost"
              className={`flex-1 rounded-none border-b-2 ${
                selectedCategory === category 
                ? "border-emerald-600 text-emerald-600" 
                : "border-transparent"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0) + category.slice(1).toLowerCase()}
            </Button>
          ))}
        </div>

        {/* Upcoming Items List */}
        <div className="divide-y">
          {upcomingItems?.map((item) => (
            <Link 
              to={`/article/${item.slug}`}
              key={item.id} 
              className="flex gap-4 p-4 hover:bg-gray-50"
            >
              <img
                src={item.image_url || "/placeholder.svg"}
                alt={item.title}
                className="w-24 h-16 object-cover"
              />
              <div>
                <h4 className="font-medium">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500">
                  Coming {new Date(item.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}