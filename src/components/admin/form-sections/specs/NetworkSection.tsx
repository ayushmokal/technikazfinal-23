import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";

interface NetworkSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function NetworkSection({ form }: NetworkSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Network</h3>
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
    </div>
  );
}