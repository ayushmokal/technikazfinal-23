import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ProductSpecTable } from "@/components/product/ProductSpecTable";
import type { LaptopProduct, MobileProduct } from "./ProductDetailPage";

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

  const specifications = isMobile ? [
    {
      title: "General Information",
      specs: [
        { label: "Brand", value: product.brand },
        { label: "Model", value: product.name },
        { label: "Price", value: `₹${product.price.toLocaleString()}` },
        ...(product.general_specs ? Object.entries(product.general_specs).map(([key, value]) => ({
          label: key,
          value: value as string
        })) : [])
      ]
    },
    {
      title: "Display",
      specs: [
        { label: "Display Specifications", value: product.display_specs },
        { label: "Resolution", value: product.resolution },
        { label: "Screen Size", value: product.screen_size },
        ...(product.display_details ? Object.entries(product.display_details).map(([key, value]) => ({
          label: key,
          value: value as string
        })) : [])
      ]
    },
    {
      title: "Camera",
      specs: [
        { 
          label: "Camera Setup", 
          value: product.camera,
          image: product.image_url
        },
        ...(product.camera_details ? Object.entries(product.camera_details).map(([key, value]) => ({
          label: key,
          value: value as string
        })) : [])
      ]
    },
    {
      title: "Performance",
      specs: [
        { label: "Processor", value: product.processor },
        { label: "RAM", value: product.ram },
        { label: "Storage", value: product.storage },
        { label: "Chipset", value: product.chipset },
        ...(product.performance_specs ? Object.entries(product.performance_specs).map(([key, value]) => ({
          label: key,
          value: value as string
        })) : [])
      ]
    },
    {
      title: "Battery & Charging",
      specs: [
        { label: "Battery", value: product.battery },
        { label: "Charging", value: product.charging_specs }
      ]
    },
    {
      title: "Design",
      specs: [
        { label: "Color", value: product.color },
        ...(product.design_specs ? Object.entries(product.design_specs).map(([key, value]) => ({
          label: key,
          value: value as string
        })) : [])
      ]
    },
    {
      title: "Multimedia",
      specs: product.multimedia_specs ? Object.entries(product.multimedia_specs).map(([key, value]) => ({
        label: key,
        value: value as string
      })) : []
    },
    {
      title: "Sensors",
      specs: product.sensor_specs ? Object.entries(product.sensor_specs).map(([key, value]) => ({
        label: key,
        value: value as string
      })) : []
    },
    {
      title: "Network",
      specs: product.network_specs ? Object.entries(product.network_specs).map(([key, value]) => ({
        label: key,
        value: value as string
      })) : []
    }
  ] : [
    {
      title: "General Information",
      specs: [
        { label: "Brand", value: product.brand },
        { label: "Model", value: product.name },
        { label: "Price", value: `₹${product.price.toLocaleString()}` }
      ]
    },
    {
      title: "Display",
      specs: [
        { label: "Display", value: product.display_specs },
        ...(product.display_details ? Object.entries(product.display_details).map(([key, value]) => ({
          label: key,
          value: value as string
        })) : [])
      ]
    },
    {
      title: "Performance",
      specs: [
        { label: "Processor", value: product.processor },
        { label: "RAM", value: product.ram },
        { label: "Storage", value: product.storage },
        { label: "Graphics", value: product.graphics },
        ...(product.performance_specs ? Object.entries(product.performance_specs).map(([key, value]) => ({
          label: key,
          value: value as string
        })) : [])
      ]
    },
    {
      title: "Design & Ports",
      specs: [
        { label: "Color", value: product.color },
        { label: "Ports", value: product.ports },
        ...(product.design_specs ? Object.entries(product.design_specs).map(([key, value]) => ({
          label: key,
          value: value as string
        })) : [])
      ]
    },
    {
      title: "Battery & Power",
      specs: [
        { label: "Battery", value: product.battery }
      ]
    },
    {
      title: "Multimedia",
      specs: product.multimedia_specs ? Object.entries(product.multimedia_specs).map(([key, value]) => ({
        label: key,
        value: value as string
      })) : []
    },
    {
      title: "Connectivity",
      specs: product.connectivity_specs ? Object.entries(product.connectivity_specs).map(([key, value]) => ({
        label: key,
        value: value as string
      })) : []
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Full Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {specifications.map((section, index) => (
              section.specs.length > 0 && (
                <div key={index}>
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  <ProductSpecTable specifications={[section]} />
                  {index < specifications.length - 1 && <Separator className="my-6" />}
                </div>
              )
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}