import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
                  <FormLabel>Screen Resolution</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter screen resolution" {...field} />
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