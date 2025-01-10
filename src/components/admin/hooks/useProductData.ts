import { supabase } from "@/integrations/supabase/client";
import type { MobileProductData, LaptopProductData } from "../types/productTypes";

type TableName = 'mobile_products' | 'laptops';

export const useProductData = () => {
  const updateProduct = async (
    table: TableName,
    id: string,
    data: (MobileProductData | LaptopProductData) & { id?: string },
    productType: 'mobile' | 'laptop'
  ) => {
    // Remove id from the data before update
    const { id: _, ...updateData } = data;
    
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
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    ) as MobileProductData | LaptopProductData;

    try {
      const { data: insertedData, error } = await supabase
        .from(table)
        .insert(cleanData)
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