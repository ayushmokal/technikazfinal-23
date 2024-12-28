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
}

interface ProductFormProps {
  initialData?: ProductFormData;
  onSuccess?: () => void;
  productType?: 'mobile' | 'laptop';
}

export function ProductForm({ initialData, onSuccess, productType: propProductType }: ProductFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleImageUrl = (url: string) => {
    form.setValue('image_url', url);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);

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
      onSuccess?.();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
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
          
          <ImageUpload onChange={handleImageUrl} />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : `Add ${productType === 'mobile' ? 'Mobile Phone' : 'Laptop'}`}
          </Button>
        </form>
      </Form>
    </Tabs>
  );
}