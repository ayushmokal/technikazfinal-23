import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";

interface CameraSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function CameraSection({ form }: CameraSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Camera</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="main_camera_features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Camera Features</FormLabel>
              <FormControl>
                <Input placeholder="Enter main camera features" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="camera_setup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Camera Setup</FormLabel>
              <FormControl>
                <Input placeholder="Enter camera setup" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="selfie_camera_features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selfie Camera Features</FormLabel>
              <FormControl>
                <Input placeholder="Enter selfie camera features" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="front_camera_setup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Front Camera Setup</FormLabel>
              <FormControl>
                <Input placeholder="Enter front camera setup" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}