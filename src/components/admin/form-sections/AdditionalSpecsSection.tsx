import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";

interface AdditionalSpecsSectionProps {
  form: UseFormReturn<ProductFormData>;
  productType: 'mobile' | 'laptop';
}

export function AdditionalSpecsSection({ form, productType }: AdditionalSpecsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Additional Specifications</h3>
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

        {productType === 'mobile' ? (
          <>
            <FormField
              control={form.control}
              name="launch_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Launch Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter launch date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="custom_ui"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom UI</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter custom UI details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="software_support"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Software Support</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter software support details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="architecture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Architecture</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter architecture details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fabrication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fabrication</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter fabrication details" {...field} />
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
                    <Input placeholder="Enter graphics details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ram_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RAM Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter RAM type" {...field} />
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
              name="charging_specs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charging Specifications</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter charging specifications" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="display_type"
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
              name="screen_size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Screen Size</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter screen size" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolution</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter resolution" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aspect_ratio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aspect Ratio</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter aspect ratio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pixel_density"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pixel Density</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pixel density (PPI)" {...field} />
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
                  <FormLabel>Screen Protection</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter screen protection details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bezel_less"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bezel-less Display</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="touch_screen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Touch Screen</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="peak_brightness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peak Brightness</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter peak brightness (nits)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hdr_support"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HDR Support</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter HDR support details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="refresh_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refresh Rate</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter refresh rate (Hz)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter height (mm)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter width (mm)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thickness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thickness</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter thickness (mm)" {...field} />
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
                    <Input placeholder="Enter weight (g)" {...field} />
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
                  <FormLabel>Build Material</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter build material" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="waterproof"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waterproof</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter waterproof rating" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ruggedness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruggedness</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ruggedness details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="ports"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ports</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter available ports" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}