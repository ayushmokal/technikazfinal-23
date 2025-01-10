import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Network</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="network_technology"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Network Technology</FormLabel>
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
              <FormLabel>2G Bands</FormLabel>
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
              <FormLabel>3G Bands</FormLabel>
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
              <FormLabel>4G Bands</FormLabel>
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
              <FormLabel>5G Bands</FormLabel>
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
              <FormLabel>Network Speed</FormLabel>
              <FormControl>
                <Input placeholder="Enter network speed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Launch</h3>
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

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Body</h3>
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
          name="build_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Build</FormLabel>
              <FormControl>
                <Input placeholder="Enter build details" {...field} />
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

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Display</h3>
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
              <FormLabel>Display Resolution</FormLabel>
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
              <FormLabel>Display Protection</FormLabel>
              <FormControl>
                <Input placeholder="Enter display protection" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="display_features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Features</FormLabel>
              <FormControl>
                <Input placeholder="Enter display features" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Platform</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="os"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OS</FormLabel>
              <FormControl>
                <Input placeholder="Enter OS" {...field} />
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
                <Input placeholder="Enter chipset" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPU</FormLabel>
              <FormControl>
                <Input placeholder="Enter CPU" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gpu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GPU</FormLabel>
              <FormControl>
                <Input placeholder="Enter GPU" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Memory</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="card_slot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Slot</FormLabel>
              <FormControl>
                <Input placeholder="Enter card slot details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="internal_storage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Internal Storage</FormLabel>
              <FormControl>
                <Input placeholder="Enter internal storage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storage_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Storage Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter storage type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Main Camera</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="main_camera_features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Camera Features</FormLabel>
              <FormControl>
                <Input placeholder="Enter main camera features" {...field} />
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
              <FormLabel>Main Camera Video</FormLabel>
              <FormControl>
                <Input placeholder="Enter main camera video" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Selfie Camera</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="selfie_camera_features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selfie Camera Features</FormLabel>
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
              <FormLabel>Selfie Camera Video</FormLabel>
              <FormControl>
                <Input placeholder="Enter selfie camera video" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Sound</h3>
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
              <FormLabel>3.5mm Jack</FormLabel>
              <FormControl>
                <Input placeholder="Enter audio jack details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Communications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="wlan_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WLAN</FormLabel>
              <FormControl>
                <Input placeholder="Enter WLAN details" {...field} />
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
                <Input placeholder="Enter Bluetooth details" {...field} />
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
                <Input placeholder="Enter radio details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="infrared"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Infrared</FormLabel>
              <FormControl>
                <Input placeholder="Enter infrared details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Features</h3>
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
      </div>

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Battery</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="battery_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battery Type</FormLabel>
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
              <FormLabel>Charging Details</FormLabel>
              <FormControl>
                <Input placeholder="Enter charging details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Misc</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="models_list"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Models</FormLabel>
              <FormControl>
                <Input placeholder="Enter models" {...field} />
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
                <Input placeholder="Enter colors" {...field} />
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
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Enter price details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
