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

        {/* Communications Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Communications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="wlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WLAN</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Wi-Fi 802.11 a/b/g/n/ac/6/7" 
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
              name="bluetooth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bluetooth</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., 5.3, A2DP, LE" 
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
              name="nfc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NFC</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Yes/No" 
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
              name="positioning"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Positioning</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., GPS, GLONASS, GALILEO" 
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
              name="usb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>USB</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., USB Type-C 2.0" 
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

        {/* Network Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Network</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="network_technology"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technology</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., GSM / HSPA / LTE / 5G" 
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
              name="network_2g_bands"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>2G bands</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="GSM bands" 
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
              name="network_3g_bands"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>3G bands</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="HSDPA bands" 
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
              name="network_4g_bands"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>4G bands</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="LTE bands" 
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
              name="network_5g_bands"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>5G bands</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="5G bands" 
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
              name="network_speed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speed</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., HSPA, LTE-A, 5G" 
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

        {/* Sound Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sound</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="loudspeaker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loudspeaker</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Yes, with stereo speakers" 
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
              name="audio_jack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>3.5mm jack</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Yes/No" 
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

        {/* Features Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="sensors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sensors</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Fingerprint, accelerometer, gyro" 
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

        {/* Miscellaneous Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Miscellaneous</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="models"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Models</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., A2345, A2346" 
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
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Black, White, Gold" 
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
      </CardContent>
    </Card>
  );
}