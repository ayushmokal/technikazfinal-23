import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "./ImageUpload";
import { Form } from "@/components/ui/form";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { SpecificationsSection } from "./form-sections/SpecificationsSection";
import { AdditionalSpecsSection } from "./form-sections/AdditionalSpecsSection";
import { NetworkSection } from "./form-sections/NetworkSection";
import { DisplaySection } from "./form-sections/DisplaySection";
import { CameraSection } from "./form-sections/CameraSection";
import { ConnectivitySection } from "./form-sections/ConnectivitySection";
import { BatterySection } from "./form-sections/BatterySection";

export interface ProductFormData {
  id?: string;
  name: string;
  brand: string;
  model_name?: string;
  price: number;
  image_url?: string;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  os?: string;
  color?: string;
  camera?: string;
  chipset?: string;
  resolution?: string;
  screen_size?: string;
  charging_specs?: string;
  graphics?: string;
  ports?: string;
  // Network
  network_technology?: string;
  network_2g_bands?: string;
  network_3g_bands?: string;
  network_4g_bands?: string;
  network_5g_bands?: string;
  network_speed?: string;
  // Launch
  launch_date?: string;
  status?: string;
  // Body
  dimensions?: string;
  build_details?: string;
  build_material?: string;
  sim?: string;
  // Display
  display_type?: string;
  screen_protection?: string;
  display_features?: string;
  // Camera
  main_camera_features?: string;
  selfie_camera_features?: string;
  main_camera_video?: string;
  selfie_camera_video?: string;
  // Sound
  loudspeaker?: string;
  jack_3_5mm?: string;
  // Connectivity
  wlan?: string;
  bluetooth?: string;
  gps?: string;
  nfc?: string;
  radio?: string;
  usb?: string;
  // Features
  sensors?: string;
  // Battery
  battery_type?: string;
  // Misc
  colors?: string;
  models?: string;
  sar?: string;
  sar_eu?: string;
  // Performance
  performance?: string;
  cpu?: string;
  gpu?: string;
  internal_storage?: string;
  card_slot?: string;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  onSuccess?: () => void;
  productType?: 'mobile' | 'laptop';
}

export function ProductForm({ initialData, onSuccess, productType: propProductType }: ProductFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productType, setProductType] = useState<'mobile' | 'laptop'>(propProductType || 'mobile');

  const form = useForm<ProductFormData>({
    defaultValues: initialData || {
      name: "",
      brand: "",
      model_name: "",
      price: 0,
      display_specs: "",
      processor: "",
      ram: "",
      storage: "",
      battery: "",
    },
  });

  useEffect(() => {
    if (propProductType) {
      setProductType(propProductType);
    }
  }, [propProductType]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);

      // Handle image upload if a new image is selected
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from("blog-images")
          .upload(fileName, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw uploadError;
        }

        // Get the public URL after successful upload
        const { data: { publicUrl } } = supabase.storage
          .from("blog-images")
          .getPublicUrl(fileName);

        data.image_url = publicUrl;
      }

      const table = productType === 'mobile' ? 'mobile_products' : 'laptops';
      
      if (initialData?.id) {
        const { error } = await supabase
          .from(table)
          .update(data)
          .eq('id', initialData.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} updated successfully`,
        });
      } else {
        const { error } = await supabase
          .from(table)
          .insert([data]);

        if (error) throw error;

        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} added successfully`,
        });
      }

      form.reset();
      setImageFile(null);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save product",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="mobile" className="w-full" onValueChange={(value) => setProductType(value as 'mobile' | 'laptop')}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mobile">Mobile Phone</TabsTrigger>
        <TabsTrigger value="laptop">Laptop</TabsTrigger>
      </TabsList>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <BasicInfoSection form={form} />
          <SpecificationsSection form={form} />
          <AdditionalSpecsSection form={form} productType={productType} />
          
          {productType === 'mobile' && (
            <>
              <NetworkSection form={form} />
              <DisplaySection form={form} />
              <CameraSection form={form} />
              <ConnectivitySection form={form} />
              <BatterySection form={form} />
            </>
          )}
          
          <ImageUpload 
            onChange={handleImageChange} 
            currentImageUrl={initialData?.image_url}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Update" : "Add"} {productType === 'mobile' ? 'Mobile Phone' : 'Laptop'}
          </Button>
        </form>
      </Form>
    </Tabs>
  );
}
