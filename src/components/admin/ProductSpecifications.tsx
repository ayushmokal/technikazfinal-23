import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LaptopProduct, MobileProduct } from "@/types/product";

interface SpecificationItemProps {
  label: string;
  value: string | number | boolean | null | undefined;
}

function SpecificationItem({ label, value }: SpecificationItemProps) {
  if (value === null || value === undefined || value === '') return null;
  
  if (typeof value === 'boolean') {
    return (
      <div className="flex justify-between py-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value ? 'Yes' : 'No'}</span>
      </div>
    );
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
  const filteredSpecs = specs.filter(spec => spec.value !== null && spec.value !== undefined && spec.value !== '');
  
  if (filteredSpecs.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      {filteredSpecs.map((spec, index) => (
        <SpecificationItem key={index} {...spec} />
      ))}
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
  ];

  const displaySpecs = [
    { label: "Display", value: product.display_specs },
    { label: "Resolution", value: isMobile ? (product as MobileProduct).resolution : undefined },
    { label: "Screen Size", value: isMobile ? (product as MobileProduct).screen_size : undefined },
    { label: "Display Type", value: isMobile ? (product as MobileProduct).display_type : undefined },
    { label: "Refresh Rate", value: isMobile ? (product as MobileProduct).refresh_rate : undefined },
  ];

  const performanceSpecs = [
    { label: "Processor", value: product.processor },
    { label: "RAM", value: product.ram },
    { label: "Storage", value: product.storage },
    { label: "Graphics", value: isMobile ? undefined : (product as LaptopProduct).graphics },
    { label: "OS", value: product.os },
  ];

  const mobileSpecs = isMobile ? [
    { label: "Main Camera", value: (product as MobileProduct).camera },
    { label: "Front Camera", value: (product as MobileProduct).front_camera },
    { label: "Battery", value: product.battery },
    { label: "Charging", value: (product as MobileProduct).charging_specs },
  ] : [];

  const additionalSpecs = [
    { label: "Color", value: product.color },
    { label: "Dimensions", value: isMobile ? (product as MobileProduct).dimensions : undefined },
    { label: "Weight", value: isMobile ? (product as MobileProduct).weight : undefined },
    { label: "Build Material", value: isMobile ? (product as MobileProduct).build_material : undefined },
    { label: "Waterproof", value: isMobile ? (product as MobileProduct).waterproof : undefined },
  ];

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <SpecificationSection title="Basic Information" specs={basicSpecs} />
        {basicSpecs.length > 0 && <Separator />}
        
        <SpecificationSection title="Display" specs={displaySpecs} />
        {displaySpecs.length > 0 && <Separator />}
        
        <SpecificationSection title="Performance" specs={performanceSpecs} />
        {performanceSpecs.length > 0 && <Separator />}
        
        {isMobile && (
          <>
            <SpecificationSection title="Mobile Features" specs={mobileSpecs} />
            {mobileSpecs.length > 0 && <Separator />}
          </>
        )}
        
        <SpecificationSection title="Additional Information" specs={additionalSpecs} />
      </CardContent>
    </Card>
  );
}