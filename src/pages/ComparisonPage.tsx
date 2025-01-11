import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CompareSearchBar } from "@/components/product/CompareSearchBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
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
          <div className="flex flex-col space-y-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold">Compare Products</h1>
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-8'} items-center`}>
              {products.map((product, index) => (
                <div key={product.id} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -top-2 -right-2 p-1 h-8 w-8 rounded-full bg-gray-100"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex flex-col items-center space-y-2">
                    {product.image_url && (
                      <div className="w-full h-40 md:h-48 flex items-center justify-center">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="max-h-full object-contain"
                        />
                      </div>
                    )}
                    <h3 className="font-medium text-sm md:text-base text-center">{product.name}</h3>
                    <p className="text-lg md:text-xl font-semibold">₹{product.price.toLocaleString()}</p>
                  </div>
                  {index < products.length - 1 && (
                    <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 hidden md:block">
                      <span className="bg-black text-white text-xs px-2 py-1 rounded-full">VS</span>
                    </div>
                  )}
                </div>
              ))}
              {products.length < 3 && (
                <div className="w-full">
                  <CompareSearchBar
                    type={type}
                    onProductSelect={handleAddProduct}
                    currentProductId={initialProduct.id}
                  />
                </div>
              )}
            </div>
          </div>

          {products.length > 1 && (
            <ComparisonTable
              selectedProducts={products}
              currentProduct={products[0]}
              type={type}
              onRemove={handleRemoveProduct}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}