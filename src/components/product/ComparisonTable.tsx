import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MobileProduct, LaptopProduct } from "@/types/product";

interface ComparisonTableProps {
  selectedProducts: (MobileProduct | LaptopProduct)[];
  currentProduct: MobileProduct | LaptopProduct;
  type: 'mobile' | 'laptop';
  onRemove: (productId: string) => void;
}

export function ComparisonTable({ selectedProducts, currentProduct, type, onRemove }: ComparisonTableProps) {
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
      <div className="sticky top-0 bg-white z-10 pb-4">
        <div className="grid grid-cols-3 gap-4">
          {selectedProducts.map((product) => (
            <div key={product.id} className="relative">
              {product.id !== currentProduct.id && (
                <button
                  onClick={() => onRemove(product.id)}
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
}