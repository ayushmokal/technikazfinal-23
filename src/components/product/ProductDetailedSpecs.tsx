import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { MobileProduct } from "@/types/product";
import { ProductSpecTable } from "./ProductSpecTable";

interface ProductDetailedSpecsProps {
  product: MobileProduct;
}

export function ProductDetailedSpecs({ product }: ProductDetailedSpecsProps) {
  const specifications = [
    {
      title: "Basic Information",
      specs: [
        { label: "Brand", value: product.brand },
        { label: "Model", value: product.model_name },
      ]
    },
    {
      title: "Memory",
      specs: [
        { label: "RAM", value: product.ram },
        { label: "Storage", value: product.storage },
        { label: "Card Slot", value: product.card_slot },
        { label: "Storage Type", value: product.storage_type }
      ]
    },
    {
      title: "Main Camera",
      specs: [
        { label: "Main Camera", value: product.camera },
        { label: "Features", value: product.main_camera_features },
        { label: "Video", value: product.main_camera_video }
      ]
    },
    {
      title: "Selfie Camera",
      specs: [
        { label: "Camera", value: product.front_camera },
        { label: "Features", value: product.selfie_camera_features },
        { label: "Video", value: product.front_camera_video }
      ]
    },
    {
      title: "Battery",
      specs: [
        { label: "Capacity", value: product.battery },
        { label: "Type", value: product.battery_type },
        { label: "Charging", value: product.charging_specs }
      ]
    },
    {
      title: "Display",
      specs: [
        { label: "Type", value: product.display_type },
        { label: "Size", value: product.screen_size },
        { label: "Resolution", value: product.resolution },
        { label: "Protection", value: product.screen_protection },
        { label: "Features", value: product.display_features },
        { label: "Refresh Rate", value: product.refresh_rate }
      ]
    },
    {
      title: "Design",
      specs: [
        { label: "Dimensions", value: product.dimensions },
        { label: "Weight", value: product.weight },
        { label: "Build", value: product.build_material },
        { label: "Protection", value: product.protection_details },
        { label: "Colors", value: product.colors_list }
      ]
    },
    {
      title: "Network",
      specs: [
        { label: "Technology", value: product.network_technology },
        { label: "2G Bands", value: product.network_2g_bands },
        { label: "3G Bands", value: product.network_3g_bands },
        { label: "4G Bands", value: product.network_4g_bands },
        { label: "5G Bands", value: product.network_5g_bands },
        { label: "Speed", value: product.network_speed }
      ]
    },
    {
      title: "Connectivity",
      specs: [
        { label: "WLAN", value: product.wlan_details },
        { label: "Bluetooth", value: product.bluetooth_details },
        { label: "GPS", value: product.positioning },
        { label: "NFC", value: product.nfc },
        { label: "Radio", value: product.radio },
        { label: "USB", value: product.usb }
      ]
    }
  ];

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <h2 className="text-2xl font-bold">Detailed Specifications</h2>
        <ProductSpecTable specifications={specifications} />
      </CardContent>
    </Card>
  );
}