import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";

interface DisplaySectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function DisplaySection({ form }: DisplaySectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Display</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          name="resolution"
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
          name="screen_protection"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Screen Protection</FormLabel>
              <FormControl>
                <Input placeholder="Enter screen protection" {...field} />
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

        <FormField
          control={form.control}
          name="peak_brightness"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peak Brightness</FormLabel>
              <FormControl>
                <Input placeholder="Enter peak brightness" {...field} />
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
                <Input placeholder="Enter refresh rate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}