import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LaptopProduct, MobileProduct } from "@/types/product";

interface SpecificationItemProps {
  label: string;
  value: string | number | boolean | null | undefined;
}

function SpecificationItem({ label, value }: SpecificationItemProps) {
  if (value === null || value === undefined || value === '') {
    return (
      <div className="flex justify-between py-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-muted-foreground">Not available</span>
      </div>
    );
  }
  
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
  // Only show sections that have at least one non-null value
  const hasValues = specs.some(spec => spec.value !== null && spec.value !== undefined && spec.value !== '');
  
  if (!hasValues) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      {specs.map((spec, index) => (
        <SpecificationItem key={index} {...spec} />
      ))}
      <Separator className="my-4" />
    </div>
  );
}

interface ProductSpecificationsProps {
  product: LaptopProduct | MobileProduct;
}

function isMobileProduct(product: LaptopProduct | MobileProduct): product is MobileProduct {
  return 'camera' in product;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const isMobile = isMobileProduct(product);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SpecificationSection
          title="Display"
          specs={[
            { label: "Display", value: product.display_specs },
            { label: "Resolution", value: isMobile ? product.resolution : undefined },
            { label: "Screen Size", value: isMobile ? product.screen_size : undefined },
          ]}
        />

        <SpecificationSection
          title="Platform"
          specs={[
            { label: "OS", value: product.os },
            { label: "Processor", value: product.processor },
            { label: "Chipset", value: isMobile ? product.chipset : undefined },
            { label: "Graphics", value: isMobile ? undefined : (product as LaptopProduct).graphics },
          ]}
        />

        <SpecificationSection
          title="Memory"
          specs={[
            { label: "RAM", value: product.ram },
            { label: "Storage", value: product.storage },
          ]}
        />

        {isMobile && (
          <SpecificationSection
            title="Camera"
            specs={[
              { label: "Camera", value: product.camera },
            ]}
          />
        )}

        <SpecificationSection
          title="Battery"
          specs={[
            { label: "Battery", value: product.battery },
            { label: "Charging", value: isMobile ? product.charging_specs : undefined },
          ]}
        />

        {!isMobile && (
          <SpecificationSection
            title="Ports & Connectivity"
            specs={[
              { label: "Ports", value: (product as LaptopProduct).ports },
            ]}
          />
        )}

        <SpecificationSection
          title="Additional Info"
          specs={[
            { label: "Color", value: product.color },
            { label: "Model", value: product.model_name },
          ]}
        />
      </CardContent>
    </Card>
  );
}