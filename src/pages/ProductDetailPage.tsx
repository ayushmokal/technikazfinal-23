import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductKeyFeatures } from "@/components/product/ProductKeyFeatures";
import { ProductReviewSection } from "@/components/product/ProductReviewSection";
import { ProductSpecifications } from "@/components/admin/ProductSpecifications";
import { CompareSection } from "@/components/product/CompareSection";
import { Heart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading product details...</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-8 min-h-screen flex items-center justify-center">
          <div className="text-lg text-red-600">Product not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Left Column - Product Images and Navigation */}
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span>Brand: {product.brand}</span>
                  <span className="text-primary hover:underline cursor-pointer">
                    About {product.brand}
                  </span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className="hover:text-red-500 transition-colors"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <ProductImageGallery 
              mainImage={product.image_url || "/placeholder.svg"} 
              productName={product.name} 
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-600">(onwards)</span>
                  </div>
                  <span className="text-green-600 text-sm">In Stock</span>
                </div>
                <div className="flex gap-4">
                  <Select defaultValue={product.storage || "256gb"}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Storage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="128gb">128 GB Storage</SelectItem>
                      <SelectItem value="256gb">256 GB Storage</SelectItem>
                      <SelectItem value="512gb">512 GB Storage</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue={product.color || "black"}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Key Specifications</h3>
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <div className="text-sm mb-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {product.os || "Android 14"}
                    </span>
                  </div>
                  <ProductKeyFeatures
                    screenSize={product.screen_size}
                    camera={product.camera}
                    processor={product.processor}
                    battery={product.battery}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full" size="lg">
                  Buy Now
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Add to Cart
                </Button>
              </div>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg text-center">
              <span className="text-sm text-gray-600">Advertisement</span>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full grid grid-cols-3 lg:grid-cols-7 gap-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="prices">Prices</TabsTrigger>
                <TabsTrigger value="expert">Expert Review</TabsTrigger>
                <TabsTrigger value="specs" className="hidden lg:block">Specs</TabsTrigger>
                <TabsTrigger value="compare" className="hidden lg:block">Compare</TabsTrigger>
                <TabsTrigger value="comments" className="hidden lg:block">Comments</TabsTrigger>
                <TabsTrigger value="pictures" className="hidden lg:block">Pictures</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <ProductReviewSection productName={product.name} />
                <ProductSpecifications product={product} />
              </TabsContent>

              <TabsContent value="specs">
                <ProductSpecifications product={product} />
              </TabsContent>

              <TabsContent value="compare">
                <CompareSection 
                  similarProducts={Array(4).fill({
                    id: '1',
                    name: 'Similar Product',
                    image_url: product.image_url,
                  })}
                />
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