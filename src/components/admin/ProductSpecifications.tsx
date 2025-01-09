import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
  product: {
    // Key Specs
    ram: string;
    processor: string;
    camera: string;
    front_camera?: string;
    battery: string;
    display_specs: string;
    
    // General
    launch_date?: string;
    os?: string;
    custom_ui?: string;
    software_support?: string;
    
    // Performance
    chipset?: string;
    cpu?: string;
    architecture?: string;
    fabrication?: string;
    graphics?: string;
    ram_type?: string;
    
    // Display
    display_type?: string;
    screen_size?: string;
    resolution?: string;
    aspect_ratio?: string;
    pixel_density?: string;
    screen_protection?: string;
    bezel_less?: boolean;
    touch_screen?: boolean;
    peak_brightness?: string;
    hdr_support?: string;
    refresh_rate?: string;
    
    // Design
    height?: string;
    width?: string;
    thickness?: string;
    weight?: string;
    build_material?: string;
    color?: string;
    waterproof?: string;
    ruggedness?: string;
    
    // Camera
    camera_setup?: string;
    camera_autofocus?: boolean;
    camera_ois?: boolean;
    camera_flash?: string;
    camera_modes?: string;
    video_recording?: string;
    front_camera_setup?: string;
    front_camera_video?: string;
    
    [key: string]: any;
  };
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
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
            { label: "Rear Camera", value: product.camera },
            { label: "Front Camera", value: product.front_camera },
            { label: "Battery", value: product.battery },
            { label: "Display", value: product.display_specs },
          ]}
        />
        
        <SpecificationSection
          title="General"
          specs={[
            { label: "Launch Date", value: product.launch_date },
            { label: "Operating System", value: product.os },
            { label: "Custom UI", value: product.custom_ui },
            { label: "Software Support", value: product.software_support },
          ]}
        />
        
        <SpecificationSection
          title="Performance"
          specs={[
            { label: "Chipset", value: product.chipset },
            { label: "CPU", value: product.cpu },
            { label: "Architecture", value: product.architecture },
            { label: "Fabrication", value: product.fabrication },
            { label: "Graphics", value: product.graphics },
            { label: "RAM Type", value: product.ram_type },
          ]}
        />
        
        <SpecificationSection
          title="Display"
          specs={[
            { label: "Display Type", value: product.display_type },
            { label: "Screen Size", value: product.screen_size },
            { label: "Resolution", value: product.resolution },
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
            { label: "Colors", value: product.color },
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
            { label: "Camera Setup", value: product.front_camera_setup },
            { label: "Resolution", value: product.front_camera },
            { label: "Video Recording", value: product.front_camera_video },
          ]}
        />
      </CardContent>
    </Card>
  );
}