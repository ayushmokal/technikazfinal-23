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
    { label: "Launch Date", value: isMobile ? (product as MobileProduct).launch_date : undefined },
    { label: "Status", value: isMobile ? (product as MobileProduct).status : undefined },
  ];

  const platformSpecs = [
    { label: "Operating System", value: product.os },
    { label: "Custom UI", value: isMobile ? (product as MobileProduct).custom_ui : undefined },
    { label: "Chipset", value: isMobile ? (product as MobileProduct).chipset : undefined },
    { label: "CPU", value: isMobile ? (product as MobileProduct).cpu : undefined },
    { label: "Architecture", value: isMobile ? (product as MobileProduct).architecture : undefined },
    { label: "GPU", value: isMobile ? (product as MobileProduct).gpu : undefined },
  ];

  const memorySpecs = [
    { label: "RAM", value: product.ram },
    { label: "RAM Type", value: isMobile ? (product as MobileProduct).ram_type : undefined },
    { label: "Storage", value: product.storage },
    { label: "Storage Type", value: isMobile ? (product as MobileProduct).storage_type : undefined },
    { label: "Card Slot", value: isMobile ? (product as MobileProduct).card_slot : undefined },
  ];

  const displaySpecs = [
    { label: "Display", value: product.display_specs },
    { label: "Type", value: isMobile ? (product as MobileProduct).display_type : undefined },
    { label: "Size", value: isMobile ? (product as MobileProduct).screen_size : undefined },
    { label: "Resolution", value: isMobile ? (product as MobileProduct).resolution : undefined },
    { label: "Protection", value: isMobile ? (product as MobileProduct).screen_protection : undefined },
    { label: "Features", value: isMobile ? (product as MobileProduct).display_features : undefined },
    { label: "Refresh Rate", value: isMobile ? (product as MobileProduct).refresh_rate : undefined },
  ];

  const cameraSpecs = isMobile ? [
    { label: "Main Camera Setup", value: (product as MobileProduct).camera_setup },
    { label: "Main Camera", value: (product as MobileProduct).camera },
    { label: "Main Features", value: (product as MobileProduct).main_camera_features },
    { label: "Main Video", value: (product as MobileProduct).main_camera_video },
    { label: "Front Camera Setup", value: (product as MobileProduct).front_camera_setup },
    { label: "Front Camera", value: (product as MobileProduct).front_camera },
    { label: "Selfie Features", value: (product as MobileProduct).selfie_camera_features },
    { label: "Selfie Video", value: (product as MobileProduct).selfie_camera_video },
  ] : [];

  const designSpecs = isMobile ? [
    { label: "Dimensions", value: (product as MobileProduct).dimensions },
    { label: "Weight", value: (product as MobileProduct).weight },
    { label: "Build", value: (product as MobileProduct).build_material },
    { label: "Colors", value: (product as MobileProduct).colors_list },
    { label: "Protection", value: (product as MobileProduct).protection_details },
    { label: "Waterproof", value: (product as MobileProduct).waterproof },
  ] : [];

  const batterySpecs = [
    { label: "Battery", value: product.battery },
    { label: "Type", value: isMobile ? (product as MobileProduct).battery_type : undefined },
    { label: "Charging", value: isMobile ? (product as MobileProduct).charging_specs : undefined },
    { label: "Charging Details", value: isMobile ? (product as MobileProduct).charging_details : undefined },
  ];

  const networkSpecs = isMobile ? [
    { label: "Technology", value: (product as MobileProduct).network_technology },
    { label: "2G Bands", value: (product as MobileProduct).network_2g_bands },
    { label: "3G Bands", value: (product as MobileProduct).network_3g_bands },
    { label: "4G Bands", value: (product as MobileProduct).network_4g_bands },
    { label: "5G Bands", value: (product as MobileProduct).network_5g_bands },
    { label: "Speed", value: (product as MobileProduct).network_speed },
  ] : [];

  const connectivitySpecs = isMobile ? [
    { label: "WLAN", value: (product as MobileProduct).wlan_details },
    { label: "Bluetooth", value: (product as MobileProduct).bluetooth_details },
    { label: "GPS", value: (product as MobileProduct).positioning },
    { label: "NFC", value: (product as MobileProduct).nfc },
    { label: "Radio", value: (product as MobileProduct).radio },
    { label: "USB", value: (product as MobileProduct).usb },
  ] : [
    { label: "Ports", value: (product as LaptopProduct).ports },
  ];

  const featureSpecs = isMobile ? [
    { label: "Sensors", value: (product as MobileProduct).sensors_list },
    { label: "Audio Jack", value: (product as MobileProduct).audio_jack },
    { label: "Loudspeaker", value: (product as MobileProduct).loudspeaker },
  ] : [];

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <SpecificationSection title="Basic Information" specs={basicSpecs} />
        <SpecificationSection title="Platform" specs={platformSpecs} />
        <SpecificationSection title="Memory" specs={memorySpecs} />
        <SpecificationSection title="Display" specs={displaySpecs} />
        {isMobile && <SpecificationSection title="Camera" specs={cameraSpecs} />}
        {isMobile && <SpecificationSection title="Design" specs={designSpecs} />}
        <SpecificationSection title="Battery" specs={batterySpecs} />
        {isMobile && <SpecificationSection title="Network" specs={networkSpecs} />}
        <SpecificationSection title="Connectivity" specs={connectivitySpecs} />
        {isMobile && <SpecificationSection title="Features" specs={featureSpecs} />}
      </CardContent>
    </Card>
  );
}