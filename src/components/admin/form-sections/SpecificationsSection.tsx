import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";
import { Separator } from "@/components/ui/separator";

interface SpecificationsSectionProps {
  form: UseFormReturn<ProductFormData>;
  productType: 'mobile' | 'laptop';
}

export function SpecificationsSection({ form, productType }: SpecificationsSectionProps) {
  if (productType === 'laptop') {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Key Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="display_specs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Specifications</FormLabel>
                <FormControl>
                  <Input placeholder="Enter display specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="processor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Processor</FormLabel>
                <FormControl>
                  <Input placeholder="Enter processor details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RAM</FormLabel>
                <FormControl>
                  <Input placeholder="Enter RAM specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage</FormLabel>
                <FormControl>
                  <Input placeholder="Enter storage specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="battery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Battery</FormLabel>
                <FormControl>
                  <Input placeholder="Enter battery specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="graphics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Graphics</FormLabel>
                <FormControl>
                  <Input placeholder="Enter graphics specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Launch Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Launch Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="announced"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Announced</FormLabel>
                <FormControl>
                  <Input placeholder="Enter announcement date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input placeholder="Enter status" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Platform/Memory */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Platform & Memory</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="os"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operating System</FormLabel>
                <FormControl>
                  <Input placeholder="Enter OS details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chipset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chipset</FormLabel>
                <FormControl>
                  <Input placeholder="Enter chipset details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RAM</FormLabel>
                <FormControl>
                  <Input placeholder="Enter RAM specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="storage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage</FormLabel>
                <FormControl>
                  <Input placeholder="Enter storage specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Display */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Display</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="display_type_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter display type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="display_resolution_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resolution</FormLabel>
                <FormControl>
                  <Input placeholder="Enter display resolution" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="display_protection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Protection</FormLabel>
                <FormControl>
                  <Input placeholder="Enter display protection" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Main Camera */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Main Camera</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="camera_setup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camera Setup</FormLabel>
                <FormControl>
                  <Input placeholder="Enter camera setup details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="main_camera_features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <Input placeholder="Enter camera features" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="main_camera_video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Recording</FormLabel>
                <FormControl>
                  <Input placeholder="Enter video recording capabilities" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Front Camera */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Front Camera</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="front_camera_setup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Front Camera</FormLabel>
                <FormControl>
                  <Input placeholder="Enter front camera details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="selfie_camera_features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <Input placeholder="Enter selfie camera features" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="selfie_camera_video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <Input placeholder="Enter selfie video capabilities" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Body */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Body</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="dimensions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dimensions</FormLabel>
                <FormControl>
                  <Input placeholder="Enter dimensions" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input placeholder="Enter weight" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="build_material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Build</FormLabel>
                <FormControl>
                  <Input placeholder="Enter build material" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sim"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SIM</FormLabel>
                <FormControl>
                  <Input placeholder="Enter SIM details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Battery */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Battery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="battery_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter battery type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="charging_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Charging</FormLabel>
                <FormControl>
                  <Input placeholder="Enter charging specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Communications */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Communications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="wlan_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WLAN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter WLAN specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bluetooth_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bluetooth</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Bluetooth specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="positioning"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GPS</FormLabel>
                <FormControl>
                  <Input placeholder="Enter GPS details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nfc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NFC</FormLabel>
                <FormControl>
                  <Input placeholder="Enter NFC details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="radio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Radio</FormLabel>
                <FormControl>
                  <Input placeholder="Enter radio specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usb"
            render={({ field }) => (
              <FormItem>
                <FormLabel>USB</FormLabel>
                <FormControl>
                  <Input placeholder="Enter USB specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Network */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Network</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="network_technology"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technology</FormLabel>
                <FormControl>
                  <Input placeholder="Enter network technology" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="network_2g_bands"
            render={({ field }) => (
              <FormItem>
                <FormLabel>2G bands</FormLabel>
                <FormControl>
                  <Input placeholder="Enter 2G bands" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="network_3g_bands"
            render={({ field }) => (
              <FormItem>
                <FormLabel>3G bands</FormLabel>
                <FormControl>
                  <Input placeholder="Enter 3G bands" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="network_4g_bands"
            render={({ field }) => (
              <FormItem>
                <FormLabel>4G bands</FormLabel>
                <FormControl>
                  <Input placeholder="Enter 4G bands" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="network_5g_bands"
            render={({ field }) => (
              <FormItem>
                <FormLabel>5G bands</FormLabel>
                <FormControl>
                  <Input placeholder="Enter 5G bands" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="network_speed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speed</FormLabel>
                <FormControl>
                  <Input placeholder="Enter network speed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Sound */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Sound</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="loudspeaker"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loudspeaker</FormLabel>
                <FormControl>
                  <Input placeholder="Enter loudspeaker details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="audio_jack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>3.5mm jack</FormLabel>
                <FormControl>
                  <Input placeholder="Enter audio jack details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="sensors_list"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sensors</FormLabel>
                <FormControl>
                  <Input placeholder="Enter sensors list" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="protection_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Protection</FormLabel>
                <FormControl>
                  <Input placeholder="Enter protection details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Miscellaneous */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Miscellaneous</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="models_list"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Models</FormLabel>
                <FormControl>
                  <Input placeholder="Enter models list" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colors_list"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors</FormLabel>
                <FormControl>
                  <Input placeholder="Enter colors list" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Details</FormLabel>
                <FormControl>
                  <Input placeholder="Enter price details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
