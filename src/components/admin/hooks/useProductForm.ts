import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mobileProductSchema, laptopProductSchema } from "@/schemas/productSchemas";
import { useImageUpload } from "./useImageUpload";
import { useProductData } from "./useProductData";
import { supabase } from "@/integrations/supabase/client";
import type { UseProductFormProps, MobileProductData, LaptopProductData, ProductFormData } from "../types/productTypes";

export function useProductForm({ initialData, onSuccess, productType: propProductType }: UseProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState<'mobile' | 'laptop'>(propProductType || 'mobile');
  const { updateProduct, insertProduct } = useProductData();
  const { 
    mainImageFile, 
    galleryImageFiles, 
    handleMainImageChange, 
    handleGalleryImagesChange, 
    handleRemoveGalleryImage,
    uploadImage 
  } = useImageUpload();

  const schema = productType === 'mobile' ? mobileProductSchema : laptopProductSchema;
  
  const defaultValues: ProductFormData = initialData || {
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
      charging_specs: "",
      resolution: "",
      screen_size: "",
      network_technology: "",
      network_2g_bands: "",
      network_3g_bands: "",
      network_4g_bands: "",
      network_5g_bands: "",
      network_speed: "",
      display_type_details: "",
      display_resolution_details: "",
      display_protection: "",
      display_features: "",
      main_camera_features: "",
      main_camera_video: "",
      selfie_camera_features: "",
      selfie_camera_video: "",
    } : {
      graphics: "",
      ports: "",
    })
  };

  const form = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (propProductType) {
      setProductType(propProductType);
    }
  }, [propProductType]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      console.log("Starting form submission with data:", data);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Please login to continue");
      }

      if (mainImageFile) {
        console.log("Uploading main image");
        const imageUrl = await uploadImage(mainImageFile, 'main');
        data.image_url = imageUrl;
      }

      if (galleryImageFiles.length > 0) {
        console.log("Uploading gallery images");
        const uploadPromises = galleryImageFiles.map(file => 
          uploadImage(file, 'gallery')
        );
        const newGalleryImages = await Promise.all(uploadPromises);
        
        const existingGalleryImages = data.gallery_images || [];
        data.gallery_images = [...existingGalleryImages, ...newGalleryImages];
      }

      const table = productType === 'mobile' ? 'mobile_products' : 'laptops';
      console.log(`Using table: ${table}`);
      
      let result;
      if (initialData?.id) {
        console.log("Updating existing product");
        result = await updateProduct(table, initialData.id, data, productType);
      } else {
        console.log("Inserting new product");
        result = await insertProduct(table, data, productType);
      }

      if (!result) {
        throw new Error("No result returned from database operation");
      }

      console.log("Operation completed successfully:", result);
      if (onSuccess) {
        await onSuccess(result.id);
      }
      return result;
    } catch (error: any) {
      console.error('Error submitting form:', error);
      throw error;
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