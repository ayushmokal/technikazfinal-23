import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface BaseProduct {
  id: string;
  name: string;
  image_url: string | null;
  price: number;
  brand: string;
  model_name: string | null;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  os: string | null;
  color: string | null;
}

interface MobileProduct extends BaseProduct {
  camera: string;
  chipset: string | null;
}

interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
}

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

  const renderComparisonTable = () => {
    const baseSpecs = [
      { title: "Price", key: "price" },
      { title: "Brand", key: "brand" },
      { title: "Model", key: "model_name" },
      { title: "Display", key: "display_specs" },
      { title: "Processor", key: "processor" },
      { title: "RAM", key: "ram" },
      { title: "Storage", key: "storage" },
      { title: "Battery", key: "battery" },
      { title: "OS", key: "os" },
      { title: "Color", key: "color" },
    ];

    const mobileSpecs = [
      ...baseSpecs,
      { title: "Camera", key: "camera" },
      { title: "Chipset", key: "chipset" },
    ];

    const laptopSpecs = [
      ...baseSpecs,
      { title: "Graphics", key: "graphics" },
      { title: "Ports", key: "ports" },
    ];

    const specs = type === 'laptop' ? laptopSpecs : mobileSpecs;

    return (
      <div className="mt-6">
        <div className="grid grid-cols-3 gap-4">
          {selectedProducts.map((product) => (
            <div key={product.id} className="relative">
              {product.id !== currentProduct.id && (
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-contain mb-2"
              />
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">₹{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          {specs.map((spec) => (
            <div key={spec.key}>
              <div className="grid grid-cols-3 gap-4 py-3">
                <div className="font-medium">{spec.title}</div>
                {selectedProducts.map((product) => (
                  <div key={`${product.id}-${spec.key}`}>
                    {product[spec.key as keyof typeof product]?.toString() || 'N/A'}
                  </div>
                ))}
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {selectedProducts.length < 3 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Add Products to Compare</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => {
              const isSelected = selectedProducts.some(p => p.id === product.id);
              return (
                <div key={product.id} className="border rounded-lg p-4">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <h4 className="font-medium text-sm">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">₹{product.price.toLocaleString()}</p>
                  <Button
                    variant={isSelected ? "secondary" : "default"}
                    className="w-full"
                    onClick={() => addToCompare(product)}
                    disabled={isSelected}
                  >
                    {isSelected ? "Added" : "Compare"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedProducts.length > 0 && renderComparisonTable()}
    </div>
  );
}