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
        {isMobile && (
          <SpecificationSection
            title="Network"
            specs={[
              { label: "Technology", value: product.network_technology },
              { label: "2G bands", value: product.network_2g_bands },
              { label: "3G bands", value: product.network_3g_bands },
              { label: "4G bands", value: product.network_4g_bands },
              { label: "5G bands", value: product.network_5g_bands },
              { label: "Speed", value: product.network_speed },
            ]}
          />
        )}

        {isMobile && (
          <SpecificationSection
            title="Launch"
            specs={[
              { label: "Announced", value: product.announced },
              { label: "Status", value: product.status },
            ]}
          />
        )}

        {isMobile && (
          <SpecificationSection
            title="Body"
            specs={[
              { label: "Dimensions", value: product.dimensions },
              { label: "Build", value: product.build_details },
              { label: "SIM", value: product.sim },
              { label: "Protection", value: product.protection_details },
            ]}
          />
        )}

        <SpecificationSection
          title="Display"
          specs={isMobile ? [
            { label: "Type", value: product.display_type_details },
            { label: "Resolution", value: product.display_resolution_details },
            { label: "Protection", value: product.display_protection },
            { label: "Features", value: product.display_features },
          ] : [
            { label: "Display", value: product.display_specs },
          ]}
        />

        <SpecificationSection
          title="Platform"
          specs={isMobile ? [
            { label: "OS", value: product.os },
            { label: "Chipset", value: product.chipset },
            { label: "CPU", value: product.cpu },
            { label: "GPU", value: product.gpu },
          ] : [
            { label: "OS", value: product.os },
            { label: "Processor", value: product.processor },
            { label: "Graphics", value: (product as LaptopProduct).graphics },
          ]}
        />

        <SpecificationSection
          title="Memory"
          specs={isMobile ? [
            { label: "Card slot", value: product.card_slot },
            { label: "Internal", value: product.internal_storage },
            { label: "Storage type", value: product.storage_type },
          ] : [
            { label: "RAM", value: product.ram },
            { label: "Storage", value: product.storage },
          ]}
        />

        {isMobile && (
          <>
            <SpecificationSection
              title="Main Camera"
              specs={[
                { label: "Features", value: product.main_camera_features },
                { label: "Video", value: product.main_camera_video },
              ]}
            />

            <SpecificationSection
              title="Selfie Camera"
              specs={[
                { label: "Features", value: product.selfie_camera_features },
                { label: "Video", value: product.selfie_camera_video },
              ]}
            />
          </>
        )}

        <SpecificationSection
          title="Sound"
          specs={isMobile ? [
            { label: "Loudspeaker", value: product.loudspeaker },
            { label: "3.5mm jack", value: product.audio_jack },
          ] : [
            { label: "Audio", value: "Integrated audio" },
          ]}
        />

        <SpecificationSection
          title="Communications"
          specs={isMobile ? [
            { label: "WLAN", value: product.wlan_details },
            { label: "Bluetooth", value: product.bluetooth_details },
            { label: "Radio", value: product.radio },
            { label: "Infrared", value: product.infrared },
          ] : [
            { label: "Ports", value: (product as LaptopProduct).ports },
          ]}
        />

        {isMobile && (
          <SpecificationSection
            title="Features"
            specs={[
              { label: "Sensors", value: product.sensors_list },
            ]}
          />
        )}

        <SpecificationSection
          title="Battery"
          specs={isMobile ? [
            { label: "Type", value: product.battery_type },
            { label: "Charging", value: product.charging_details },
          ] : [
            { label: "Battery", value: product.battery },
          ]}
        />

        {isMobile && (
          <SpecificationSection
            title="Misc"
            specs={[
              { label: "Models", value: product.models_list },
              { label: "Colors", value: product.colors_list },
              { label: "Price", value: product.price_details },
            ]}
          />
        )}
      </CardContent>
    </Card>
  );
}