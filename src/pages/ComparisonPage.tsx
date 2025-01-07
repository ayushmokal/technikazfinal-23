import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MobileProduct, LaptopProduct } from "@/types/product";
import { useEffect } from "react";

export default function ComparisonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    products: (MobileProduct | LaptopProduct)[];
    type: 'mobile' | 'laptop';
  } | null;

  useEffect(() => {
    if (!state?.products) {
      navigate('/gadgets');
    }
  }, [state, navigate]);

  if (!state?.products) {
    return null;
  }

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
            selectedProducts={state.products}
            currentProduct={state.products[0]}
            type={state.type}
            onRemove={() => {}}
          />
        </div>
      </div>
    </Layout>
  );
}