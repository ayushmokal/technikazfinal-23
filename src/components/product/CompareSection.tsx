import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductComparisonCard } from "./ProductComparisonCard";
import { ComparisonTable } from "./ComparisonTable";
import { MobileProduct, LaptopProduct } from "@/types/product";

interface CompareSectionProps {
  currentProduct: MobileProduct | LaptopProduct;
  type: 'mobile' | 'laptop';
}

export function CompareSection({ currentProduct, type }: CompareSectionProps) {
  const [selectedProducts, setSelectedProducts] = useState<(MobileProduct | LaptopProduct)[]>([currentProduct]);

  const { data: products = [] } = useQuery({
    queryKey: ['products', type],
    queryFn: async () => {
      const tableName = type === 'laptop' ? 'laptops' : 'mobile_products';
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .neq('id', currentProduct.id)
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  const addToCompare = (product: MobileProduct | LaptopProduct) => {
    if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeFromCompare = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  return (
    <div className="space-y-6">
      {selectedProducts.length < 3 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Add Products to Compare</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductComparisonCard
                key={product.id}
                product={product}
                onCompare={addToCompare}
                isSelected={selectedProducts.some(p => p.id === product.id)}
              />
            ))}
          </div>
        </div>
      )}

      {selectedProducts.length > 0 && (
        <ComparisonTable
          selectedProducts={selectedProducts}
          currentProduct={currentProduct}
          type={type}
          onRemove={removeFromCompare}
        />
      )}
    </div>
  );
}