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
    );

    const insertData = productType === 'mobile'
      ? {
          ...cleanData,
          camera: (cleanData as MobileProductData).camera,
          battery: cleanData.battery,
          brand: cleanData.brand,
          display_specs: cleanData.display_specs,
          processor: cleanData.processor,
          ram: cleanData.ram,
          storage: cleanData.storage,
          name: cleanData.name,
        }
      : {
          ...cleanData,
          battery: cleanData.battery,
          brand: cleanData.brand,
          display_specs: cleanData.display_specs,
          processor: cleanData.processor,
          ram: cleanData.ram,
          storage: cleanData.storage,
          name: cleanData.name,
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