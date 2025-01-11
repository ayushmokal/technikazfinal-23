import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/components/admin/types/productTypes";

interface DisplaySectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function DisplaySection({ form }: DisplaySectionProps) {
  return (
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
            <FormLabel>Display Resolution</FormLabel>
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
            <FormLabel>Display Protection</FormLabel>
            <FormControl>
              <Input placeholder="Enter display protection" {...field} />
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
    </div>
  );
}