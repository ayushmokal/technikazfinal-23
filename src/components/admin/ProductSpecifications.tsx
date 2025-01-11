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
    { label: "Color", value: product.color },
  ];

  const displaySpecs = [
    { label: "Display", value: product.display_specs },
    { label: "Resolution", value: isMobile ? (product as MobileProduct).resolution : undefined },
    { label: "Screen Size", value: isMobile ? (product as MobileProduct).screen_size : undefined },
    { label: "Display Type", value: isMobile ? (product as MobileProduct).display_type : undefined },
    { label: "Refresh Rate", value: isMobile ? (product as MobileProduct).refresh_rate : undefined },
    { label: "Peak Brightness", value: isMobile ? (product as MobileProduct).peak_brightness : undefined },
    { label: "HDR Support", value: isMobile ? (product as MobileProduct).hdr_support : undefined },
    { label: "Screen Protection", value: isMobile ? (product as MobileProduct).screen_protection : undefined },
  ];

  const performanceSpecs = [
    { label: "Processor", value: product.processor },
    { label: "RAM", value: product.ram },
    { label: "Storage", value: product.storage },
    { label: "Graphics", value: isMobile ? undefined : (product as LaptopProduct).graphics },
    { label: "OS", value: product.os },
    { label: "CPU", value: isMobile ? (product as MobileProduct).cpu : undefined },
    { label: "Architecture", value: isMobile ? (product as MobileProduct).architecture : undefined },
    { label: "Fabrication", value: isMobile ? (product as MobileProduct).fabrication : undefined },
    { label: "RAM Type", value: isMobile ? (product as MobileProduct).ram_type : undefined },
    { label: "GPU", value: isMobile ? (product as MobileProduct).gpu : undefined },
  ];

  const mobileSpecs = isMobile ? [
    { label: "Main Camera", value: (product as MobileProduct).camera },
    { label: "Front Camera", value: (product as MobileProduct).front_camera },
    { label: "Camera Setup", value: (product as MobileProduct).camera_setup },
    { label: "Camera Autofocus", value: (product as MobileProduct).camera_autofocus },
    { label: "Camera OIS", value: (product as MobileProduct).camera_ois },
    { label: "Camera Flash", value: (product as MobileProduct).camera_flash },
    { label: "Camera Modes", value: (product as MobileProduct).camera_modes },
    { label: "Video Recording", value: (product as MobileProduct).video_recording },
  ] : [];

  const networkSpecs = isMobile ? [
    { label: "Network Technology", value: (product as MobileProduct).network_technology },
    { label: "2G Bands", value: (product as MobileProduct).network_2g_bands },
    { label: "3G Bands", value: (product as MobileProduct).network_3g_bands },
    { label: "4G Bands", value: (product as MobileProduct).network_4g_bands },
    { label: "5G Bands", value: (product as MobileProduct).network_5g_bands },
    { label: "Network Speed", value: (product as MobileProduct).network_speed },
  ] : [];

  const designSpecs = [
    { label: "Dimensions", value: isMobile ? (product as MobileProduct).dimensions : undefined },
    { label: "Height", value: isMobile ? (product as MobileProduct).height : undefined },
    { label: "Width", value: isMobile ? (product as MobileProduct).width : undefined },
    { label: "Thickness", value: isMobile ? (product as MobileProduct).thickness : undefined },
    { label: "Weight", value: isMobile ? (product as MobileProduct).weight : undefined },
    { label: "Build Material", value: isMobile ? (product as MobileProduct).build_material : undefined },
    { label: "Waterproof", value: isMobile ? (product as MobileProduct).waterproof : undefined },
    { label: "Ruggedness", value: isMobile ? (product as MobileProduct).ruggedness : undefined },
  ];

  const connectivitySpecs = isMobile ? [
    { label: "WLAN", value: (product as MobileProduct).wlan_details },
    { label: "Bluetooth", value: (product as MobileProduct).bluetooth_details },
    { label: "NFC", value: (product as MobileProduct).nfc },
    { label: "USB", value: (product as MobileProduct).usb },
    { label: "Radio", value: (product as MobileProduct).radio },
    { label: "Audio Jack", value: (product as MobileProduct).audio_jack },
  ] : [];

  const batterySpecs = [
    { label: "Battery", value: product.battery },
    { label: "Battery Type", value: isMobile ? (product as MobileProduct).battery_type : undefined },
    { label: "Charging Details", value: isMobile ? (product as MobileProduct).charging_details : undefined },
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
            <SpecificationSection title="Camera" specs={mobileSpecs} />
            {mobileSpecs.length > 0 && <Separator />}
            
            <SpecificationSection title="Network" specs={networkSpecs} />
            {networkSpecs.length > 0 && <Separator />}
            
            <SpecificationSection title="Connectivity" specs={connectivitySpecs} />
            {connectivitySpecs.length > 0 && <Separator />}
          </>
        )}
        
        <SpecificationSection title="Design" specs={designSpecs} />
        {designSpecs.length > 0 && <Separator />}
        
        <SpecificationSection title="Battery" specs={batterySpecs} />
      </CardContent>
    </Card>
  );
}