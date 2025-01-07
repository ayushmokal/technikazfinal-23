import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { LaptopProduct, MobileProduct } from "./ProductDetailPage";

interface SpecificationItemProps {
  label: string;
  value: string | number;
  image?: string;
}

function SpecificationItem({ label, value, image }: SpecificationItemProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-right">{value}</span>
      </div>
      {image && (
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img src={image} alt={`${label} illustration`} className="rounded-md object-cover" />
        </AspectRatio>
      )}
    </div>
  );
}

interface SpecificationSectionProps {
  title: string;
  specs: SpecificationItemProps[];
}

function SpecificationSection({ title, specs }: SpecificationSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="space-y-6">
        {specs.map((spec, index) => (
          <SpecificationItem key={index} {...spec} />
        ))}
      </div>
      <Separator className="my-6" />
    </div>
  );
}

export default function ProductFullSpecsPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = new URLSearchParams(window.location.search);
  const type = searchParams.get('type') as 'mobile' | 'laptop' || 'mobile';

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id, type],
    queryFn: async () => {
      const tableName = type === 'laptop' ? 'laptops' : 'mobile_products';
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
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

  const isMobile = 'camera' in product;

  const basicSpecs = [
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.name },
    { label: "Price", value: `₹${product.price.toLocaleString()}` },
  ];

  const displaySpecs = [
    { label: "Display", value: product.display_specs },
    ...(isMobile ? [
      { label: "Resolution", value: (product as MobileProduct).resolution || 'N/A' },
      { label: "Screen Size", value: (product as MobileProduct).screen_size || 'N/A' },
    ] : []),
  ];

  const performanceSpecs = [
    { label: "Processor", value: product.processor },
    { label: "RAM", value: product.ram },
    { label: "Storage", value: product.storage },
    ...(isMobile ? [
      { label: "Chipset", value: (product as MobileProduct).chipset || 'N/A' },
    ] : [
      { label: "Graphics", value: (product as LaptopProduct).graphics || 'N/A' },
    ]),
  ];

  const cameraSpecs = isMobile ? [
    { 
      label: "Main Camera", 
      value: (product as MobileProduct).camera,
      image: product.image_url || undefined
    },
  ] : [];

  const otherSpecs = [
    { label: "Battery", value: product.battery },
    { label: "Operating System", value: product.os || 'N/A' },
    { label: "Color", value: product.color || 'N/A' },
    ...(isMobile ? [
      { label: "Charging", value: (product as MobileProduct).charging_specs || 'N/A' },
    ] : [
      { label: "Ports", value: (product as LaptopProduct).ports || 'N/A' },
    ]),
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Full Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <SpecificationSection title="Basic Information" specs={basicSpecs} />
            <SpecificationSection title="Display" specs={displaySpecs} />
            <SpecificationSection title="Performance" specs={performanceSpecs} />
            {isMobile && cameraSpecs.length > 0 && (
              <SpecificationSection title="Camera" specs={cameraSpecs} />
            )}
            <SpecificationSection title="Other Specifications" specs={otherSpecs} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}