import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PopularMobiles() {
  const { data: popularMobiles = [] } = useQuery({
    queryKey: ['popular-mobiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mobile_products')
        .select('*')
        .limit(6);

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Popular Mobiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularMobiles.map((mobile) => (
          <div key={mobile.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="aspect-w-4 aspect-h-3 mb-4">
              <img
                src={mobile.image_url || "/placeholder.svg"}
                alt={mobile.name}
                className="w-full h-48 object-contain"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{mobile.name}</h3>
              <p className="text-muted-foreground">₹{mobile.price.toLocaleString()}</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{mobile.display_specs}</p>
                <p>{mobile.processor}</p>
                <p>{mobile.camera}</p>
              </div>
              <Link to={`/product/${mobile.id}?type=mobile`}>
                <Button variant="outline" className="w-full mt-2">View Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}