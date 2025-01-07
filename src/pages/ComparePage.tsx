import { useSearchParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import type { MobileProduct, LaptopProduct } from "@/types/product";

export default function ComparePage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as 'mobile' | 'laptop';
  const productIds = searchParams.get('products')?.split(',') || [];
  
  const productQueries = useQueries({
    queries: productIds.map(id => ({
      queryKey: ['product', id, type],
      queryFn: async () => {
        const tableName = type === 'laptop' ? 'laptops' : 'mobile_products';
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        return data as MobileProduct | LaptopProduct;
      },
    })),
  });

  const isLoading = productQueries.some(query => query.isLoading);
  const products = productQueries
    .filter(query => query.data)
    .map(query => query.data) as (MobileProduct | LaptopProduct)[];

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Product Comparison</h1>
        {products.length > 0 && (
          <ComparisonTable
            selectedProducts={products}
            currentProduct={products[0]}
            type={type}
            onRemove={() => {}}
          />
        )}
      </div>
    </Layout>
  );
}