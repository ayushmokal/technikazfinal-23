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
    console.log("Updating product with data:", { table, id, data, productType });
    const { data: updatedData, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }
    console.log("Product updated successfully:", updatedData);
    return updatedData;
  };

  const insertProduct = async (
    table: TableName,
    data: MobileProductData | LaptopProductData,
    productType: 'mobile' | 'laptop'
  ) => {
    console.log("Inserting new product with data:", { table, data, productType });
    const { data: insertedData, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error("Error inserting product:", error);
      throw error;
    }
    console.log("Product inserted successfully:", insertedData);
    return insertedData;
  };

  return {
    updateProduct,
    insertProduct,
  };
};