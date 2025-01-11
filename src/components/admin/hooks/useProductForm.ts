import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { mobileProductSchema, laptopProductSchema } from "@/schemas/productSchemas";
import type { MobileProductData, LaptopProductData, ProductFormData } from "../types/productTypes";

interface UseProductFormProps {
  initialData?: (MobileProductData | LaptopProductData) & { id?: string };
  onSuccess?: (productId: string) => void | Promise<void>;
  productType?: 'mobile' | 'laptop';
}

export function useProductForm({ initialData, onSuccess, productType: propProductType }: UseProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [productType] = useState<'mobile' | 'laptop'>(propProductType || 'mobile');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  
  const schema = productType === 'mobile' ? mobileProductSchema : laptopProductSchema;
  
  const defaultValues: ProductFormData = {
    name: "",
    brand: "",
    model_name: "",
    price: 0,
    display_specs: "",
    processor: "",
    ram: "",
    storage: "",
    battery: "",
    camera: productType === 'mobile' ? "" : undefined,
  };

  const form = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || defaultValues,
  });

  const handleMainImageChange = (file: File | null) => {
    setMainImage(file);
    form.setValue("image_url", file ? URL.createObjectURL(file) : "");
  };

  const handleGalleryImagesChange = (files: File[]) => {
    setGalleryImages(files);
    form.setValue("gallery_images", files.map(file => URL.createObjectURL(file)));
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGalleryImages = [...galleryImages];
    newGalleryImages.splice(index, 1);
    setGalleryImages(newGalleryImages);
    form.setValue("gallery_images", newGalleryImages.map(file => URL.createObjectURL(file)));
  };

  const insertProduct = async (table: string, data: ProductFormData) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  };

  const updateProduct = async (table: string, id: string, data: ProductFormData) => {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      const table = productType === 'mobile' ? 'mobile_products' : 'laptops';
      
      let result;
      if (initialData?.id) {
        console.log("Updating existing product");
        result = await updateProduct(table, initialData.id, data);
      } else {
        console.log("Inserting new product");
        result = await insertProduct(table, data);
      }

      if (!result) {
        throw new Error("Failed to save product");
      }

      if (onSuccess) {
        await onSuccess(result.id);
      }

      return result;
    } catch (error) {
      console.error("Error in onSubmit:", error);
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
    handleRemoveGalleryImage,
    onSubmit,
  };
}
