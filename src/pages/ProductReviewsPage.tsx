import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";

export default function ProductReviewsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: product } = useQuery({
    queryKey: ['product-details', id],
    queryFn: async () => {
      // Try mobile products first
      let { data: mobileProduct } = await supabase
        .from('mobile_products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (mobileProduct) return mobileProduct;

      // If not found, try laptops
      const { data: laptopProduct } = await supabase
        .from('laptops')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      return laptopProduct;
    }
  });

  const { data: reviews } = useQuery({
    queryKey: ['product-reviews', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', id)
        .order('created_at', { ascending: false });
      return data;
    }
  });

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-8">Loading...</div>
      </Layout>
    );
  }

  const keywordSummary = {
    pros: [
      "Display Quality",
      "Performance",
      "Battery Life",
      "Camera System",
      "Build Quality"
    ]
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">{product.name} - User Reviews</h1>
        
        {/* Keyword Summary */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Key Highlights</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-green-600 mb-2">Most Mentioned Pros</h3>
              <div className="flex flex-wrap gap-2">
                {keywordSummary.pros.map((keyword, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">All Reviews</h2>
          {reviews?.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">{review.user_name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-xl font-bold">{review.rating}/5</div>
              </div>
              <p className="text-gray-700">{review.review_text}</p>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}