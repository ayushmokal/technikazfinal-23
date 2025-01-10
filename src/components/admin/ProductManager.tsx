import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProductTable } from "./ProductTable";
import { ProductDetailsDialog } from "./ProductDetailsDialog";
import { ProductEditDialog } from "./ProductEditDialog";
import { ExpertReviewForm } from "./ExpertReviewForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LaptopProduct, MobileProduct } from "@/types/product";

interface ProductManagerProps {
  productType: 'mobile' | 'laptop';
}

export function ProductManager({ productType }: ProductManagerProps) {
  const { toast } = useToast();
  const [products, setProducts] = useState<(LaptopProduct | MobileProduct)[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<LaptopProduct | MobileProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<LaptopProduct | MobileProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showExpertReview, setShowExpertReview] = useState(false);
  const [selectedProductForReview, setSelectedProductForReview] = useState<LaptopProduct | MobileProduct | null>(null);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from(productType === 'mobile' ? 'mobile_products' : 'laptops')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [productType]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from(productType === 'mobile' ? 'mobile_products' : 'laptops')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      setProducts(products.filter((product) => product.id !== id));
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleView = (product: LaptopProduct | MobileProduct) => {
    setSelectedProduct(product);
  };

  const handleEdit = (product: LaptopProduct | MobileProduct) => {
    setEditingProduct(product);
  };

  const handleAddReview = (product: LaptopProduct | MobileProduct) => {
    setSelectedProductForReview(product);
    setShowExpertReview(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[600px] rounded-md border">
        <ProductTable
          products={products}
          onView={handleView}
          onEdit={handleEdit}
          onAddReview={handleAddReview}
          onDelete={handleDelete}
        />
      </ScrollArea>

      {selectedProduct && (
        <ProductDetailsDialog 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {editingProduct && (
        <ProductEditDialog
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={() => {
            setEditingProduct(null);
            fetchProducts();
          }}
          productType={productType}
        />
      )}

      <Dialog 
        open={showExpertReview} 
        onOpenChange={(open) => {
          if (!open) {
            setShowExpertReview(false);
            setSelectedProductForReview(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Expert Review</DialogTitle>
            <DialogDescription>
              Add a detailed expert review for this product
            </DialogDescription>
          </DialogHeader>
          {selectedProductForReview && (
            <ExpertReviewForm
              productId={selectedProductForReview.id}
              onSuccess={() => {
                setShowExpertReview(false);
                setSelectedProductForReview(null);
                toast({
                  title: "Success",
                  description: "Expert review added successfully",
                });
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}