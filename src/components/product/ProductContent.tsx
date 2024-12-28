import { ProductSpecifications } from "@/components/admin/ProductSpecifications";
import { ProductReview } from "./ProductReview";
import { CompareSection } from "./CompareSection";
import { Button } from "@/components/ui/button";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";

interface ProductContentProps {
  product: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
  activeSection: string;
}

export function ProductContent({ product, type }: ProductContentProps) {
  const isLaptop = type === 'laptop';

  return (
    <div className="flex-1 space-y-16">
      {/* Overview Section */}
      <section id="overview" className="scroll-mt-24">
        <div className="space-y-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">By {product.brand}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                ₹{product.price.toLocaleString()}
                <span className="text-sm text-muted-foreground ml-2">(onwards)</span>
              </div>
              <Button>Compare</Button>
            </div>

            <div className="prose max-w-none">
              <h2>Key Features</h2>
              <ul>
                <li>Display: {product.display_specs}</li>
                <li>Processor: {product.processor}</li>
                <li>RAM: {product.ram}</li>
                <li>Storage: {product.storage}</li>
                {isLaptop ? (
                  <li>Graphics: {(product as LaptopProduct).graphics}</li>
                ) : (
                  <li>Camera: {(product as MobileProduct).camera}</li>
                )}
                <li>Battery: {product.battery}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specifications" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Detailed Specifications</h2>
        <ProductSpecifications product={product} />
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Product Features</h2>
        <div className="grid gap-4">
          {isLaptop ? (
            <>
              <div className="space-y-2">
                <h3 className="font-semibold">Performance</h3>
                <p>Powered by {product.processor} with {product.ram} RAM</p>
                <p>Graphics: {(product as LaptopProduct).graphics}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Display</h3>
                <p>{product.display_specs}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Storage</h3>
                <p>{product.storage}</p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="font-semibold">Camera System</h3>
                <p>{(product as MobileProduct).camera}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Display</h3>
                <p>{product.display_specs}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Performance</h3>
                <p>Processor: {product.processor}</p>
                <p>RAM: {product.ram}</p>
                <p>Storage: {product.storage}</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Product Reviews</h2>
        <ProductReview productName={product.name} />
      </section>

      {/* Compare Section */}
      <section id="compare" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Compare Products</h2>
        <CompareSection currentProduct={product} type={type} />
      </section>
    </div>
  );
}