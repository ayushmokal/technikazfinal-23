import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import type { MobileProductData, LaptopProductData } from "@/components/admin/types/productTypes";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url?: string;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  camera?: string;
  os?: string;
  chipset?: string;
  color?: string;
  graphics?: string;
  ports?: string;
  model_name: string;
  resolution?: string;
  screen_size?: string;
  charging_specs?: string;
}

interface ProductEditDialogProps {
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
  productType: 'mobile' | 'laptop';
}

export function ProductEditDialog({ product, onClose, onSuccess, productType }: ProductEditDialogProps) {
  if (!product) return null;

  // Convert the product data to the correct type based on productType
  const formattedProduct = {
    ...product,
    model_name: product.model_name || '', // Ensure model_name is not undefined
    camera: productType === 'mobile' ? (product.camera || '') : undefined,
  } as (MobileProductData | LaptopProductData) & { id: string };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ProductForm 
          initialData={formattedProduct}
          onSuccess={onSuccess}
          productType={productType}
        />
      </DialogContent>
    </Dialog>
  );
}