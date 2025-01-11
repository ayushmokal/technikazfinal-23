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
        name="camera_features"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Camera Features</FormLabel>
            <FormControl>
              <Input placeholder="Enter camera features" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="camera_video"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Camera Video</FormLabel>
            <FormControl>
              <Input placeholder="Enter camera video capabilities" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="front_camera_features"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Front Camera Features</FormLabel>
            <FormControl>
              <Input placeholder="Enter front camera features" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="front_camera_video"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Front Camera Video</FormLabel>
            <FormControl>
              <Input placeholder="Enter front camera video capabilities" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}