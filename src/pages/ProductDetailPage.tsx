import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductKeyFeatures } from "@/components/product/ProductKeyFeatures";
import { ProductReviewSection } from "@/components/product/ProductReviewSection";
import { CompareSection } from "@/components/product/CompareSection";

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data: product } = useQuery({
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

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          Loading...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Product Images */}
          <ProductImageGallery 
            mainImage={product.image_url || "/placeholder.svg"}
            productName={product.name}
          />

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">Released January 2024</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                ₹{product.price.toLocaleString()}
                <span className="text-sm text-muted-foreground ml-2">(onwards)</span>
              </div>
              <Button>Compare</Button>
            </div>

            <ProductKeyFeatures
              screenSize={product.screen_size}
              camera={product.camera}
              processor={product.processor}
              battery={product.battery}
            />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="prices">Prices</TabsTrigger>
                <TabsTrigger value="expert">Expert Review</TabsTrigger>
                <TabsTrigger value="specs">Full Specification</TabsTrigger>
                <TabsTrigger value="compare">Comparison</TabsTrigger>
                <TabsTrigger value="comments">User Comments</TabsTrigger>
                <TabsTrigger value="pictures">Pictures</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <ProductReviewSection productName={product.name} />
              </TabsContent>

              <TabsContent value="specs">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Key Specs</h3>
                      <div className="space-y-2">
                        {Object.entries({
                          RAM: product.ram,
                          Processor: product.processor,
                          Storage: product.storage,
                          Battery: product.battery,
                          Display: product.display_specs,
                          Camera: product.camera,
                          OS: product.os,
                          Chipset: product.chipset,
                          "Screen Size": product.screen_size,
                          Resolution: product.resolution,
                          Color: product.color,
                        }).map(([key, value]) => value && (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground">{key}</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <CompareSection 
          similarProducts={Array(4).fill({
            id: '1',
            name: 'Similar Product',
            image_url: product.image_url,
          })}
        />
      </div>
    </Layout>
  );
}