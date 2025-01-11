import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";

interface DisplaySectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function DisplaySection({ form }: DisplaySectionProps) {
  return (
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
    </div>
  );
}