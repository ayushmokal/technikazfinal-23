import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductKeySpecs } from "@/components/product/ProductKeySpecs";
import { ProductContent } from "@/components/product/ProductContent";
import { ProductHeader } from "@/components/product/ProductHeader";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const images = [
    product?.image_url || "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
          <div className="space-y-6">
            <ProductGallery mainImage={product.image_url} productName={product.name} />
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => {
                    scrollToSection('overview');
                    setActiveSection('overview');
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm font-bold hover:bg-secondary rounded-md transition-colors ${
                    activeSection === 'overview' ? 'text-primary underline' : ''
                  }`}
                >
                  Overview
                </button>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="block w-full text-left px-4 py-2 text-sm font-bold hover:bg-secondary rounded-md transition-colors">
                      Pictures
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 gap-0">
                    <div className="relative">
                      <div className="flex items-center">
                        <button
                          onClick={previousImage}
                          className="absolute left-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white/90 transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <div className="w-full overflow-hidden">
                          <div 
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                          >
                            {images.map((image, index) => (
                              <div key={index} className="w-full flex-shrink-0">
                                <img
                                  src={image}
                                  alt={`${product.name} view ${index + 1}`}
                                  className="w-full h-[600px] object-contain"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white/90 transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              currentImageIndex === index ? 'bg-primary' : 'bg-gray-300'
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                {['Specifications', 'Expert Review', 'Comparison', 'User Comments'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(item.toLowerCase().replace(' ', '-'));
                      setActiveSection(item.toLowerCase().replace(' ', '-'));
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm font-bold hover:bg-secondary rounded-md transition-colors ${
                      activeSection === item.toLowerCase().replace(' ', '-') ? 'text-primary underline' : ''
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </ScrollArea>
          </div>

          <div className="space-y-8">
            <ProductHeader product={product} type={type} />
            <ProductKeySpecs
              type={type}
              screenSize={isMobileProduct(product) ? product.screen_size : undefined}
              camera={isMobileProduct(product) ? product.camera : undefined}
              processor={product.processor}
              battery={product.battery}
              graphics={!isMobileProduct(product) ? product.graphics : undefined}
            />
            <Separator />
            <ProductContent
              product={product}
              type={type}
              activeSection={activeSection}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
