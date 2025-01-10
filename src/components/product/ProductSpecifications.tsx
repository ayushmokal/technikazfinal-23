import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductSpecTable } from "@/components/product/ProductSpecTable";
import type { LaptopProduct, MobileProduct } from "@/types/product";

interface ProductSpecificationsProps {
  product: LaptopProduct | MobileProduct;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const isMobile = 'camera' in product;

  const getKeySpecs = () => {
    const baseSpecs = [
      { label: "RAM", value: product.ram },
      { label: "Processor", value: product.processor },
      { label: "Battery", value: product.battery },
      { label: "Display", value: product.display_specs },
      { label: "Storage", value: product.storage },
    ];

    if (isMobile) {
      return [
        ...baseSpecs,
        { 
          label: "Camera", 
          value: (product as MobileProduct).camera 
        }
      ];
    } else {
      return [
        ...baseSpecs,
        { 
          label: "Graphics", 
          value: (product as LaptopProduct).graphics 
        }
      ];
    }
  };

  const getGeneralSpecs = () => {
    const specs = [
      { label: "Brand", value: product.brand },
      { label: "Model", value: product.model_name },
      { label: "Operating System", value: product.os },
    ];

    if (isMobile) {
      const mobileProduct = product as MobileProduct;
      specs.push(
        { label: "Custom UI", value: mobileProduct.custom_ui },
        { label: "Launch Date", value: mobileProduct.launch_date },
        { label: "Release Status", value: mobileProduct.release_date }
      );
    } else {
      specs.push({ 
        label: "Ports", 
        value: (product as LaptopProduct).ports 
      });
    }

    return specs;
  };

  const getDisplaySpecs = () => {
    if (!isMobile) return null;
    
    const mobileProduct = product as MobileProduct;
    return [
      { label: "Screen Size", value: mobileProduct.screen_size },
      { label: "Resolution", value: mobileProduct.resolution },
      { label: "Display Type", value: mobileProduct.display_type },
      { label: "Screen Protection", value: mobileProduct.screen_protection },
      { label: "Peak Brightness", value: mobileProduct.peak_brightness },
      { label: "HDR Support", value: mobileProduct.hdr_support },
      { label: "Refresh Rate", value: mobileProduct.refresh_rate },
    ];
  };

  const getCameraDetails = () => {
    if (!isMobile) return null;
    
    const mobileProduct = product as MobileProduct;
    return [
      { label: "Camera Setup", value: mobileProduct.camera_setup },
      { label: "Main Camera", value: mobileProduct.camera },
      { label: "Features", value: mobileProduct.camera_modes },
      { label: "Video Recording", value: mobileProduct.video_recording },
      { label: "Flash", value: mobileProduct.camera_flash },
      { label: "Front Camera Setup", value: mobileProduct.front_camera_setup },
      { label: "Front Camera", value: mobileProduct.front_camera },
      { label: "Front Camera Video", value: mobileProduct.front_camera_video },
      { label: "Autofocus", value: mobileProduct.camera_autofocus ? 'Yes' : 'No' },
      { label: "OIS", value: mobileProduct.camera_ois ? 'Yes' : 'No' },
    ];
  };

  const getCommunicationSpecs = () => {
    if (!isMobile) return null;
    
    const mobileProduct = product as MobileProduct;
    return [
      { label: "WLAN", value: mobileProduct.wlan },
      { label: "Bluetooth", value: mobileProduct.bluetooth },
      { label: "NFC", value: mobileProduct.nfc },
      { label: "USB", value: mobileProduct.usb },
      { label: "GPS", value: mobileProduct.positioning },
    ];
  };

  const getNetworkSpecs = () => {
    if (!isMobile) return null;
    
    const mobileProduct = product as MobileProduct;
    return [
      { label: "Network Type", value: mobileProduct.network_technology },
      { label: "2G Bands", value: mobileProduct.network_2g_bands },
      { label: "3G Bands", value: mobileProduct.network_3g_bands },
      { label: "4G Bands", value: mobileProduct.network_4g_bands },
      { label: "5G Bands", value: mobileProduct.network_5g_bands },
      { label: "Speed", value: mobileProduct.network_speed },
    ];
  };

  const getSoundSpecs = () => {
    if (!isMobile) return null;
    
    const mobileProduct = product as MobileProduct;
    return [
      { label: "Loudspeaker", value: mobileProduct.loudspeaker },
      { label: "3.5mm Jack", value: mobileProduct.audio_jack },
    ];
  };

  const getFeatures = () => {
    if (!isMobile) return null;
    
    const mobileProduct = product as MobileProduct;
    return [
      { label: "Sensors", value: mobileProduct.sensors },
      { label: "Available Models", value: mobileProduct.models },
    ];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Key Specifications</h3>
          <ProductSpecTable
            specifications={[{
              title: "Key Features",
              specs: getKeySpecs()
            }]}
          />
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-4">General</h3>
          <ProductSpecTable
            specifications={[{
              title: "General Features",
              specs: getGeneralSpecs()
            }]}
          />
        </div>

        {isMobile && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold mb-4">Display</h3>
              <ProductSpecTable
                specifications={[{
                  title: "Display Features",
                  specs: getDisplaySpecs() || []
                }]}
              />
            </div>

            <Separator />
            <div>
              <h3 className="font-semibold mb-4">Camera</h3>
              <ProductSpecTable
                specifications={[{
                  title: "Camera Features",
                  specs: getCameraDetails() || []
                }]}
              />
            </div>

            <Separator />
            <div>
              <h3 className="font-semibold mb-4">Communications</h3>
              <ProductSpecTable
                specifications={[{
                  title: "Communication Features",
                  specs: getCommunicationSpecs() || []
                }]}
              />
            </div>

            <Separator />
            <div>
              <h3 className="font-semibold mb-4">Network</h3>
              <ProductSpecTable
                specifications={[{
                  title: "Network Features",
                  specs: getNetworkSpecs() || []
                }]}
              />
            </div>

            <Separator />
            <div>
              <h3 className="font-semibold mb-4">Sound</h3>
              <ProductSpecTable
                specifications={[{
                  title: "Sound Features",
                  specs: getSoundSpecs() || []
                }]}
              />
            </div>

            <Separator />
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ProductSpecTable
                specifications={[{
                  title: "Additional Features",
                  specs: getFeatures() || []
                }]}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}