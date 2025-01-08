import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CompareSearchBar } from "@/components/product/CompareSearchBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MobileProduct, LaptopProduct } from "@/types/product";
import { ComparisonTable } from "@/components/product/ComparisonTable";

export default function ComparisonPage() {
  const location = useLocation();
  const navigate = useNavigate();
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
      <div className="container mx-auto py-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Product
        </Button>

        <div className="bg-white rounded-lg p-8 border">
          <h1 className="text-2xl font-bold mb-8">Product Comparison</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                {products[index] ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{products[index].name}</h3>
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveProduct(products[index].id)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
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