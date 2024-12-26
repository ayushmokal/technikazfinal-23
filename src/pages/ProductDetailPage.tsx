import { useParams, useSearchParams, useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";

type ProductType = 'mobile' | 'laptop';

interface BaseProduct {
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

interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
  model_name: string | null;
}

interface MobileProduct extends BaseProduct {
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
  const navigate = useNavigate();
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
        navigate('/gadgets');
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

  const isLaptop = type === 'laptop';
  const specifications = isLaptop ? [
    {
      title: "Key Specs",
      specs: [
        { label: "RAM", value: product.ram },
        { label: "Processor", value: product.processor },
        { label: "Storage", value: product.storage },
        { label: "Graphics", value: (product as LaptopProduct).graphics },
        { label: "Display", value: product.display_specs },
      ],
    },
    {
      title: "General",
      specs: [
        { label: "Operating System", value: product.os },
        { label: "Ports", value: (product as LaptopProduct).ports },
        { label: "Color", value: product.color },
      ],
    },
  ] : [
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
        { label: "Chipset", value: (product as MobileProduct).chipset },
        { label: "Color", value: product.color },
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
              type={type}
              screenSize={isLaptop ? undefined : (product as MobileProduct).screen_size}
              camera={isLaptop ? undefined : (product as MobileProduct).camera}
              processor={product.processor}
              battery={product.battery}
              graphics={isLaptop ? (product as LaptopProduct).graphics : undefined}
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