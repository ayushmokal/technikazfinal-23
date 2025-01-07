import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileProduct, LaptopProduct } from "@/types/product";
import { X } from "lucide-react";

interface CompareDeviceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentProduct: MobileProduct | LaptopProduct;
  type: 'mobile' | 'laptop';
}

export function CompareDeviceDialog({ 
  open, 
  onOpenChange, 
  currentProduct, 
  type 
}: CompareDeviceDialogProps) {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<(MobileProduct | LaptopProduct)[]>([currentProduct]);

  const { data: products = [] } = useQuery({
    queryKey: ['products-to-compare', type],
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

  const handleProductSelect = (product: MobileProduct | LaptopProduct) => {
    if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleCompare = () => {
    const productIds = selectedProducts.map(p => p.id).join(',');
    navigate(`/compare?type=${type}&products=${productIds}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogTitle>Compare Devices</DialogTitle>
        
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {selectedProducts.map((product) => (
              <div key={product.id} className="relative border p-4 rounded-lg">
                {product.id !== currentProduct.id && (
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-32 object-contain mb-2"
                />
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground">₹{product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>

          {selectedProducts.length < 3 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products
                .filter(p => !selectedProducts.some(sp => sp.id === p.id))
                .map((product) => (
                  <div
                    key={product.id}
                    className="border p-4 rounded-lg cursor-pointer hover:border-primary"
                    onClick={() => handleProductSelect(product)}
                  >
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-24 object-contain mb-2"
                    />
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">₹{product.price.toLocaleString()}</p>
                  </div>
                ))}
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleCompare}
              disabled={selectedProducts.length < 2}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Compare {selectedProducts.length} Devices
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}