import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { ProductSpecTable } from "@/components/product/ProductSpecTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";

export default function ProductSpecificationsPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as 'mobile' | 'laptop' || 'mobile';
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id, type],
    queryFn: async () => {
      if (!id) {
        throw new Error('Product ID is required');
      }

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
          description: "Failed to load product specifications",
        });
        throw error;
      }

      if (!data) {
        toast({
          variant: "destructive",
          title: "Not Found",
          description: "Product specifications not found",
        });
        navigate('/gadgets');
        return null;
      }

      return data as LaptopProduct | MobileProduct;
    },
    enabled: !!id,
  });

  if (isLoading || !product) {
    return (
      <Layout>
        <div className="container mx-auto py-8">Loading...</div>
      </Layout>
    );
  }

  const specifications = type === 'mobile' ? [
    {
      title: "General",
      specs: [
        { label: "Brand", value: product.brand },
        { label: "Model", value: product.name },
        { label: "Price", value: `₹${product.price.toLocaleString()}` },
        { label: "Color", value: product.color },
      ],
    },
    {
      title: "Display",
      specs: [
        { label: "Display", value: product.display_specs },
        { label: "Resolution", value: (product as MobileProduct).resolution },
        { label: "Screen Size", value: (product as MobileProduct).screen_size },
      ],
    },
    {
      title: "Performance",
      specs: [
        { label: "Processor", value: product.processor },
        { label: "RAM", value: product.ram },
        { label: "Storage", value: product.storage },
        { label: "Chipset", value: (product as MobileProduct).chipset },
        { label: "Operating System", value: product.os },
      ],
    },
    {
      title: "Camera",
      specs: [
        { label: "Camera Setup", value: (product as MobileProduct).camera },
      ],
    },
    {
      title: "Battery & Charging",
      specs: [
        { label: "Battery", value: product.battery },
        { label: "Charging", value: (product as MobileProduct).charging_specs },
      ],
    },
  ] : [
    {
      title: "General",
      specs: [
        { label: "Brand", value: product.brand },
        { label: "Model", value: product.name },
        { label: "Price", value: `₹${product.price.toLocaleString()}` },
        { label: "Color", value: product.color },
      ],
    },
    {
      title: "Display",
      specs: [
        { label: "Display", value: product.display_specs },
      ],
    },
    {
      title: "Performance",
      specs: [
        { label: "Processor", value: product.processor },
        { label: "RAM", value: product.ram },
        { label: "Storage", value: product.storage },
        { label: "Graphics", value: (product as LaptopProduct).graphics },
        { label: "Operating System", value: product.os },
      ],
    },
    {
      title: "Ports & Connectivity",
      specs: [
        { label: "Ports", value: (product as LaptopProduct).ports },
      ],
    },
    {
      title: "Battery",
      specs: [
        { label: "Battery", value: product.battery },
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground">Full Specifications</p>
        </div>
        <ProductSpecTable specifications={specifications} />
      </div>
    </Layout>
  );
}