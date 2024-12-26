import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "../ProductForm";

interface SpecificationsSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function SpecificationsSection({ form }: SpecificationsSectionProps) {
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
    </div>
  );
}