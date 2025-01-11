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

export function useProductForm({ initialData, onSuccess, productType: propProductType, onError }: UseProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState<'mobile' | 'laptop'>(propProductType || 'mobile');
  const { toast } = useAuthCheck();
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
        console.log("No active session found");
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please login again to continue.",
        });
        return;
      }

      // Transform numeric string to number for price
      const transformedData = {
        ...data,
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
      };

      console.log("Transformed data:", transformedData);

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
        const { data: updatedData, error } = await supabase
          .from(table)
          .update(transformedData)
          .eq('id', initialData.id)
          .select()
          .single();

        if (error) {
          console.error("Error updating product:", error);
          throw error;
        }
        
        console.log("Product updated successfully:", updatedData);
        result = updatedData;
        
        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} updated successfully`,
        });
      } else {
        console.log("Inserting new product");
        const { data: insertedData, error } = await supabase
          .from(table)
          .insert([transformedData])
          .select()
          .single();

        if (error) {
          console.error("Error inserting product:", error);
          throw error;
        }
        
        console.log("Product inserted successfully:", insertedData);
        result = insertedData;

        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} added successfully`,
        });
      }

      if (result) {
        console.log("Operation completed successfully, resetting form");
        form.reset();
        onSuccess?.(result.id);
      } else {
        throw new Error("No result returned from database operation");
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error.message?.includes('JWT')) {
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Please login again to continue.",
        });
      } else {
        onError?.(error);
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