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
          title="Launch Details"
          specs={[
            { label: "Announced", value: product.announced },
            { label: "Status", value: product.status },
            { label: "Launch Date", value: product.launch_date },
          ]}
        />
        
        <SpecificationSection
          title="Platform"
          specs={[
            { label: "Operating System", value: product.os },
            { label: "Custom UI", value: product.custom_ui },
            { label: "Software Support", value: product.software_support },
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
            { label: "Display Type", value: product.display_type },
            { label: "Display Size", value: product.screen_size },
            { label: "Resolution", value: product.resolution },
            { label: "Aspect Ratio", value: product.aspect_ratio },
            { label: "Pixel Density", value: product.pixel_density },
            { label: "Screen Protection", value: product.screen_protection },
            { label: "Peak Brightness", value: product.peak_brightness },
            { label: "HDR Support", value: product.hdr_support },
            { label: "Refresh Rate", value: product.refresh_rate },
            { label: "Bezel-less Display", value: product.bezel_less },
            { label: "Touch Screen", value: product.touch_screen },
          ]}
        />

        <SpecificationSection
          title="Main Camera"
          specs={[
            { label: "Camera Setup", value: product.camera_setup },
            { label: "Main Camera", value: product.camera },
            { label: "Features", value: product.main_camera_features },
            { label: "Video Recording", value: product.main_camera_video },
            { label: "Autofocus", value: product.camera_autofocus },
            { label: "OIS", value: product.camera_ois },
            { label: "Flash", value: product.camera_flash },
            { label: "Camera Modes", value: product.camera_modes },
          ]}
        />

        <SpecificationSection
          title="Front Camera"
          specs={[
            { label: "Front Camera", value: product.front_camera },
            { label: "Setup", value: product.front_camera_setup },
            { label: "Features", value: product.selfie_camera_features },
            { label: "Video Recording", value: product.selfie_camera_video },
          ]}
        />

        <SpecificationSection
          title="Body"
          specs={[
            { label: "Dimensions", value: product.dimensions },
            { label: "Height", value: product.height },
            { label: "Width", value: product.width },
            { label: "Thickness", value: product.thickness },
            { label: "Weight", value: product.weight },
            { label: "Build Material", value: product.build_material },
            { label: "Build Details", value: product.build_details },
            { label: "Protection Details", value: product.protection_details },
            { label: "Waterproof", value: product.waterproof },
            { label: "Ruggedness", value: product.ruggedness },
            { label: "SIM", value: product.sim },
          ]}
        />

        <SpecificationSection
          title="Battery"
          specs={[
            { label: "Battery", value: product.battery },
            { label: "Battery Type", value: product.battery_type },
            { label: "Charging", value: product.charging_specs },
            { label: "Charging Details", value: product.charging_details },
          ]}
        />

        <SpecificationSection
          title="Communications"
          specs={[
            { label: "WLAN", value: product.wlan_details },
            { label: "Bluetooth", value: product.bluetooth_details },
            { label: "NFC", value: product.nfc },
            { label: "Infrared", value: product.infrared },
            { label: "Radio", value: product.radio },
            { label: "USB", value: product.usb },
            { label: "Positioning", value: product.positioning },
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
          title="Sound"
          specs={[
            { label: "Loudspeaker", value: product.loudspeaker },
            { label: "Audio Jack", value: product.audio_jack },
          ]}
        />

        <SpecificationSection
          title="Features"
          specs={[
            { label: "Sensors", value: product.sensors },
          ]}
        />

        <SpecificationSection
          title="Miscellaneous"
          specs={[
            { label: "Models", value: product.models },
            { label: "Colors", value: product.colors_list },
            { label: "Price Details", value: product.price_details },
          ]}
        />
      </CardContent>
    </Card>
  );
}