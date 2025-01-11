import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { MobileProduct, LaptopProduct } from "@/types/product";

interface ProductDetailedSpecsProps {
  product: MobileProduct | LaptopProduct;
}

export function ProductDetailedSpecs({ product }: ProductDetailedSpecsProps) {
  if (!product) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Brand</span>
                <p>{product.brand}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Model</span>
                <p>{product.model_name}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Display */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Display</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Display Specs</span>
                <p>{product.display_specs}</p>
              </div>
              {'resolution' in product && (
                <div>
                  <span className="text-sm text-gray-500">Resolution</span>
                  <p>{product.resolution}</p>
                </div>
              )}
              {'screen_size' in product && (
                <div>
                  <span className="text-sm text-gray-500">Screen Size</span>
                  <p>{product.screen_size}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Performance */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Processor</span>
                <p>{product.processor}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">RAM</span>
                <p>{product.ram}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Storage</span>
                <p>{product.storage}</p>
              </div>
              {'graphics' in product && (
                <div>
                  <span className="text-sm text-gray-500">Graphics</span>
                  <p>{product.graphics}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Camera (Mobile Only) */}
          {'camera' in product && (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-4">Camera</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Camera Setup</span>
                    <p>{product.camera}</p>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Battery & Charging */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Battery & Charging</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Battery</span>
                <p>{product.battery}</p>
              </div>
              {'charging_specs' in product && (
                <div>
                  <span className="text-sm text-gray-500">Charging</span>
                  <p>{product.charging_specs}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Other Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Other Features</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Operating System</span>
                <p>{product.os}</p>
              </div>
              {'ports' in product && (
                <div>
                  <span className="text-sm text-gray-500">Ports</span>
                  <p>{product.ports}</p>
                </div>
              )}
              {'chipset' in product && (
                <div>
                  <span className="text-sm text-gray-500">Chipset</span>
                  <p>{product.chipset}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
