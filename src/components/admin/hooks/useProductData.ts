import { supabase } from "@/integrations/supabase/client";
import type { MobileProductData, LaptopProductData } from "../types/productTypes";

type TableName = 'mobile_products' | 'laptops';

export const useProductData = () => {
  const updateProduct = async (
    table: TableName,
    id: string,
    data: MobileProductData | LaptopProductData,
    productType: 'mobile' | 'laptop'
  ) => {
    const updateData = productType === 'mobile'
      ? {
          ...data,
          camera: (data as MobileProductData).camera,
          battery: data.battery,
          brand: data.brand,
          display_specs: data.display_specs,
          processor: data.processor,
          ram: data.ram,
          storage: data.storage,
          name: data.name,
        }
      : {
          ...data,
          battery: data.battery,
          brand: data.brand,
          display_specs: data.display_specs,
          processor: data.processor,
          ram: data.ram,
          storage: data.storage,
          name: data.name,
        };

    const { data: updatedData, error } = await supabase
      .from(table)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return updatedData;
  };

  const insertProduct = async (
    table: TableName,
    data: MobileProductData | LaptopProductData,
    productType: 'mobile' | 'laptop'
  ) => {
    // Create a clean data object without undefined values
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    ) as MobileProductData | LaptopProductData;

    // Ensure required fields are included and properly typed
    const baseInsertData = {
      name: cleanData.name,
      price: cleanData.price,
      brand: cleanData.brand,
      model_name: cleanData.model_name,
      display_specs: cleanData.display_specs,
      processor: cleanData.processor,
      ram: cleanData.ram,
      storage: cleanData.storage,
      battery: cleanData.battery,
      os: cleanData.os,
      color: cleanData.color,
      image_url: cleanData.image_url,
      gallery_images: cleanData.gallery_images,
    };

    const insertData = productType === 'mobile'
      ? {
          ...baseInsertData,
          camera: (cleanData as MobileProductData).camera,
          front_camera: (cleanData as MobileProductData).front_camera,
          chipset: (cleanData as MobileProductData).chipset,
          charging_specs: (cleanData as MobileProductData).charging_specs,
          screen_size: (cleanData as MobileProductData).screen_size,
          resolution: (cleanData as MobileProductData).resolution,
          camera_details: (cleanData as MobileProductData).camera_details,
          sensor_specs: (cleanData as MobileProductData).sensor_specs,
          network_specs: (cleanData as MobileProductData).network_specs,
          general_specs: (cleanData as MobileProductData).general_specs,
        }
      : {
          ...baseInsertData,
          graphics: (cleanData as LaptopProductData).graphics,
          ports: (cleanData as LaptopProductData).ports,
          connectivity_specs: (cleanData as LaptopProductData).connectivity_specs,
        };

    try {
      const { data: insertedData, error } = await supabase
        .from(table)
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return insertedData;
    } catch (error) {
      console.error('Error inserting product:', error);
      throw error;
    }
  };

  return {
    updateProduct,
    insertProduct,
  };
};