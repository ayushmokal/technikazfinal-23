import { ProductSpecifications } from "@/components/admin/ProductSpecifications";
import { ProductReview } from "./ProductReview";
import { CompareSection } from "./CompareSection";
import { Button } from "@/components/ui/button";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { Smartphone, Camera, Cpu, Battery } from "lucide-react";

interface ProductContentProps {
  product: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
  activeSection: string;
}

export function ProductContent({ product, type, activeSection }: ProductContentProps) {
  const isLaptop = type === 'laptop';
  const [isOpen, setIsOpen] = useState(false);

  const getDisplaySize = () => {
    if ('screen_size' in product && product.screen_size) {
      return product.screen_size;
    }
    return product.display_specs.split(' ')[0];
  };

  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <section id="overview" className="scroll-mt-24">
        <div className="space-y-8">
          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold">{getDisplaySize()}</p>
                <p className="text-sm text-muted-foreground">Screen</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold">{isLaptop ? 'HD Webcam' : product.camera}</p>
                <p className="text-sm text-muted-foreground">Camera</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold">{isLaptop ? product.processor : ('chipset' in product ? product.chipset : product.processor)}</p>
                <p className="text-sm text-muted-foreground">Processor</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                <Battery className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold">{product.battery}</p>
                <p className="text-sm text-muted-foreground">Battery</p>
              </div>
            </div>
          </div>

          {/* Pros and Cons Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-6">{product.name} REVIEW</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-green-600">
                  PROS
                </h3>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>AI & productivity features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Strong performance & battery life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Good display & cameras</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Useful Pen</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-red-600">
                  CONS
                </h3>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>AI & productivity features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Strong performance & battery life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Good display & cameras</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Useful Pen</span>
                  </li>
                </ul>
              </div>
            </div>
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
              <CollapsibleTrigger asChild>
                <Button variant="link" className="text-primary hover:text-primary/90 p-0 h-auto font-semibold">
                  Read Full Reviews {'>'}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="prose max-w-none">
                  <p>
                    Detailed review content goes here. This section expands when the user clicks "Read Full Reviews".
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      <Separator />

      {/* Specifications Section */}
      <section id="specifications" className="scroll-mt-24">
        <a href="#specifications" className="no-underline hover:text-primary transition-colors">
          <h2 className="text-xl font-semibold mb-6">Full Specification</h2>
        </a>
        <ProductSpecifications product={product} />
      </section>

      <Separator />

      {/* Expert Review Section */}
      <section id="expert-review" className="scroll-mt-24">
        <h2 className="text-xl font-semibold mb-6">Expert Review</h2>
        <ProductReview productName={product.name} />
      </section>

      <Separator />

      {/* Compare Section */}
      <section id="compare" className="scroll-mt-24">
        <h2 className="text-xl font-semibold mb-6">Compare Products</h2>
        <CompareSection currentProduct={product} type={type} />
      </section>
    </div>
  );
}
