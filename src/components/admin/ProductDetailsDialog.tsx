import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductImage } from "./ProductImage";
import { ProductSpecifications } from "./ProductSpecifications";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url?: string;
  [key: string]: any;
}

interface ProductDetailsDialogProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailsDialog({ product, onClose }: ProductDetailsDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.image_url && (
            <div className="w-full">
              <ProductImage
                imageUrl={product.image_url}
                productName={product.name}
              />
            </div>
          )}
          <div className="w-full">
            <ProductSpecifications product={product} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}