import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MobileProduct, LaptopProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CompareSearchBarProps {
  type: 'mobile' | 'laptop';
  onProductSelect: (product: MobileProduct | LaptopProduct) => void;
  currentProductId: string;
}

export function CompareSearchBar({ type, onProductSelect, currentProductId }: CompareSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: searchResults = [] } = useQuery({
    queryKey: ['product-search', type, searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      
      const tableName = type === 'laptop' ? 'laptops' : 'mobile_products';
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .neq('id', currentProductId)
        .ilike('name', `%${searchQuery}%`)
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: searchQuery.length > 0,
  });

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search products to compare..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />
      {searchResults.length > 0 && (
        <ScrollArea className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60">
          <div className="p-2">
            {searchResults.map((product) => (
              <Button
                key={product.id}
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => {
                  onProductSelect(product);
                  setSearchQuery('');
                }}
              >
                <div className="flex items-center gap-2">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.brand} • ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}