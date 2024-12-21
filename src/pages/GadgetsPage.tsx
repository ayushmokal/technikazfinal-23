import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

interface MobileProduct {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  display_specs: string;
  processor: string;
  camera: string;
  battery: string;
}

export default function GadgetsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['mobile-products'],
    queryFn: async () => {
      console.log('Fetching mobile products for gadgets page...');
      const { data, error } = await supabase
        .from('mobile_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching mobile products:', error);
        throw error;
      }
      console.log('Mobile products fetched:', data);
      return data as MobileProduct[];
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mobile Phone Comparison</h1>
        
        {isLoading ? (
          <div>Loading products...</div>
        ) : !products?.length ? (
          <div>No mobile products available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="aspect-square relative mb-4">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  <h2 className="text-xl font-bold mb-4">{product.name}</h2>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-semibold">Display:</span> {product.display_specs}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Processor:</span> {product.processor}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Camera:</span> {product.camera}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Battery:</span> {product.battery}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}