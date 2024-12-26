import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProductKeySpecs } from "./ProductKeySpecs";
import { ProductSpecTable } from "./ProductSpecTable";
import { ProductReview } from "./ProductReview";
import { CompareSection } from "./CompareSection";
import { Button } from "@/components/ui/button";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";

interface ProductContentProps {
  product: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
  specifications: Array<{
    title: string;
    specs: Array<{ label: string; value: string | null | undefined }>;
  }>;
}

export function ProductContent({ product, type, specifications }: ProductContentProps) {
  const isLaptop = type === 'laptop';

  return (
    <div className="flex-1 space-y-6">
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

      <ProductKeySpecs
        type={type}
        screenSize={isLaptop ? undefined : (product as MobileProduct).screen_size}
        camera={isLaptop ? undefined : (product as MobileProduct).camera}
        processor={product.processor}
        battery={product.battery}
        graphics={isLaptop ? (product as LaptopProduct).graphics : undefined}
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsContent value="overview">
          <ProductReview productName={product.name} />
        </TabsContent>

        <TabsContent value="specs">
          <ProductSpecTable specifications={specifications} />
        </TabsContent>

        <TabsContent value="compare">
          <div className="text-center text-muted-foreground py-8">
            Select products to compare
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="text-center text-muted-foreground py-8">
            No reviews yet
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}