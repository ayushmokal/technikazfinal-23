import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductKeySpecs } from "@/components/product/ProductKeySpecs";
import { ProductReview } from "@/components/product/ProductReview";
import { ProductSpecTable } from "@/components/product/ProductSpecTable";
import { CompareSection } from "@/components/product/CompareSection";

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mobile_products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading || !product) {
    return (
      <Layout>
        <div className="container mx-auto py-8">Loading...</div>
      </Layout>
    );
  }

  const specifications = [
    {
      title: "Key Specs",
      specs: [
        { label: "RAM", value: product.ram },
        { label: "Processor", value: product.processor },
        { label: "Storage", value: product.storage },
        { label: "Battery", value: product.battery },
        { label: "Display", value: product.display_specs },
      ],
    },
    {
      title: "General",
      specs: [
        { label: "Operating System", value: product.os },
        { label: "Chipset", value: product.chipset },
      ],
    },
    {
      title: "Display",
      specs: [
        { label: "Screen Size", value: product.screen_size },
        { label: "Resolution", value: product.resolution },
      ],
    },
  ];

  const suggestedProducts = [
    { id: "1", name: "Product 1", image: "/placeholder.svg" },
    { id: "2", name: "Product 2", image: "/placeholder.svg" },
    { id: "3", name: "Product 3", image: "/placeholder.svg" },
    { id: "4", name: "Product 4", image: "/placeholder.svg" },
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductGallery mainImage={product.image_url} productName={product.name} />

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

            <ProductKeySpecs
              screenSize={product.screen_size}
              camera={product.camera}
              processor={product.processor}
              battery={product.battery}
            />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="compare">Compare</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

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
        </div>

        <CompareSection suggestedProducts={suggestedProducts} />
      </div>
    </Layout>
  );
}