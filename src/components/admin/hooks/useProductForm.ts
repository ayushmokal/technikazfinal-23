import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mobileProductSchema, laptopProductSchema } from "@/schemas/productSchemas";
import { useImageUpload } from "./useImageUpload";
import { useAuthCheck } from "./useAuthCheck";
import { useProductData } from "./useProductData";
import { supabase } from "@/integrations/supabase/client";
import type { UseProductFormProps, MobileProductData, LaptopProductData } from "../types/productTypes";
import { useToast } from "@/hooks/use-toast";

export function useProductForm({ initialData, onSuccess, productType: propProductType }: UseProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState<'mobile' | 'laptop'>(propProductType || 'mobile');
  const { toast } = useToast();
  const { updateProduct, insertProduct } = useProductData();
  const { 
    mainImageFile, 
    galleryImageFiles, 
    handleMainImageChange, 
    handleGalleryImagesChange, 
    handleRemoveGalleryImage,
    uploadImage 
  } = useImageUpload();

  const defaultValues = initialData || {
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
  };

  const form = useForm({
    resolver: zodResolver(productType === 'mobile' ? mobileProductSchema : laptopProductSchema),
    defaultValues: defaultValues as any,
  });

  useEffect(() => {
    if (propProductType) {
      setProductType(propProductType);
    }
  }, [propProductType]);

  const onSubmit = async (data: MobileProductData | LaptopProductData) => {
    try {
      setIsLoading(true);
      console.log("Starting form submission with data:", data);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Please login to continue");
      }

      // Transform numeric string to number for price
      const transformedData = {
        ...data,
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
      };

      // Handle image uploads
      if (mainImageFile) {
        console.log("Uploading main image");
        const imageUrl = await uploadImage(mainImageFile, 'main');
        transformedData.image_url = imageUrl;
      }

      if (galleryImageFiles.length > 0) {
        console.log("Uploading gallery images");
        const uploadPromises = galleryImageFiles.map(file => 
          uploadImage(file, 'gallery')
        );
        const newGalleryImages = await Promise.all(uploadPromises);
        
        const existingGalleryImages = transformedData.gallery_images || [];
        transformedData.gallery_images = [...existingGalleryImages, ...newGalleryImages];
      }

      const table = productType === 'mobile' ? 'mobile_products' : 'laptops';
      console.log(`Using table: ${table}`);
      
      let result;
      if (initialData?.id) {
        console.log("Updating existing product");
        result = await updateProduct(table, initialData.id, transformedData, productType);
      } else {
        console.log("Inserting new product");
        result = await insertProduct(table, transformedData, productType);
      }

      if (!result) {
        throw new Error("No result returned from database operation");
      }

      console.log("Operation completed successfully");
      form.reset();
      if (onSuccess) {
        onSuccess(result.id);
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