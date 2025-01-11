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
    <div className="space-y-6">
      {/* Launch Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Launch Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="launch_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Announced
                  <span className="text-red-500">*</span>
                </FormLabel>
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
                <FormLabel className="flex items-center gap-1">
                  Status
                  <span className="text-red-500">*</span>
                </FormLabel>
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
                <FormLabel className="flex items-center gap-1">
                  Operating System
                  <span className="text-red-500">*</span>
                </FormLabel>
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
                <FormLabel className="flex items-center gap-1">
                  Chipset
                  <span className="text-red-500">*</span>
                </FormLabel>
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
                <FormLabel className="flex items-center gap-1">
                  RAM
                  <span className="text-red-500">*</span>
                </FormLabel>
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
                <FormLabel className="flex items-center gap-1">
                  Storage
                  <span className="text-red-500">*</span>
                </FormLabel>
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
            name="display_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Display Type
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter display type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="screen_protection"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Protection
                  <span className="text-red-500">*</span>
                </FormLabel>
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
                <FormLabel className="flex items-center gap-1">
                  Features
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter display features" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Camera */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Camera</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="main_camera_features"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Main Camera
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter main camera features" {...field} />
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
                <FormLabel className="flex items-center gap-1">
                  Selfie Camera
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter selfie camera features" {...field} />
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
                <FormLabel className="flex items-center gap-1">
                  Dimensions
                  <span className="text-red-500">*</span>
                </FormLabel>
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
                <FormLabel className="flex items-center gap-1">
                  Build
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter build material" {...field} />
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
            name="battery"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Battery
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter battery specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="charging_specs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Charging
                  <span className="text-red-500">*</span>
                </FormLabel>
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
            name="wlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  WLAN
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter WLAN specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bluetooth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Bluetooth
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Bluetooth specifications" {...field} />
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
