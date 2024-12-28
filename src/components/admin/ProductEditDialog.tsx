import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url?: string;
  [key: string]: any;
}

interface ProductEditDialogProps {
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
  productType: 'mobile' | 'laptop';
}

export function ProductEditDialog({ product, onClose, onSuccess, productType }: ProductEditDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ProductForm 
          initialData={product}
          onSuccess={onSuccess}
          productType={productType}
        />
      </DialogContent>
    </Dialog>
  );
}