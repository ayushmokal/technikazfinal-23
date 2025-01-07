import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export function PopularMobiles() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const { ref: loadMoreRef, inView } = useInView();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['popular-mobiles', page],
    queryFn: async () => {
      const from = (page - 1) * itemsPerPage;
      
      // First, get the total count
      const { count } = await supabase
        .from('mobile_products')
        .select('*', { count: 'exact', head: true });

      // If the requested range is beyond the total count, return current data
      if (count !== null && from >= count) {
        return {
          items: [],
          count,
        };
      }

      // Fetch the actual data
      const { data: newItems, error } = await supabase
        .from('mobile_products')
        .select('*')
        .range(from, from + itemsPerPage - 1)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching mobiles:', error);
        throw error;
      }
      
      return {
        items: newItems || [],
        count,
      };
    },
    placeholderData: (previousData) => previousData,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load mobile products. Please try again.",
        });
      }
    }
  });

  const popularMobiles = data?.items || [];
  const totalCount = data?.count || 0;
  const hasMore = popularMobiles.length > 0 && (page * itemsPerPage) < totalCount;

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setPage(prev => prev + 1);
    }
  }, [inView, hasMore, isFetching]);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load mobile products. Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Popular Mobiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {popularMobiles.map((mobile) => (
          <Link 
            key={mobile.id} 
            to={`/product/${mobile.id}?type=mobile`}
            className="group"
          >
            <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200 h-full">
              <div className="aspect-w-4 aspect-h-3 mb-4">
                <img
                  src={mobile.image_url || "/placeholder.svg"}
                  alt={mobile.name}
                  className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary/90 transition-colors line-clamp-2">
                  {mobile.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-primary">₹{mobile.price.toLocaleString()}</span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
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
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {isFetching && (
            <div className="text-gray-500">Loading more products...</div>
          )}
        </div>
      )}
    </section>
  );
}