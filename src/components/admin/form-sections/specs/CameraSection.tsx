import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";

interface CameraSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function CameraSection({ form }: CameraSectionProps) {
  return (
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
    </div>
  );
}