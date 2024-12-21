import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./ProductForm";
import { ProductGrid } from "./ProductGrid";

export function MobileProductManager() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const { data: products, refetch } = useQuery({
    queryKey: ['mobile-products'],
    queryFn: async () => {
      console.log('Fetching mobile products...');
      const { data, error } = await supabase
        .from('mobile_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching mobile products:', error);
        throw error;
      }
      console.log('Mobile products fetched:', data);
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('mobile_products')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete mobile product",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Mobile product deleted successfully",
    });
    refetch();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mobile Products</h2>
        <Button onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? "Cancel" : "Add New Product"}
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Mobile Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm 
              onSuccess={() => {
                setIsAdding(false);
                refetch();
              }}
              onCancel={() => setIsAdding(false)}
            />
          </CardContent>
        </Card>
      )}

      <ProductGrid products={products || []} onDelete={handleDelete} />
    </div>
  );
}