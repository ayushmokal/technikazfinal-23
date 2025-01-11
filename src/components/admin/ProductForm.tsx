import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { SpecificationsSection } from "./form-sections/SpecificationsSection";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mobileProductSchema, laptopProductSchema } from "@/schemas/productSchemas";
import type { ProductFormData } from "@/schemas/productSchemas";

interface UseProductFormProps {
  initialData?: ProductFormData;
  onSuccess?: () => void;
  productType?: 'mobile' | 'laptop';
}

export function ProductForm({ initialData, onSuccess, productType = 'mobile' }: UseProductFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productType === 'mobile' ? mobileProductSchema : laptopProductSchema),
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
      os: "",
      color: "",
      type: productType,
      ...(productType === 'mobile' ? {
        camera: "",
        chipset: "",
        resolution: "",
        screen_size: "",
        charging_specs: "",
      } : {
        graphics: "",
        ports: "",
      })
    } as ProductFormData,
  });

  const fillSampleData = () => {
    if (productType === 'mobile') {
      form.reset({
        name: "Sample Mobile Phone",
        brand: "Sample Brand",
        model_name: "Sample Model",
        price: 999,
        display_specs: "6.7-inch Dynamic AMOLED",
        processor: "Latest Snapdragon",
        ram: "8GB",
        storage: "256GB",
        battery: "5000mAh",
        os: "Android 14",
        color: "Phantom Black",
        type: 'mobile',
        camera: "108MP Main + 12MP Ultra Wide",
        chipset: "Latest Snapdragon",
        resolution: "1440 x 3200",
        screen_size: "6.7 inch",
        charging_specs: "45W Fast Charging",
      });
    } else {
      form.reset({
        name: "Sample Laptop",
        brand: "Sample Brand",
        model_name: "Sample Model",
        price: 1299,
        display_specs: "15.6-inch FHD IPS",
        processor: "Intel Core i7-12700H",
        ram: "16GB DDR5",
        storage: "512GB NVMe SSD",
        battery: "90Wh",
        os: "Windows 11 Home",
        color: "Space Gray",
        type: 'laptop',
        graphics: "NVIDIA RTX 3060 6GB",
        ports: "2x USB-C, 3x USB-A, HDMI, SD Card Reader"
      });
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      
      const { error } = initialData
        ? await supabase
            .from('products')
            .update(data)
            .eq('id', initialData.id)
        : await supabase
            .from('products')
            .insert(data)
            .select();

      if (error) throw error;

      toast({
        title: `Product ${initialData ? 'updated' : 'added'} successfully`,
        description: `The product has been ${initialData ? 'updated' : 'added'} to the database.`,
      });

      if (onSuccess && !initialData) {
        form.reset();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInfoSection form={form} />
        <SpecificationsSection form={form} productType={productType} />
        
        <div className="flex gap-4">
          <Button 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {initialData ? "Updating..." : "Adding..."}
              </>
            ) : (
              <>{initialData ? "Update Product" : "Add Product"}</>
            )}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={fillSampleData}
          >
            Fill Sample Data
          </Button>
        </div>
      </form>
    </Form>
  );
}