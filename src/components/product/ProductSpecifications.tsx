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
  specs: { label: string; value: string | boolean | null | undefined }[];
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
      <Separator className="my-4" />
    </div>
  );
}

interface ProductSpecificationsProps {
  product: MobileProduct | LaptopProduct;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const isMobile = 'camera' in product;

  const basicSpecs = [
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.model_name },
    { label: "Price", value: `$${product.price}` },
    { label: "Color", value: product.color },
  ];

  const displaySpecs = [
    { label: "Display", value: product.display_specs },
    { label: "Display Type", value: isMobile ? (product as MobileProduct).display_type : undefined },
    { label: "Display Type Details", value: isMobile ? (product as MobileProduct).display_type_details : undefined },
    { label: "Resolution", value: isMobile ? (product as MobileProduct).resolution : undefined },
    { label: "Screen Size", value: isMobile ? (product as MobileProduct).screen_size : undefined },
    { label: "Aspect Ratio", value: isMobile ? (product as MobileProduct).aspect_ratio : undefined },
    { label: "Pixel Density", value: isMobile ? (product as MobileProduct).pixel_density : undefined },
    { label: "Screen Protection", value: isMobile ? (product as MobileProduct).screen_protection : undefined },
    { label: "Refresh Rate", value: isMobile ? (product as MobileProduct).refresh_rate : undefined },
    { label: "Peak Brightness", value: isMobile ? (product as MobileProduct).peak_brightness : undefined },
    { label: "HDR Support", value: isMobile ? (product as MobileProduct).hdr_support : undefined },
    { label: "Bezel-less", value: isMobile ? (product as MobileProduct).bezel_less : undefined },
    { label: "Touch Screen", value: isMobile ? (product as MobileProduct).touch_screen : undefined },
  ];

  const performanceSpecs = [
    { label: "Processor", value: product.processor },
    { label: "CPU", value: isMobile ? (product as MobileProduct).cpu : undefined },
    { label: "Architecture", value: isMobile ? (product as MobileProduct).architecture : undefined },
    { label: "Fabrication", value: isMobile ? (product as MobileProduct).fabrication : undefined },
    { label: "GPU", value: isMobile ? (product as MobileProduct).gpu : undefined },
    { label: "RAM", value: product.ram },
    { label: "RAM Type", value: isMobile ? (product as MobileProduct).ram_type : undefined },
    { label: "Storage", value: product.storage },
    { label: "Storage Type", value: isMobile ? (product as MobileProduct).storage_type : undefined },
    { label: "Card Slot", value: isMobile ? (product as MobileProduct).card_slot : undefined },
    { label: "Graphics", value: isMobile ? undefined : (product as LaptopProduct).graphics },
    { label: "OS", value: product.os },
    { label: "Custom UI", value: isMobile ? (product as MobileProduct).custom_ui : undefined },
  ];

  const mobileSpecs = isMobile ? [
    { label: "Camera Setup", value: (product as MobileProduct).camera_setup },
    { label: "Main Camera", value: (product as MobileProduct).camera },
    { label: "Main Camera Features", value: (product as MobileProduct).main_camera_features },
    { label: "Main Camera Video", value: (product as MobileProduct).main_camera_video },
    { label: "Front Camera", value: (product as MobileProduct).front_camera },
    { label: "Front Camera Setup", value: (product as MobileProduct).front_camera_setup },
    { label: "Front Camera Features", value: (product as MobileProduct).selfie_camera_features },
    { label: "Front Camera Video", value: (product as MobileProduct).selfie_camera_video },
    { label: "Camera Autofocus", value: (product as MobileProduct).camera_autofocus },
    { label: "Camera OIS", value: (product as MobileProduct).camera_ois },
    { label: "Camera Flash", value: (product as MobileProduct).camera_flash },
    { label: "Camera Modes", value: (product as MobileProduct).camera_modes },
  ] : [];

  const connectivitySpecs = isMobile ? [
    { label: "Network Technology", value: (product as MobileProduct).network_technology },
    { label: "2G Bands", value: (product as MobileProduct).network_2g_bands },
    { label: "3G Bands", value: (product as MobileProduct).network_3g_bands },
    { label: "4G Bands", value: (product as MobileProduct).network_4g_bands },
    { label: "5G Bands", value: (product as MobileProduct).network_5g_bands },
    { label: "Network Speed", value: (product as MobileProduct).network_speed },
    { label: "WLAN", value: (product as MobileProduct).wlan_details },
    { label: "Bluetooth", value: (product as MobileProduct).bluetooth_details },
    { label: "NFC", value: (product as MobileProduct).nfc },
    { label: "Infrared", value: (product as MobileProduct).infrared },
    { label: "Radio", value: (product as MobileProduct).radio },
    { label: "USB", value: (product as MobileProduct).usb },
  ] : [
    { label: "Ports", value: (product as LaptopProduct).ports },
  ];

  const batterySpecs = [
    { label: "Battery", value: product.battery },
    { label: "Battery Type", value: isMobile ? (product as MobileProduct).battery_type : undefined },
    { label: "Charging", value: isMobile ? (product as MobileProduct).charging_specs : undefined },
    { label: "Charging Details", value: isMobile ? (product as MobileProduct).charging_details : undefined },
  ];

  const physicalSpecs = isMobile ? [
    { label: "Dimensions", value: (product as MobileProduct).dimensions },
    { label: "Height", value: (product as MobileProduct).height },
    { label: "Width", value: (product as MobileProduct).width },
    { label: "Thickness", value: (product as MobileProduct).thickness },
    { label: "Weight", value: (product as MobileProduct).weight },
    { label: "Build Material", value: (product as MobileProduct).build_material },
    { label: "Build Details", value: (product as MobileProduct).build_details },
    { label: "Protection Details", value: (product as MobileProduct).protection_details },
    { label: "Waterproof", value: (product as MobileProduct).waterproof },
    { label: "Ruggedness", value: (product as MobileProduct).ruggedness },
    { label: "SIM", value: (product as MobileProduct).sim },
  ] : [];

  const additionalSpecs = isMobile ? [
    { label: "Launch Date", value: (product as MobileProduct).launch_date },
    { label: "Status", value: (product as MobileProduct).status },
    { label: "Announced", value: (product as MobileProduct).announced },
    { label: "Software Support", value: (product as MobileProduct).software_support },
    { label: "Sensors", value: (product as MobileProduct).sensors },
    { label: "Loudspeaker", value: (product as MobileProduct).loudspeaker },
    { label: "Audio Jack", value: (product as MobileProduct).audio_jack },
  ] : [];

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <SpecificationSection title="Basic Information" specs={basicSpecs} />
        <SpecificationSection title="Display" specs={displaySpecs} />
        <SpecificationSection title="Performance" specs={performanceSpecs} />
        {isMobile && <SpecificationSection title="Camera" specs={mobileSpecs} />}
        <SpecificationSection title="Connectivity" specs={connectivitySpecs} />
        <SpecificationSection title="Battery" specs={batterySpecs} />
        {isMobile && <SpecificationSection title="Physical Specifications" specs={physicalSpecs} />}
        {isMobile && <SpecificationSection title="Additional Features" specs={additionalSpecs} />}
      </CardContent>
    </Card>
  );
}