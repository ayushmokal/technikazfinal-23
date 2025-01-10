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

interface ProductSpecificationsProps {
  product: LaptopProduct | MobileProduct;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const isMobile = 'camera' in product;

  const basicSpecs = [
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.model_name },
    { label: "Price", value: `$${product.price}` },
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
    { label: "Camera", value: (product as MobileProduct).camera },
    { label: "Front Camera", value: (product as MobileProduct).front_camera },
    { label: "Battery", value: product.battery },
    { label: "Charging", value: (product as MobileProduct).charging_specs },
    { label: "Network", value: (product as MobileProduct).network_technology },
  ] : [];

  const laptopSpecs = !isMobile ? [
    { label: "Battery", value: product.battery },
    { label: "Ports", value: (product as LaptopProduct).ports },
  ] : [];

  const additionalSpecs = isMobile ? [
    { label: "Dimensions", value: (product as MobileProduct).dimensions },
    { label: "Weight", value: (product as MobileProduct).weight },
    { label: "Build Material", value: (product as MobileProduct).build_material },
    { label: "Waterproof", value: (product as MobileProduct).waterproof },
    { label: "Color", value: product.color },
  ] : [
    { label: "Color", value: product.color },
  ];

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Basic Information</h3>
          {basicSpecs.map((spec, index) => (
            <SpecificationItem key={index} {...spec} />
          ))}
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Display</h3>
          {displaySpecs.map((spec, index) => (
            <SpecificationItem key={index} {...spec} />
          ))}
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Performance</h3>
          {performanceSpecs.map((spec, index) => (
            <SpecificationItem key={index} {...spec} />
          ))}
        </div>
        
        {isMobile && mobileSpecs.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Mobile Features</h3>
              {mobileSpecs.map((spec, index) => (
                <SpecificationItem key={index} {...spec} />
              ))}
            </div>
          </>
        )}
        
        {!isMobile && laptopSpecs.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Laptop Features</h3>
              {laptopSpecs.map((spec, index) => (
                <SpecificationItem key={index} {...spec} />
              ))}
            </div>
          </>
        )}
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Additional Information</h3>
          {additionalSpecs.map((spec, index) => (
            <SpecificationItem key={index} {...spec} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}