import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LaptopProduct, MobileProduct } from "@/types/product";

interface SpecificationItemProps {
  label: string;
  value: string | number | boolean | null | undefined;
}

function SpecificationItem({ label, value }: SpecificationItemProps) {
  if (value === null || value === undefined) return null;
  
  // Handle boolean values
  if (typeof value === 'boolean') {
    value = value ? 'Yes' : 'No';
  }
  
  return (
    <div className="flex justify-between py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

interface SpecificationSectionProps {
  title: string;
  specs: { label: string; value: string | number | boolean | null | undefined }[];
}

function SpecificationSection({ title, specs }: SpecificationSectionProps) {
  const validSpecs = specs.filter(spec => spec.value != null);
  
  if (validSpecs.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      {validSpecs.map((spec, index) => (
        <SpecificationItem key={index} {...spec} />
      ))}
      <Separator className="my-4" />
    </div>
  );
}

interface ProductSpecificationsProps {
  product: LaptopProduct | MobileProduct;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const isMobile = 'camera' in product;

  const basicSpecs = [
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.model_name },
    { label: "Price", value: `₹${product.price.toLocaleString()}` },
    { label: "Color", value: product.color },
  ];

  const displaySpecs = [
    { label: "Display", value: product.display_specs },
    { label: "Resolution", value: (product as MobileProduct).resolution },
    { label: "Screen Size", value: (product as MobileProduct).screen_size },
    { label: "Display Type", value: (product as MobileProduct).display_type },
    { label: "Refresh Rate", value: (product as MobileProduct).refresh_rate },
  ];

  const performanceSpecs = [
    { label: "Processor", value: product.processor },
    { label: "RAM", value: product.ram },
    { label: "Storage", value: product.storage },
    { label: "OS", value: product.os },
  ];

  const mobileSpecs = isMobile ? [
    { label: "Camera", value: (product as MobileProduct).camera },
    { label: "Front Camera", value: (product as MobileProduct).front_camera },
    { label: "Battery", value: product.battery },
    { label: "Charging", value: (product as MobileProduct).charging_specs },
    { label: "Network", value: (product as MobileProduct).network_technology },
  ] : [];

  const laptopSpecs = !isMobile ? [
    { label: "Graphics", value: (product as LaptopProduct).graphics },
    { label: "Ports", value: (product as LaptopProduct).ports },
    { label: "Battery", value: product.battery },
  ] : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SpecificationSection title="Basic Information" specs={basicSpecs} />
        <SpecificationSection title="Display" specs={displaySpecs} />
        <SpecificationSection title="Performance" specs={performanceSpecs} />
        {isMobile && <SpecificationSection title="Mobile Features" specs={mobileSpecs} />}
        {!isMobile && <SpecificationSection title="Laptop Features" specs={laptopSpecs} />}
      </CardContent>
    </Card>
  );
}