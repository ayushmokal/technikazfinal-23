import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductSpecTable } from "@/components/product/ProductSpecTable";
import type { LaptopProduct, MobileProduct } from "@/types/product";

interface ProductSpecificationsProps {
  product: LaptopProduct | MobileProduct;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const isMobile = 'camera' in product;

  const getCameraSpecs = (product: MobileProduct) => {
    const specs = [];
    
    // Main camera specs
    if (product.camera_setup || product.camera) {
      const mainCameraText = [
        product.camera_setup,
        product.camera,
        product.camera_ois ? 'with OIS' : '',
        product.camera_autofocus ? 'with Autofocus' : ''
      ].filter(Boolean).join(' ');
      specs.push(mainCameraText);
    }
    
    // Front camera specs
    if (product.front_camera_setup || product.front_camera) {
      const frontCameraText = [
        product.front_camera_setup,
        product.front_camera
      ].filter(Boolean).join(' ');
      if (frontCameraText) specs.push(frontCameraText);
    }
    
    return specs.join(' + ');
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
              specs: [
                { label: "RAM", value: product.ram },
                { label: "Processor", value: product.processor },
                ...(isMobile ? [
                  { 
                    label: "Camera", 
                    value: getCameraSpecs(product as MobileProduct)
                  }
                ] : [
                  { 
                    label: "Graphics", 
                    value: (product as LaptopProduct).graphics 
                  }
                ]),
                { label: "Battery", value: product.battery },
                { label: "Display", value: product.display_specs },
                { label: "Storage", value: product.storage },
              ]
            }]}
          />
        </div>

        <Separator />

        {isMobile ? (
          <>
            <div>
              <h3 className="font-semibold mb-4">General</h3>
              <ProductSpecTable
                specifications={[{
                  title: "General Features",
                  specs: [
                    { label: "Brand", value: product.brand },
                    { label: "Model", value: product.model_name },
                    { label: "Operating System", value: product.os },
                    { label: "Custom UI", value: (product as MobileProduct).custom_ui },
                  ]
                }]}
              />
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4">Display</h3>
              <ProductSpecTable
                specifications={[{
                  title: "Display Features",
                  specs: [
                    { label: "Screen Size", value: (product as MobileProduct).screen_size },
                    { label: "Resolution", value: (product as MobileProduct).resolution },
                    { label: "Display Type", value: (product as MobileProduct).display_type },
                    { label: "Screen Protection", value: (product as MobileProduct).screen_protection },
                  ]
                }]}
              />
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4">Camera</h3>
              <ProductSpecTable
                specifications={[{
                  title: "Camera",
                  specs: [
                    { label: "Camera Setup", value: (product as MobileProduct).camera_setup },
                    { label: "Resolution", value: (product as MobileProduct).camera },
                    { label: "Autofocus", value: (product as MobileProduct).camera_autofocus ? 'Yes' : 'No' },
                    { label: "OIS", value: (product as MobileProduct).camera_ois ? 'Yes' : 'No' },
                    { label: "Flash", value: (product as MobileProduct).camera_flash },
                    { label: "Front Camera", value: (product as MobileProduct).front_camera },
                  ]
                }]}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <h3 className="font-semibold mb-4">General</h3>
              <ProductSpecTable
                specifications={[{
                  title: "General Features",
                  specs: [
                    { label: "Brand", value: product.brand },
                    { label: "Model", value: product.model_name },
                    { label: "Operating System", value: product.os },
                    { label: "Ports", value: (product as LaptopProduct).ports },
                  ]
                }]}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}