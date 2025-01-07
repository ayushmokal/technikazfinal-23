import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { 
  mobileProductSchema, 
  laptopProductSchema,
  type ProductFormData 
} from "@/schemas/productSchemas";
import { useImageUpload } from "./useImageUpload";
import { useAuthCheck } from "./useAuthCheck";
import type { Json } from "@/integrations/supabase/types";

interface UseProductFormProps {
  initialData?: ProductFormData & { id?: string };
  onSuccess?: (productId: string) => void;
  productType?: 'mobile' | 'laptop';
}

type MobileProductData = {
  name: string;
  brand: string;
  model_name?: string;
  price: number;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  camera: string;
  os?: string;
  color?: string;
  image_url?: string;
  gallery_images?: string[];
  multimedia_specs?: Json;
  sensor_specs?: Json;
  network_specs?: Json;
  design_specs?: Json;
  camera_details?: Json;
  performance_specs?: Json;
  display_details?: Json;
  general_specs?: Json;
  chipset?: string;
  charging_specs?: string;
  resolution?: string;
  screen_size?: string;
};

type LaptopProductData = {
  name: string;
  brand: string;
  model_name?: string;
  price: number;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  graphics?: string;
  os?: string;
  ports?: string;
  color?: string;
  image_url?: string;
  gallery_images?: string[];
  multimedia_specs?: Json;
  connectivity_specs?: Json;
  design_specs?: Json;
  performance_specs?: Json;
  display_details?: Json;
};

export function useProductForm({ initialData, onSuccess, productType: propProductType }: UseProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState<'mobile' | 'laptop'>(propProductType || 'mobile');
  const { toast, navigate } = useAuthCheck();
  const { 
    mainImageFile, 
    galleryImageFiles, 
    handleMainImageChange, 
    handleGalleryImagesChange, 
    handleRemoveGalleryImage,
    uploadImage 
  } = useImageUpload();

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
      ...(productType === 'mobile' ? { camera: "" } : {}),
      gallery_images: [],
    },
  });

  useEffect(() => {
    if (propProductType) {
      setProductType(propProductType);
    }
  }, [propProductType]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please login again to continue.",
        });
        navigate("/admin/login");
        return;
      }

      if (mainImageFile) {
        data.image_url = await uploadImage(mainImageFile, 'main');
      }

      if (galleryImageFiles.length > 0) {
        const uploadPromises = galleryImageFiles.map(file => 
          uploadImage(file, 'gallery')
        );
        const newGalleryImages = await Promise.all(uploadPromises);
        
        const existingGalleryImages = data.gallery_images || [];
        data.gallery_images = [...existingGalleryImages, ...newGalleryImages];
      }

      const table = productType === 'mobile' ? 'mobile_products' : 'laptops';
      
      let result;
      if (initialData?.id) {
        // Ensure all required fields are present for the update
        const updateData = productType === 'mobile' 
          ? {
              ...data,
              camera: (data as MobileProductData).camera || "",
              battery: data.battery || "",
              brand: data.brand || "",
              display_specs: data.display_specs || "",
              processor: data.processor || "",
              ram: data.ram || "",
              storage: data.storage || "",
              name: data.name || "",
            } as MobileProductData
          : {
              ...data,
              battery: data.battery || "",
              brand: data.brand || "",
              display_specs: data.display_specs || "",
              processor: data.processor || "",
              ram: data.ram || "",
              storage: data.storage || "",
              name: data.name || "",
            } as LaptopProductData;

        const { data: updatedData, error } = await supabase
          .from(table)
          .update(updateData)
          .eq('id', initialData.id)
          .select()
          .single();

        if (error) throw error;
        result = updatedData;

        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} updated successfully`,
        });
      } else {
        // Ensure all required fields are present for the insert
        const insertData = productType === 'mobile' 
          ? {
              ...data,
              camera: (data as MobileProductData).camera || "",
              battery: data.battery || "",
              brand: data.brand || "",
              display_specs: data.display_specs || "",
              processor: data.processor || "",
              ram: data.ram || "",
              storage: data.storage || "",
              name: data.name || "",
            } as MobileProductData
          : {
              ...data,
              battery: data.battery || "",
              brand: data.brand || "",
              display_specs: data.display_specs || "",
              processor: data.processor || "",
              ram: data.ram || "",
              storage: data.storage || "",
              name: data.name || "",
            } as LaptopProductData;

        const { data: insertedData, error } = await supabase
          .from(table)
          .insert(insertData)
          .select()
          .single();

        if (error) throw error;
        result = insertedData;

        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} added successfully`,
        });
      }

      form.reset();
      onSuccess?.(result.id);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error.message?.includes('JWT')) {
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Please login again to continue.",
        });
        navigate("/admin/login");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to save product",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    productType,
    handleMainImageChange,
    handleGalleryImagesChange,
    handleRemoveGalleryImage: (index: number) => handleRemoveGalleryImage(index, form),
    onSubmit,
  };
}