import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { MobileProduct } from "@/types/product";

interface SpecificationItemProps {
  label: string;
  value: string | boolean | null | undefined;
}

function SpecificationItem({ label, value }: SpecificationItemProps) {
  if (value === null || value === undefined) return null;
  
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
  specs: { label: string; value: string | boolean | null | undefined }[];
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

interface ProductDetailedSpecsProps {
  product: MobileProduct;
}

export function ProductDetailedSpecs({ product }: ProductDetailedSpecsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SpecificationSection
          title="General"
          specs={[
            { label: "Launch Date", value: product.launch_date },
            { label: "Custom UI", value: product.custom_ui },
            { label: "Software Support", value: product.software_support },
          ]}
        />
        
        <SpecificationSection
          title="Performance"
          specs={[
            { label: "CPU", value: product.cpu },
            { label: "Architecture", value: product.architecture },
            { label: "Fabrication", value: product.fabrication },
            { label: "RAM Type", value: product.ram_type },
          ]}
        />

        <SpecificationSection
          title="Display"
          specs={[
            { label: "Display Type", value: product.display_type },
            { label: "Aspect Ratio", value: product.aspect_ratio },
            { label: "Pixel Density", value: product.pixel_density },
            { label: "Screen Protection", value: product.screen_protection },
            { label: "Bezel-less Display", value: product.bezel_less },
            { label: "Touch Screen", value: product.touch_screen },
            { label: "Peak Brightness", value: product.peak_brightness },
            { label: "HDR Support", value: product.hdr_support },
            { label: "Refresh Rate", value: product.refresh_rate },
          ]}
        />

        <SpecificationSection
          title="Design"
          specs={[
            { label: "Height", value: product.height },
            { label: "Width", value: product.width },
            { label: "Thickness", value: product.thickness },
            { label: "Weight", value: product.weight },
            { label: "Build Material", value: product.build_material },
            { label: "Waterproof", value: product.waterproof },
            { label: "Ruggedness", value: product.ruggedness },
          ]}
        />

        <SpecificationSection
          title="Camera"
          specs={[
            { label: "Camera Setup", value: product.camera_setup },
            { label: "Autofocus", value: product.camera_autofocus },
            { label: "OIS", value: product.camera_ois },
            { label: "Flash", value: product.camera_flash },
            { label: "Camera Modes", value: product.camera_modes },
            { label: "Video Recording", value: product.video_recording },
          ]}
        />

        <SpecificationSection
          title="Front Camera"
          specs={[
            { label: "Setup", value: product.front_camera_setup },
            { label: "Video Recording", value: product.front_camera_video },
          ]}
        />
      </CardContent>
    </Card>
  );
}