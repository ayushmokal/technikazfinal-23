import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MobileProduct, LaptopProduct } from "@/types/product";

export default function ComparisonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProducts, type, currentProduct } = location.state as {
    selectedProducts: (MobileProduct | LaptopProduct)[];
    type: 'mobile' | 'laptop';
    currentProduct: MobileProduct | LaptopProduct;
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Button>
        </div>

        <div className="bg-white rounded-lg p-8 border">
          <h1 className="text-2xl font-bold mb-8">Product Comparison</h1>
          <ComparisonTable
            selectedProducts={selectedProducts}
            currentProduct={currentProduct}
            type={type}
            onRemove={() => {}}
          />
        </div>
      </div>
    </Layout>
  );
}