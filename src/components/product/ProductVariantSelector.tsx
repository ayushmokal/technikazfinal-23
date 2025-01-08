import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LaptopProduct, MobileProduct } from "@/types/product";

interface ProductVariantSelectorProps {
  product: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
  onVariantChange: (variant: LaptopProduct | MobileProduct) => void;
}

export function ProductVariantSelector({ product, type, onVariantChange }: ProductVariantSelectorProps) {
  const [selectedStorage, setSelectedStorage] = useState<string>(product.storage || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.color || '');

  const { data: variants } = useQuery({
    queryKey: ['product-variants', product.name, product.brand],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(type === 'laptop' ? 'laptops' : 'mobile_products')
        .select('*')
        .eq('name', product.name)
        .eq('brand', product.brand);

      if (error) throw error;
      return data as (LaptopProduct | MobileProduct)[];
    },
  });

  // Get unique storage and color options
  const storageOptions = [...new Set(variants?.map(v => v.storage))].filter(Boolean);
  const colorOptions = [...new Set(variants?.map(v => v.color))].filter(Boolean);

  // Find matching variant when storage or color changes
  useEffect(() => {
    if (variants && (selectedStorage || selectedColor)) {
      const matchingVariant = variants.find(v => 
        (!selectedStorage || v.storage === selectedStorage) &&
        (!selectedColor || v.color === selectedColor)
      );
      
      if (matchingVariant) {
        onVariantChange(matchingVariant);
      }
    }
  }, [selectedStorage, selectedColor, variants]);

  return (
    <div className="flex items-center gap-6">
      <Select value={selectedStorage} onValueChange={setSelectedStorage}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Storage" />
        </SelectTrigger>
        <SelectContent>
          {storageOptions.map((storage) => (
            <SelectItem key={storage} value={storage || ''}>
              {storage} Storage
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedColor} onValueChange={setSelectedColor}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Color" />
        </SelectTrigger>
        <SelectContent>
          {colorOptions.map((color) => (
            <SelectItem key={color} value={color || ''}>
              {color}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}