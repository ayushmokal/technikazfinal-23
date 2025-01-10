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

        {productType === 'mobile' ? (
          <FormField
            control={form.control}
            name="camera"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camera</FormLabel>
                <FormControl>
                  <Input placeholder="Enter camera specifications" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
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
        )}
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

      {/* Add all other sections following the same pattern */}
      {/* ... Display, Platform, Memory, Camera, Sound, etc. */}
    </div>
  );
}
