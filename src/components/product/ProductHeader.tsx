import { Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { CompareSection } from "./CompareSection";

interface ProductHeaderProps {
  product: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
}

export function ProductHeader({ product, type }: ProductHeaderProps) {
  const [showCompareDialog, setShowCompareDialog] = useState(false);

  const getBrandUrl = (brand: string) => {
    const brandUrls: Record<string, string> = {
      'Apple': 'https://www.apple.com',
      'Samsung': 'https://www.samsung.com',
      'OnePlus': 'https://www.oneplus.com',
      'Xiaomi': 'https://www.mi.com',
      'ASUS': 'https://www.asus.com',
      'Dell': 'https://www.dell.com',
      'HP': 'https://www.hp.com',
      'Lenovo': 'https://www.lenovo.com',
      // Add more brands as needed
    };
    return brandUrls[brand] || '#';
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Released January 2024</span>
            </div>
            <a 
              href={getBrandUrl(product.brand)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              About {product.brand}
            </a>
          </div>
        </div>
        <Button onClick={() => setShowCompareDialog(true)}>Compare</Button>
      </div>

      {/* Price and Variants Section */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">(onwards)</span>
          </div>
          <a href="#" className="text-sm text-primary hover:underline">
            See All Variants
          </a>
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-md">
            <option>256 GB Storage</option>
            <option>512 GB Storage</option>
          </select>
          <select className="px-4 py-2 border rounded-md">
            <option>Any Colour</option>
            <option>Black</option>
            <option>Gold</option>
          </select>
        </div>
      </div>

      {/* Compare Dialog */}
      <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
        <DialogContent className="max-w-5xl">
          <CompareSection currentProduct={product} type={type} />
        </DialogContent>
      </Dialog>
    </div>
  );
}