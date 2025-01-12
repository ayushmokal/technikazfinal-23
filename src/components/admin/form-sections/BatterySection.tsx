import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "../ProductForm";

interface BatterySectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function BatterySection({ form }: BatterySectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="battery_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Battery Type</FormLabel>
            <FormControl>
              <Input placeholder="Enter battery type" {...field} />
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
  );
}