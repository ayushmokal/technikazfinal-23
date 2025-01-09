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
  const filteredSpecs = specs.filter(spec => spec.value !== null && spec.value !== undefined);
  
  if (filteredSpecs.length === 0) return null;
  
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      {filteredSpecs.map((spec, index) => (
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SpecificationSection
          title="Key Specs"
          specs={[
            { label: "RAM", value: product.ram },
            { label: "Processor", value: product.processor },
            ...(isMobile ? [
              { label: "Rear Camera", value: (product as MobileProduct).camera },
              { label: "Front Camera", value: (product as MobileProduct).front_camera }
            ] : [
              { label: "Graphics", value: (product as LaptopProduct).graphics }
            ]),
            { label: "Battery", value: product.battery },
            { label: "Display", value: product.display_specs },
          ].filter(Boolean)}
        />
        
        {isMobile && (
          <>
            <SpecificationSection
              title="General"
              specs={[
                { label: "Launch Date", value: (product as MobileProduct).launch_date },
                { label: "Operating System", value: product.os },
                { label: "Custom UI", value: (product as MobileProduct).custom_ui },
                { label: "Software Support", value: (product as MobileProduct).software_support },
              ]}
            />
            
            <SpecificationSection
              title="Performance"
              specs={[
                { label: "Chipset", value: (product as MobileProduct).chipset },
                { label: "CPU", value: (product as MobileProduct).cpu },
                { label: "Architecture", value: (product as MobileProduct).architecture },
                { label: "Fabrication", value: (product as MobileProduct).fabrication },
                { label: "RAM", value: product.ram },
                { label: "RAM Type", value: (product as MobileProduct).ram_type },
              ]}
            />
            
            <SpecificationSection
              title="Display"
              specs={[
                { label: "Display Type", value: (product as MobileProduct).display_type },
                { label: "Screen Size", value: (product as MobileProduct).screen_size },
                { label: "Resolution", value: (product as MobileProduct).resolution },
                { label: "Aspect Ratio", value: (product as MobileProduct).aspect_ratio },
                { label: "Pixel Density", value: (product as MobileProduct).pixel_density },
                { label: "Screen Protection", value: (product as MobileProduct).screen_protection },
                { label: "Bezel-less Display", value: (product as MobileProduct).bezel_less },
                { label: "Touch Screen", value: (product as MobileProduct).touch_screen },
                { label: "Peak Brightness", value: (product as MobileProduct).peak_brightness },
                { label: "HDR Support", value: (product as MobileProduct).hdr_support },
                { label: "Refresh Rate", value: (product as MobileProduct).refresh_rate },
              ]}
            />
            
            <SpecificationSection
              title="Design"
              specs={[
                { label: "Height", value: (product as MobileProduct).height },
                { label: "Width", value: (product as MobileProduct).width },
                { label: "Thickness", value: (product as MobileProduct).thickness },
                { label: "Weight", value: (product as MobileProduct).weight },
                { label: "Build Material", value: (product as MobileProduct).build_material },
                { label: "Colors", value: product.color },
                { label: "Waterproof", value: (product as MobileProduct).waterproof },
                { label: "Ruggedness", value: (product as MobileProduct).ruggedness },
              ]}
            />
            
            <SpecificationSection
              title="Camera"
              specs={[
                { label: "Camera Setup", value: (product as MobileProduct).camera_setup },
                { label: "Autofocus", value: (product as MobileProduct).camera_autofocus },
                { label: "OIS", value: (product as MobileProduct).camera_ois },
                { label: "Flash", value: (product as MobileProduct).camera_flash },
                { label: "Camera Modes", value: (product as MobileProduct).camera_modes },
                { label: "Video Recording", value: (product as MobileProduct).video_recording },
              ]}
            />
            
            <SpecificationSection
              title="Front Camera"
              specs={[
                { label: "Camera Setup", value: (product as MobileProduct).front_camera_setup },
                { label: "Resolution", value: (product as MobileProduct).front_camera },
                { label: "Video Recording", value: (product as MobileProduct).front_camera_video },
              ]}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
