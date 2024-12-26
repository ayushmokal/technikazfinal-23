import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Camera,
  Smartphone,
  Battery,
  Cpu,
} from "lucide-react";

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
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg border">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className="w-20 h-20 flex-shrink-0 rounded-lg border overflow-hidden"
                >
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

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

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Key Specs</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center">
                  <Smartphone className="h-8 w-8 mb-2" />
                  <span className="text-sm">{product.screen_size}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Camera className="h-8 w-8 mb-2" />
                  <span className="text-sm">{product.camera}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Cpu className="h-8 w-8 mb-2" />
                  <span className="text-sm">{product.processor}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Battery className="h-8 w-8 mb-2" />
                  <span className="text-sm">{product.battery}</span>
                </div>
              </div>
            </div>

            <Separator />

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

              <TabsContent value="overview" className="space-y-4">
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">SAMSUNG {product.name} REVIEW</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-600">PROS</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>All-in productivity features</li>
                        <li>Good performance & battery life</li>
                        <li>Good display & cameras</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600">CONS</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>All-in productivity features</li>
                        <li>Good performance & battery life</li>
                        <li>Good display & cameras</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specs">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Key Specs</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">RAM</span>
                          <span>{product.ram}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Processor</span>
                          <span>{product.processor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Storage</span>
                          <span>{product.storage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Battery</span>
                          <span>{product.battery}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Display</span>
                          <span>{product.display_specs}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2">General</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Operating System</span>
                          <span>{product.os}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Chipset</span>
                          <span>{product.chipset}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2">Display</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Screen Size</span>
                          <span>{product.screen_size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Resolution</span>
                          <span>{product.resolution}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Other tab contents can be implemented similarly */}
            </Tabs>
          </div>
        </div>

        {/* Compare Section */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Compare Suggested Mobiles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="bg-white p-2 rounded-lg shadow">
                <img
                  src="/placeholder.svg"
                  alt="Compare product"
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <Button variant="outline" className="w-full">Compare</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
