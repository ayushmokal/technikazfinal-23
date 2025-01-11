import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";

interface NetworkSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function NetworkSection({ form }: NetworkSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}