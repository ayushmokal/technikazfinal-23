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
  const commonFields = (
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
    </div>
  );

  if (productType === 'laptop') {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Key Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commonFields}
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
          <FormField
            control={form.control}
            name="ports"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ports</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ports specifications" {...field} />
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
      <div>
        <h3 className="text-lg font-semibold mb-4">Key Specifications</h3>
        {commonFields}
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <FormField
            control={form.control}
            name="chipset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chipset</FormLabel>
                <FormControl>
                  <Input placeholder="Enter chipset specifications" {...field} />
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
                  <Input placeholder="Enter resolution specifications" {...field} />
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
        </div>
      </div>
    </div>
  );
}