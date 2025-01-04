import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";
import { Link } from "react-router-dom";

interface CompareSectionProps {
  currentProduct: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
}

export function CompareSection({ currentProduct, type }: CompareSectionProps) {
  const { data: compareProducts } = useQuery({
    queryKey: ['compare-products', currentProduct.id, type],
    queryFn: async () => {
      const tableName = type === 'laptop' ? 'laptops' : 'mobile_products';
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .neq('id', currentProduct.id)
        .limit(8); // Increased limit to show 8 products (2 rows of 4)

      if (error) throw error;
      return data;
    },
  });

  if (!compareProducts?.length) {
    return <div>No products to compare</div>;
  }

  return (
    <ScrollArea className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pr-4 min-h-[400px]">
        {compareProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}?type=${type}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
          >
            <div className="aspect-square mb-4">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-2xl font-bold text-primary mb-2">
              ₹{product.price.toLocaleString()}
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Display: {product.display_specs}</p>
              <p>Processor: {product.processor}</p>
              {type === 'mobile' && 'camera' in product && (
                <p>Camera: {product.camera}</p>
              )}
              {type === 'laptop' && 'graphics' in product && (
                <p>Graphics: {product.graphics}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}