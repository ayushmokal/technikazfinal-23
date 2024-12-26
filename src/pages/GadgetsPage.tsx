import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GadgetsPage() {
  const [activeTab, setActiveTab] = useState("mobiles");

  // Query for mobile products
  const { data: mobileProducts = [] } = useQuery({
    queryKey: ['mobile-products'],
    queryFn: async () => {
      console.log('Fetching mobile products');
      const { data, error } = await supabase
        .from('mobile_products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching mobile products:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Query for laptops
  const { data: laptops = [] } = useQuery({
    queryKey: ['laptops'],
    queryFn: async () => {
      console.log('Fetching laptops');
      const { data, error } = await supabase
        .from('laptops')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching laptops:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Gadgets</h1>

        <Tabs defaultValue="mobiles" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mobiles">Mobile Phones</TabsTrigger>
            <TabsTrigger value="laptops">Laptops</TabsTrigger>
          </TabsList>

          <TabsContent value="mobiles" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mobileProducts.map((product) => (
                <Link to={`/product/${product.id}?type=mobile`} key={product.id}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="w-full h-48 relative mb-4">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>
                        {product.brand} {product.model_name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p><strong>Price:</strong> ₹{product.price.toLocaleString()}</p>
                        <p><strong>Display:</strong> {product.display_specs}</p>
                        <p><strong>Processor:</strong> {product.processor}</p>
                        <p><strong>RAM:</strong> {product.ram}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="laptops" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {laptops.map((laptop) => (
                <Link to={`/product/${laptop.id}?type=laptop`} key={laptop.id}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="w-full h-48 relative mb-4">
                        <img
                          src={laptop.image_url || "/placeholder.svg"}
                          alt={laptop.name}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      <CardTitle>{laptop.name}</CardTitle>
                      <CardDescription>
                        {laptop.brand} {laptop.model_name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[200px] rounded-md border p-4">
                        <div className="space-y-2">
                          <p><strong>Price:</strong> ₹{laptop.price.toLocaleString()}</p>
                          <p><strong>Display:</strong> {laptop.display_specs}</p>
                          <p><strong>Processor:</strong> {laptop.processor}</p>
                          <p><strong>Graphics:</strong> {laptop.graphics}</p>
                          <p><strong>RAM:</strong> {laptop.ram}</p>
                          <p><strong>Storage:</strong> {laptop.storage}</p>
                          <p><strong>Battery:</strong> {laptop.battery}</p>
                          <p><strong>OS:</strong> {laptop.os}</p>
                          <p><strong>Ports:</strong> {laptop.ports}</p>
                          <p><strong>Color:</strong> {laptop.color}</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}