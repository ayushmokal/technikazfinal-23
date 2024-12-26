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
        <div className="container mx-auto py-8">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Product Images and Navigation */}
          <div className="lg:w-1/2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span>Released January 2024</span>
                  <button className="text-blue-600 hover:underline">About {product.brand}</button>
                </div>
              </div>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <ProductImageGallery mainImage={product.image_url || "/placeholder.svg"} productName={product.name} />
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-600">(onwards)</span>
                </div>
                <button className="text-blue-600 hover:underline text-sm">See All Variants &gt;&gt;</button>
              </div>
              <div className="flex gap-4">
                <Select defaultValue="256gb">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Storage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="128gb">128 GB Storage</SelectItem>
                    <SelectItem value="256gb">256 GB Storage</SelectItem>
                    <SelectItem value="512gb">512 GB Storage</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="any">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Colour</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Specs</h3>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm mb-4">
                  <span className="inline-flex items-center gap-2">
                    <img src="/android-icon.png" alt="Android" className="w-4 h-4" />
                    Android {product.os?.split(' ').pop()}
                  </span>
                </div>
                <ProductKeyFeatures
                  screenSize={product.screen_size}
                  camera={product.camera}
                  processor={product.processor}
                  battery={product.battery}
                />
                <button className="text-blue-600 hover:underline text-sm block mt-4">
                  See Full Specs &gt;&gt;
                </button>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg text-center">
              Mobile Ad Space
            </div>

            <div className="bg-gray-100 p-4 rounded-lg text-center">
              {product.brand} Ad Space
            </div>

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
                <ProductSpecifications product={product} />
              </TabsContent>

              <TabsContent value="specs">
                <ProductSpecifications product={product} />
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