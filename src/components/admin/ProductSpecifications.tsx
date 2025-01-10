import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LaptopProduct, MobileProduct } from "@/types/product";

interface SpecificationItemProps {
  label: string;
  value: string | number | boolean | null | undefined;
}

function SpecificationItem({ label, value }: SpecificationItemProps) {
  if (value === null || value === undefined) return (
    <div className="flex justify-between py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">N/A</span>
    </div>
  );
  
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

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const isMobile = 'camera' in product;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SpecificationSection
          title="Network"
          specs={[
            { label: "Technology", value: (product as MobileProduct).network_technology },
            { label: "2G bands", value: (product as MobileProduct).network_2g_bands },
            { label: "3G bands", value: (product as MobileProduct).network_3g_bands },
            { label: "4G bands", value: (product as MobileProduct).network_4g_bands },
            { label: "5G bands", value: (product as MobileProduct).network_5g_bands },
            { label: "Speed", value: (product as MobileProduct).network_speed },
          ]}
        />

        <SpecificationSection
          title="Launch"
          specs={[
            { label: "Announced", value: (product as MobileProduct).announced },
            { label: "Status", value: (product as MobileProduct).status },
          ]}
        />

        <SpecificationSection
          title="Body"
          specs={[
            { label: "Dimensions", value: (product as MobileProduct).dimensions },
            { label: "Build", value: (product as MobileProduct).build_details },
            { label: "SIM", value: (product as MobileProduct).sim },
            { label: "Protection", value: (product as MobileProduct).protection_details },
          ]}
        />

        <SpecificationSection
          title="Display"
          specs={[
            { label: "Type", value: (product as MobileProduct).display_type_details },
            { label: "Resolution", value: (product as MobileProduct).display_resolution_details },
            { label: "Protection", value: (product as MobileProduct).display_protection },
            { label: "Features", value: (product as MobileProduct).display_features },
          ]}
        />

        <SpecificationSection
          title="Platform"
          specs={[
            { label: "OS", value: product.os },
            { label: "Chipset", value: (product as MobileProduct).chipset },
            { label: "CPU", value: (product as MobileProduct).cpu },
            { label: "GPU", value: (product as MobileProduct).gpu },
          ]}
        />

        <SpecificationSection
          title="Memory"
          specs={[
            { label: "Card slot", value: (product as MobileProduct).card_slot },
            { label: "Internal", value: (product as MobileProduct).internal_storage },
            { label: "Storage type", value: (product as MobileProduct).storage_type },
          ]}
        />

        <SpecificationSection
          title="Main Camera"
          specs={[
            { label: "Features", value: (product as MobileProduct).main_camera_features },
            { label: "Video", value: (product as MobileProduct).main_camera_video },
          ]}
        />

        <SpecificationSection
          title="Selfie Camera"
          specs={[
            { label: "Features", value: (product as MobileProduct).selfie_camera_features },
            { label: "Video", value: (product as MobileProduct).selfie_camera_video },
          ]}
        />

        <SpecificationSection
          title="Sound"
          specs={[
            { label: "Loudspeaker", value: (product as MobileProduct).loudspeaker },
            { label: "3.5mm jack", value: (product as MobileProduct).audio_jack },
          ]}
        />

        <SpecificationSection
          title="Communications"
          specs={[
            { label: "WLAN", value: (product as MobileProduct).wlan_details },
            { label: "Bluetooth", value: (product as MobileProduct).bluetooth_details },
            { label: "Radio", value: (product as MobileProduct).radio },
            { label: "Infrared", value: (product as MobileProduct).infrared },
          ]}
        />

        <SpecificationSection
          title="Features"
          specs={[
            { label: "Sensors", value: (product as MobileProduct).sensors_list },
          ]}
        />

        <SpecificationSection
          title="Battery"
          specs={[
            { label: "Type", value: (product as MobileProduct).battery_type },
            { label: "Charging", value: (product as MobileProduct).charging_details },
          ]}
        />

        <SpecificationSection
          title="Misc"
          specs={[
            { label: "Models", value: (product as MobileProduct).models_list },
            { label: "Colors", value: (product as MobileProduct).colors_list },
            { label: "Price", value: (product as MobileProduct).price_details },
          ]}
        />
      </CardContent>
    </Card>
  );
}