import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LaptopProduct, MobileProduct } from "@/types/product";

interface ProductSpecificationsProps {
  product: LaptopProduct | MobileProduct;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const isMobile = 'camera' in product;

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p>{product.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Brand</p>
              <p>{product.brand}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Model</p>
              <p>{product.model_name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p>₹{product.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Specifications</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Display</p>
              <p>{product.display_specs}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Processor</p>
              <p>{product.processor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">RAM</p>
              <p>{product.ram}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Storage</p>
              <p>{product.storage}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Battery</p>
              <p>{product.battery}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">OS</p>
              <p>{product.os || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Color</p>
              <p>{product.color || 'N/A'}</p>
            </div>
          </div>
        </div>

        {isMobile && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Mobile Specific Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Camera</p>
                  <p>{(product as MobileProduct).camera || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Chipset</p>
                  <p>{(product as MobileProduct).chipset || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Resolution</p>
                  <p>{(product as MobileProduct).resolution || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Screen Size</p>
                  <p>{(product as MobileProduct).screen_size || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Charging Specs</p>
                  <p>{(product as MobileProduct).charging_specs || 'N/A'}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {!isMobile && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Laptop Specific Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Graphics</p>
                  <p>{(product as LaptopProduct).graphics || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ports</p>
                  <p>{(product as LaptopProduct).ports || 'N/A'}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}