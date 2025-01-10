import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";
import { Separator } from "@/components/ui/separator";
import { NetworkSection } from "./specs/NetworkSection";
import { DisplaySection } from "./specs/DisplaySection";
import { CameraSection } from "./specs/CameraSection";

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
      <NetworkSection form={form} />

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

      <h3 className="text-lg font-semibold">Display</h3>
      <DisplaySection form={form} />

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold">Camera</h3>
      <CameraSection form={form} />

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

        <FormField
          control={form.control}
          name="infrared"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Infrared</FormLabel>
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
      </div>
    </div>
  );
}