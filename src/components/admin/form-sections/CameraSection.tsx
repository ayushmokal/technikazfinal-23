import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import type { MobileProductData, LaptopProductData } from "../types/productTypes";

interface CameraSectionProps {
  form: UseFormReturn<MobileProductData | LaptopProductData>;
  productType: 'mobile' | 'laptop';
}

export function CameraSection({ form, productType }: CameraSectionProps) {
  if (productType !== 'mobile') return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Camera Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Main Camera</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="camera_setup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Camera Setup</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dual 48 MP, f/1.6" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="camera"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolution</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 48 MP + 12 MP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="camera_flash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flash</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dual-LED dual-tone flash" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="camera_modes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., HDR, panorama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="video_recording"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Recording</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 4K@24/25/30/60fps" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="camera_autofocus"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Autofocus</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="camera_ois"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>OIS</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4">Selfie Camera</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="front_camera_setup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Camera Setup</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Single 12 MP, f/1.9" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="front_camera"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolution</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 12 MP" {...field} />
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
                  <FormLabel>Video Recording</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 4K@24/25/30/60fps" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}