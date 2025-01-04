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
        .limit(4);

      if (error) throw error;
      return data;
    },
  });

  if (!compareProducts?.length) {
    return <div>No products to compare</div>;
  }

  return (
    <ScrollArea className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pr-4">
        {compareProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}?type=${type}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3"
          >
            <div className="aspect-square w-16 h-16 mb-2">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium truncate">{product.name}</h3>
              <p className="text-primary font-semibold">
                ₹{product.price.toLocaleString()}
              </p>
              <div className="text-xs text-gray-600">
                <p className="truncate">Display: {product.display_specs}</p>
                {type === 'mobile' && 'camera' in product && (
                  <p className="truncate">Camera: {product.camera}</p>
                )}
                {type === 'laptop' && 'graphics' in product && (
                  <p className="truncate">Graphics: {product.graphics}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}