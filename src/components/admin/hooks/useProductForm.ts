import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mobileProductSchema, laptopProductSchema } from "@/schemas/productSchemas";
import { useImageUpload } from "./useImageUpload";
import { useAuthCheck } from "./useAuthCheck";
import { useProductData } from "./useProductData";
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
    os: "",
    color: "",
    ...(productType === 'mobile' ? {
      camera: "",
      chipset: "",
      resolution: "",
      screen_size: "",
      charging_specs: "",
      network_technology: "",
      network_2g_bands: "",
      network_3g_bands: "",
      network_4g_bands: "",
      network_5g_bands: "",
      network_speed: "",
      launch_date: "",
      dimensions: "",
      weight: "",
      build_material: "",
      display_type: "",
      screen_protection: "",
      display_features: "",
      camera_features: "",
      video_recording: "",
      front_camera_setup: "",
      front_camera_video: "",
    } : {
      graphics: "",
      ports: "",
    }),
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

      const table = productType === 'mobile' ? 'mobile_products' : 'laptops';
      console.log(`Using table: ${table}`);

      const transformedData = {
        ...data,
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
      };
      
      console.log("Transformed data:", transformedData);

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

      let result;
      if (initialData?.id) {
        console.log("Updating existing product");
        result = await updateProduct(table, initialData.id, transformedData, productType);
      } else {
        console.log("Inserting new product");
        result = await insertProduct(table, transformedData, productType);
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
      onError?.(error);
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