import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CompareSearchBar } from "@/components/product/CompareSearchBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MobileProduct, LaptopProduct } from "@/types/product";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ComparisonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const initialProduct = location.state?.product as MobileProduct | LaptopProduct;
  const type = location.state?.type as 'mobile' | 'laptop';

  const [products, setProducts] = useState<(MobileProduct | LaptopProduct)[]>(
    initialProduct ? [initialProduct] : []
  );

  if (!initialProduct || !type) {
    navigate('/gadgets');
    return null;
  }

  const handleAddProduct = (product: MobileProduct | LaptopProduct) => {
    if (products.length < 3) {
      setProducts([...products, product]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <Layout>
      <div className="container mx-auto py-2 px-3 md:py-8 md:px-8">
        <Button
          variant="ghost"
          className="mb-3 md:mb-6 gap-2 text-sm md:text-base"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Product
        </Button>

        <div className="bg-white rounded-lg p-3 md:p-8 border">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-4 gap-6'} mb-4 md:mb-8`}>
            <div className="font-semibold text-base md:text-lg">Specifications</div>
            <div className="space-y-3 md:space-y-4">
              <h3 className="font-semibold text-base md:text-lg">{initialProduct.name}</h3>
              {initialProduct.image_url && (
                <div className="w-full h-24 md:h-32 flex items-center justify-center">
                  <img
                    src={initialProduct.image_url}
                    alt={initialProduct.name}
                    className="max-h-full object-contain"
                  />
                </div>
              )}
            </div>
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="w-full">
                {products[index + 1] ? (
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm md:text-base">{products[index + 1].name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs md:text-sm"
                        onClick={() => handleRemoveProduct(products[index + 1].id)}
                      >
                        Remove
                      </Button>
                    </div>
                    {products[index + 1].image_url && (
                      <div className="w-full h-24 md:h-32 flex items-center justify-center">
                        <img
                          src={products[index + 1].image_url}
                          alt={products[index + 1].name}
                          className="max-h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <CompareSearchBar
                    type={type}
                    onProductSelect={handleAddProduct}
                    currentProductId={initialProduct.id}
                  />
                )}
              </div>
            ))}
          </div>

          <ComparisonTable
            selectedProducts={products}
            currentProduct={products[0]}
            type={type}
            onRemove={handleRemoveProduct}
          />
        </div>
      </div>
    </Layout>
  );
}