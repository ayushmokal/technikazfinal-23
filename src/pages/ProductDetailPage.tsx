import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductKeySpecs } from "@/components/product/ProductKeySpecs";
import { ProductContent } from "@/components/product/ProductContent";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

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

  if (isLoading || !product) {
    return (
      <Layout>
        <div className="container mx-auto py-8">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          {/* Left Sidebar */}
          <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
            <nav className="space-y-2">
              {['Overview', 'Pictures', 'Expert Review', 'Full Specification', 'Comparison', 'User Comments'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block px-4 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProductGallery mainImage={product.image_url} productName={product.name} />
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold">{product.name}</h1>
                  <p className="text-muted-foreground">By {product.brand}</p>
                </div>
                <ProductKeySpecs
                  type={type}
                  screenSize={type === 'mobile' ? product.screen_size : undefined}
                  camera={type === 'mobile' ? (product as MobileProduct).camera : undefined}
                  processor={product.processor}
                  battery={product.battery}
                  graphics={type === 'laptop' ? (product as LaptopProduct).graphics : undefined}
                />
              </div>
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