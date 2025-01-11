import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { PopularMobiles } from "@/components/product/PopularMobiles";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types/product";

export default function Index() {
  const { toast } = useToast();

  const { data: mobileProducts = [], error } = useQuery({
    queryKey: ['mobile-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'mobile')
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) {
        console.error('Error fetching mobile products:', error);
        throw error;
      }

      return data as Product[];
    },
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching mobile products:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load mobile products. Please try again.",
        });
      }
    }
  });

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="text-center">
            <p className="text-red-500">Failed to load products. Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <PopularMobiles products={mobileProducts} />
      </div>
    </Layout>
  );
}