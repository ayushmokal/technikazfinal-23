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
  onSuccess?: (productId: string) => void;
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
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      
      const table = productType === 'mobile' ? 'mobile_products' : 'laptops';
      
      const { error } = initialData
        ? await supabase
            .from(table)
            .update(data)
            .eq('id', initialData.id)
        : await supabase
            .from(table)
            .insert(data)
            .select();

      if (error) throw error;

      toast({
        title: `Product ${initialData ? 'updated' : 'added'} successfully`,
        description: `The product has been ${initialData ? 'updated' : 'added'} to the database.`,
      });

      if (onSuccess) {
        onSuccess(initialData?.id || '');
      }
      
      if (!initialData) {
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
        </div>
      </form>
    </Form>
  );
}