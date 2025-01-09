import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
                    <Input placeholder="e.g., Triple Camera Setup" {...field} />
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
                    <Input placeholder="e.g., 48MP + 12MP + 5MP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="camera_autofocus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autofocus</FormLabel>
                  <FormControl>
                    <Input type="checkbox" {...field} className="w-4 h-4" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="camera_ois"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OIS</FormLabel>
                  <FormControl>
                    <Input type="checkbox" {...field} className="w-4 h-4" />
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
                    <Input placeholder="e.g., Dual LED Flash" {...field} />
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
                  <FormLabel>Shooting Modes</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Night Mode, Portrait" {...field} />
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
                    <Input placeholder="e.g., 4K@60fps" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4">Front Camera</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="front_camera_setup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Camera Setup</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Single Camera" {...field} />
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
                    <Input placeholder="e.g., 32MP" {...field} />
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
                    <Input placeholder="e.g., 1080p@30fps" {...field} />
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