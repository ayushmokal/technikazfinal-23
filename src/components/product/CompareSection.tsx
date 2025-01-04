import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";

interface CompareSectionProps {
  currentProduct: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
}

export function CompareSection({ currentProduct, type }: CompareSectionProps) {
  const [showCompareDialog, setShowCompareDialog] = useState(false);

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

  return (
    <>
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600 mb-4">Add devices to compare with the current device</p>
        <Button onClick={() => setShowCompareDialog(true)}>Compare</Button>
      </div>

      <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
        <DialogContent className="max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {compareProducts?.map((product) => (
              <div
                key={product.id.toString()}
                className="block bg-white rounded-lg shadow-sm p-3"
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
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}