import { ProductSpecifications } from "@/components/admin/ProductSpecifications";
import { ProductReview } from "./ProductReview";
import { CompareSection } from "./CompareSection";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { ProductKeySpecs } from "./ProductKeySpecs";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";

interface ProductContentProps {
  product: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
  activeSection: string;
}

export function ProductContent({ product, type }: ProductContentProps) {
  const isLaptop = type === 'laptop';
  const isMobile = type === 'mobile';

  return (
    <div className="flex-1 space-y-16">
      {/* Overview Section */}
      <section id="overview" className="scroll-mt-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-sm text-muted-foreground">Released January 2024</p>
              </div>
              <Button>Compare</Button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">(onwards)</span>
            </div>

            {isMobile && (
              <div className="flex gap-4">
                <Select>
                  <option>256 GB Storage</option>
                  <option>512 GB Storage</option>
                </Select>
                <Select>
                  <option>Any Colour</option>
                  <option>Black</option>
                  <option>Blue</option>
                </Select>
              </div>
            )}

            <ProductKeySpecs
              type={type}
              screenSize={product.display_specs}
              camera={isMobile ? (product as MobileProduct).camera : undefined}
              processor={product.processor}
              battery={product.battery}
              graphics={isLaptop ? (product as LaptopProduct).graphics : undefined}
            />
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section id="review" className="scroll-mt-24">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{product.name} REVIEW</h2>
          <ProductReview productName={product.name} />
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specifications" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Full Specification</h2>
        <ProductSpecifications product={product} />
      </section>

      {/* Compare Section */}
      <section id="compare" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Compare Products</h2>
        <CompareSection currentProduct={product} type={type} />
      </section>
    </div>
  );
}