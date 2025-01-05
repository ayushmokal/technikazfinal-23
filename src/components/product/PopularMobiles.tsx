import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function PopularMobiles() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const { data, isLoading: isLoadingMore, fetchNextPage, hasNextPage } = useQuery({
    queryKey: ['popular-mobiles', page],
    queryFn: async () => {
      const from = (page - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error, count } = await supabase
        .from('mobile_products')
        .select('*', { count: 'exact' })
        .range(from, to);

      if (error) throw error;
      
      return {
        items: data,
        count,
      };
    },
  });

  const popularMobiles = data?.items || [];
  const totalCount = data?.count || 0;
  const hasMore = popularMobiles.length < totalCount;

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Popular Mobiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularMobiles.map((mobile) => (
          <Link 
            key={mobile.id} 
            to={`/product/${mobile.id}?type=mobile`}
            className="group"
          >
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200">
              <div className="aspect-w-4 aspect-h-3 mb-6">
                <img
                  src={mobile.image_url || "/placeholder.svg"}
                  alt={mobile.name}
                  className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary/90 transition-colors">
                  {mobile.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-primary">₹{mobile.price.toLocaleString()}</span>
                </div>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <p className="line-clamp-1">
                    Display: {mobile.display_specs}
                  </p>
                  <p className="line-clamp-1">
                    Camera: {mobile.camera}
                  </p>
                  <p className="line-clamp-1">
                    Battery: {mobile.battery}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            variant="outline"
            size="lg"
          >
            {isLoadingMore ? "Loading..." : "Load More Mobiles"}
          </Button>
        </div>
      )}
    </section>
  );
}