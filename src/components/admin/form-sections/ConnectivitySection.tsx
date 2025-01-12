import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "../ProductForm";

interface ConnectivitySectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function ConnectivitySection({ form }: ConnectivitySectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="wlan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>WLAN</FormLabel>
            <FormControl>
              <Input placeholder="Enter WLAN specifications" {...field} />
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
              <Input placeholder="Enter Bluetooth specifications" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="gps"
        render={({ field }) => (
          <FormItem>
            <FormLabel>GPS</FormLabel>
            <FormControl>
              <Input placeholder="Enter GPS specifications" {...field} />
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
              <Input placeholder="Enter NFC specifications" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="radio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Radio</FormLabel>
            <FormControl>
              <Input placeholder="Enter radio specifications" {...field} />
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
              <Input placeholder="Enter USB specifications" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}