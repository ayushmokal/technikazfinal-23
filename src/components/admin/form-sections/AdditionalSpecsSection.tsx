import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ProductFormData } from "@/schemas/productSchemas";

interface AdditionalSpecsSectionProps {
  form: UseFormReturn<ProductFormData>;
  productType: 'mobile' | 'laptop';
}

export function AdditionalSpecsSection({ form, productType }: AdditionalSpecsSectionProps) {
  if (productType !== 'mobile') return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Launch Details Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Launch Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="launch_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Announced</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., 2024, September 09" 
                      {...field} 
                      value={field.value || ''} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="release_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Coming soon, Exp. release 2024, September 20" 
                      {...field} 
                      value={field.value || ''} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4">Platform</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="os"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operating System</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., iOS 18" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chipset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chipset</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Apple A18" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Memory Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Memory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="ram_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RAM Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 8GB RAM" {...field} value={field.value || ''} />
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
                    <Input placeholder="e.g., 256GB" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Display Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Display</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="display_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Super Retina XDR OLED" {...field} value={field.value || ''} />
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
                  <FormLabel>Resolution</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1290 x 2796 pixels" {...field} value={field.value || ''} />
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
                  <FormLabel>Protection</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ceramic Shield glass" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="peak_brightness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peak Brightness</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2000 nits" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Body Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Body</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 160.9 mm" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 77.8 mm" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thickness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thickness</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 7.8 mm" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 199 g" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="build_material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Build</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Glass front, aluminum frame" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waterproof"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Protection Rating</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., IP68 dust/water resistant" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Battery Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Battery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="battery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Li-Ion 4000 mAh" {...field} value={field.value || ''} />
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
                  <FormLabel>Charging</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 25W wired, 15W wireless" {...field} value={field.value || ''} />
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
