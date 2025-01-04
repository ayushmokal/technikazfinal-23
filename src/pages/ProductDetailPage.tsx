import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductKeySpecs } from "@/components/product/ProductKeySpecs";
import { ProductContent } from "@/components/product/ProductContent";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export type ProductType = 'mobile' | 'laptop';

export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string | null;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  os: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
}

export interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
  model_name: string | null;
}

export interface MobileProduct extends BaseProduct {
  camera: string;
  chipset: string | null;
  charging_specs: string | null;
  resolution: string | null;
  screen_size: string | null;
  model_name: string | null;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as ProductType || 'mobile';
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id, type],
    queryFn: async () => {
      const tableName = type === 'laptop' ? 'laptops' : 'mobile_products';
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product details",
        });
        throw error;
      }

      if (!data) {
        toast({
          variant: "destructive",
          title: "Not Found",
          description: "Product not found",
        });
        return null;
      }

      return data as LaptopProduct | MobileProduct;
    },
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading || !product) {
    return (
      <Layout>
        <div className="container mx-auto py-8">Loading...</div>
      </Layout>
    );
  }

  const isMobileProduct = (product: LaptopProduct | MobileProduct): product is MobileProduct => {
    return 'screen_size' in product;
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Left Sidebar with Image and Navigation */}
          <div className="space-y-6">
            <ProductGallery mainImage={product.image_url} productName={product.name} />
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => scrollToSection('overview')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
                >
                  Overview
                </button>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary rounded-md transition-colors">
                      Pictures
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      {/* Add more images here when available */}
                    </div>
                  </DialogContent>
                </Dialog>
                <button
                  onClick={() => scrollToSection('specifications')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
                >
                  Full Specification
                </button>
                {['Expert Review', 'Comparison', 'User Comments'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </ScrollArea>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div className="flex flex-col space-y-6">
              {/* Header Section */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Released January 2024</span>
                    </div>
                    <span>About {product.brand}</span>
                  </div>
                </div>
                <Button>Compare</Button>
              </div>

              {/* Price and Variants Section */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">(onwards)</span>
                  </div>
                  <a href="#" className="text-sm text-primary hover:underline">
                    See All Variants
                  </a>
                </div>
                <div className="flex gap-4">
                  <select className="px-4 py-2 border rounded-md">
                    <option>256 GB Storage</option>
                    <option>512 GB Storage</option>
                  </select>
                  <select className="px-4 py-2 border rounded-md">
                    <option>Any Colour</option>
                    <option>Black</option>
                    <option>Gold</option>
                  </select>
                </div>
              </div>

              <ProductKeySpecs
                type={type}
                screenSize={isMobileProduct(product) ? product.screen_size : undefined}
                camera={isMobileProduct(product) ? product.camera : undefined}
                processor={product.processor}
                battery={product.battery}
                graphics={!isMobileProduct(product) ? product.graphics : undefined}
              />
            </div>

            <Separator />

            <ProductContent
              product={product}
              type={type}
              activeSection="overview"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
