import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSpecifications } from "./ProductSpecifications";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url?: string;
  gallery_images?: string[];
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
  model_name?: string;
  resolution?: string;
  screen_size?: string;
  charging_specs?: string;
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
          <div className="w-full">
            <ProductGallery
              mainImage={product.image_url}
              galleryImages={product.gallery_images}
              productName={product.name}
            />
          </div>
          <div className="w-full">
            <ProductSpecifications product={product} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}