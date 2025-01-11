import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MobileProduct, LaptopProduct } from "@/types/product";
import { useIsMobile } from "@/hooks/use-mobile";

interface ComparisonTableProps {
  selectedProducts: (MobileProduct | LaptopProduct)[];
  currentProduct: MobileProduct | LaptopProduct;
  type: 'mobile' | 'laptop';
  onRemove: (productId: string) => void;
}

export function ComparisonTable({ selectedProducts, currentProduct, type, onRemove }: ComparisonTableProps) {
  const isMobile = useIsMobile();
  
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
  const displayProducts = selectedProducts.slice(1, 3);

  return (
    <div className="mt-3 md:mt-6">
      <div className="mt-4 md:mt-8">
        {specs.map((spec) => (
          <div key={spec.key}>
            <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4 gap-4'} py-2 md:py-3`}>
              <div className="font-medium text-gray-700 text-sm md:text-base">{spec.title}</div>
              <div className="text-gray-600 text-sm md:text-base break-words">
                {spec.key === 'price' 
                  ? `₹${currentProduct[spec.key]?.toLocaleString()}` 
                  : currentProduct[spec.key as keyof typeof currentProduct]?.toString() || 'N/A'}
              </div>
              {!isMobile && displayProducts.map((product) => (
                <div key={`${product.id}-${spec.key}`} className="text-gray-600 text-sm md:text-base break-words">
                  {spec.key === 'price' 
                    ? `₹${product[spec.key]?.toLocaleString()}` 
                    : product[spec.key as keyof typeof product]?.toString() || 'N/A'}
                </div>
              ))}
            </div>
            <Separator className="my-1 md:my-2" />
          </div>
        ))}
      </div>
    </div>
  );
}