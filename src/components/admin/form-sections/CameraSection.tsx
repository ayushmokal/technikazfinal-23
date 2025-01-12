import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "../ProductForm";

interface CameraSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function CameraSection({ form }: CameraSectionProps) {
  return (
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
        name="main_camera_video"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Main Camera Video</FormLabel>
            <FormControl>
              <Input placeholder="Enter main camera video capabilities" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="selfie_camera_video"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Selfie Camera Video</FormLabel>
            <FormControl>
              <Input placeholder="Enter selfie camera video capabilities" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}