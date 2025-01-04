import { ProductSpecifications } from "@/components/admin/ProductSpecifications";
import { ProductReview } from "./ProductReview";
import { CompareSection } from "./CompareSection";
import { Button } from "@/components/ui/button";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";
import { Separator } from "@/components/ui/separator";

interface ProductContentProps {
  product: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
  activeSection: string;
}

export function ProductContent({ product, type }: ProductContentProps) {
  const isLaptop = type === 'laptop';

  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <section id="overview" className="scroll-mt-24">
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-green-600 font-medium">Pros</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Premium build quality</li>
                  <li>Excellent performance</li>
                  <li>Great camera system</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-red-600 font-medium">Cons</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Premium pricing</li>
                  <li>Limited customization options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Specifications Section */}
      <section id="specifications" className="scroll-mt-24">
        <h2 className="text-xl font-semibold mb-6">Detailed Specifications</h2>
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