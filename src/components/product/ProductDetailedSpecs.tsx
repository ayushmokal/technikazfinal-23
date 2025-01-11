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
          title="Basic Information"
          specs={[
            { label: "Brand", value: product.brand },
            { label: "Model", value: product.model_name },
            { label: "Launch Date", value: product.launch_date },
            { label: "Status", value: product.status },
            { label: "Price", value: product.price_details },
          ]}
        />
        
        <SpecificationSection
          title="Platform"
          specs={[
            { label: "Operating System", value: product.os },
            { label: "Custom UI", value: product.custom_ui },
            { label: "Chipset", value: product.chipset },
            { label: "CPU", value: product.cpu },
            { label: "Architecture", value: product.architecture },
            { label: "Fabrication", value: product.fabrication },
            { label: "GPU", value: product.gpu },
          ]}
        />

        <SpecificationSection
          title="Memory"
          specs={[
            { label: "RAM", value: product.ram },
            { label: "RAM Type", value: product.ram_type },
            { label: "Storage", value: product.storage },
            { label: "Storage Type", value: product.storage_type },
            { label: "Card Slot", value: product.card_slot },
          ]}
        />

        <SpecificationSection
          title="Display"
          specs={[
            { label: "Type", value: product.display_type },
            { label: "Size", value: product.screen_size },
            { label: "Resolution", value: product.resolution },
            { label: "Protection", value: product.screen_protection },
            { label: "Features", value: product.display_features },
            { label: "Refresh Rate", value: product.refresh_rate },
            { label: "Peak Brightness", value: product.peak_brightness },
            { label: "HDR Support", value: product.hdr_support },
          ]}
        />

        <SpecificationSection
          title="Main Camera"
          specs={[
            { label: "Setup", value: product.camera_setup },
            { label: "Main Camera", value: product.camera },
            { label: "Features", value: product.main_camera_features },
            { label: "Video Recording", value: product.main_camera_video },
            { label: "OIS", value: product.camera_ois },
            { label: "Flash", value: product.camera_flash },
          ]}
        />

        <SpecificationSection
          title="Selfie Camera"
          specs={[
            { label: "Setup", value: product.front_camera_setup },
            { label: "Camera", value: product.front_camera },
            { label: "Features", value: product.selfie_camera_features },
            { label: "Video", value: product.selfie_camera_video },
          ]}
        />

        <SpecificationSection
          title="Design"
          specs={[
            { label: "Dimensions", value: product.dimensions },
            { label: "Weight", value: product.weight },
            { label: "Build", value: product.build_material },
            { label: "Colors", value: product.colors_list },
            { label: "Protection", value: product.protection_details },
            { label: "Waterproof", value: product.waterproof },
          ]}
        />

        <SpecificationSection
          title="Battery"
          specs={[
            { label: "Type", value: product.battery_type },
            { label: "Capacity", value: product.battery },
            { label: "Charging", value: product.charging_specs },
            { label: "Charging Details", value: product.charging_details },
          ]}
        />

        <SpecificationSection
          title="Network"
          specs={[
            { label: "Technology", value: product.network_technology },
            { label: "2G Bands", value: product.network_2g_bands },
            { label: "3G Bands", value: product.network_3g_bands },
            { label: "4G Bands", value: product.network_4g_bands },
            { label: "5G Bands", value: product.network_5g_bands },
            { label: "Speed", value: product.network_speed },
          ]}
        />

        <SpecificationSection
          title="Connectivity"
          specs={[
            { label: "WLAN", value: product.wlan_details },
            { label: "Bluetooth", value: product.bluetooth_details },
            { label: "GPS", value: product.positioning },
            { label: "NFC", value: product.nfc },
            { label: "Radio", value: product.radio },
            { label: "USB", value: product.usb },
          ]}
        />

        <SpecificationSection
          title="Features"
          specs={[
            { label: "Sensors", value: product.sensors_list },
            { label: "Audio Jack", value: product.audio_jack },
            { label: "Loudspeaker", value: product.loudspeaker },
          ]}
        />
      </CardContent>
    </Card>
  );
}