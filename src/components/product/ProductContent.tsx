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

export function ProductContent({ product, type, activeSection }: ProductContentProps) {
  const isLaptop = type === 'laptop';

  // Mock data for suggested products - this would typically come from your backend
  const suggestedProducts = [
    {
      id: '1',
      name: 'Similar Product 1',
      image: product.image_url || '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Similar Product 2',
      image: product.image_url || '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Similar Product 3',
      image: product.image_url || '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Similar Product 4',
      image: product.image_url || '/placeholder.svg'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
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
        );

      case 'specifications':
        return <ProductSpecifications product={product} />;

      case 'features':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Product Features</h2>
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
          </div>
        );

      case 'reviews':
        return <ProductReview productName={product.name} />;

      case 'compare':
        return <CompareSection suggestedProducts={suggestedProducts} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 space-y-6">
      {renderContent()}
    </div>
  );
}