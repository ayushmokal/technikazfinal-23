import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { MobileProduct } from "@/types/product";

interface ProductDetailedSpecsProps {
  product: MobileProduct;
}

export function ProductDetailedSpecs({ product }: ProductDetailedSpecsProps) {
  const sections = [
    {
      title: "Network",
      specs: [
        { label: "Technology", value: product.network_technology },
        { label: "2G bands", value: product.network_2g_bands },
        { label: "3G bands", value: product.network_3g_bands },
        { label: "4G bands", value: product.network_4g_bands },
        { label: "5G bands", value: product.network_5g_bands },
        { label: "Speed", value: product.network_speed },
      ]
    },
    {
      title: "Launch",
      specs: [
        { label: "Announced", value: product.announced },
        { label: "Status", value: product.status },
      ]
    },
    {
      title: "Body",
      specs: [
        { label: "Dimensions", value: product.dimensions },
        { label: "Build", value: product.build_details },
        { label: "SIM", value: product.sim },
        { label: "Protection", value: product.protection_details },
      ]
    },
    {
      title: "Display",
      specs: [
        { label: "Type", value: product.display_type_details },
        { label: "Resolution", value: product.display_resolution_details },
        { label: "Protection", value: product.display_protection },
        { label: "Features", value: product.display_features },
      ]
    },
    {
      title: "Platform",
      specs: [
        { label: "OS", value: product.os },
        { label: "Chipset", value: product.chipset },
        { label: "CPU", value: product.cpu },
        { label: "GPU", value: product.gpu },
      ]
    },
    {
      title: "Memory",
      specs: [
        { label: "Card slot", value: product.card_slot },
        { label: "Internal", value: product.internal_storage },
        { label: "Storage type", value: product.storage_type },
      ]
    },
    {
      title: "Main Camera",
      specs: [
        { label: "Features", value: product.main_camera_features },
        { label: "Video", value: product.main_camera_video },
      ]
    },
    {
      title: "Selfie Camera",
      specs: [
        { label: "Features", value: product.selfie_camera_features },
        { label: "Video", value: product.selfie_camera_video },
      ]
    },
    {
      title: "Sound",
      specs: [
        { label: "Loudspeaker", value: product.loudspeaker },
        { label: "3.5mm jack", value: product.audio_jack },
      ]
    },
    {
      title: "Communications",
      specs: [
        { label: "WLAN", value: product.wlan_details },
        { label: "Bluetooth", value: product.bluetooth_details },
        { label: "Radio", value: product.radio },
        { label: "Infrared", value: product.infrared ? "Yes" : "No" },
      ]
    },
    {
      title: "Features",
      specs: [
        { label: "Sensors", value: product.sensors_list },
      ]
    },
    {
      title: "Battery",
      specs: [
        { label: "Type", value: product.battery_type },
        { label: "Charging", value: product.charging_details },
      ]
    },
    {
      title: "Misc",
      specs: [
        { label: "Models", value: product.models_list },
        { label: "Colors", value: product.colors_list },
        { label: "Price", value: product.price_details },
      ]
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {sections.map((section, index) => {
            const filteredSpecs = section.specs.filter(spec => spec.value);
            if (filteredSpecs.length === 0) return null;

            return (
              <div key={section.title}>
                <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                <div className="space-y-2">
                  {filteredSpecs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex justify-between py-2">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium text-right">{spec.value || "N/A"}</span>
                    </div>
                  ))}
                </div>
                {index < sections.length - 1 && <Separator className="mt-4" />}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}