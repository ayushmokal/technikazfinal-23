import type { Json } from "@/integrations/supabase/types";

export type BaseProductData = {
  name: string;
  brand: string;
  model_name: string;
  price: number;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  os?: string;
  color?: string;
  image_url?: string;
  gallery_images?: string[];
};

export type MobileProductData = BaseProductData & {
  camera: string;
  chipset?: string;
  charging_specs?: string;
  resolution?: string;
  screen_size?: string;
};

export type LaptopProductData = BaseProductData & {
  graphics?: string;
  ports?: string;
};

export interface ExpertReviewData {
  product_id: string;
  rating: number;
  author: string;
  summary: string;
  pros: string[];
  cons: string[];
  verdict: string;
}

export type ProductFormData = MobileProductData | LaptopProductData;

export interface UseProductFormProps {
  initialData?: (MobileProductData | LaptopProductData) & { id?: string };
  onSuccess?: (productId: string) => void;
  productType?: 'mobile' | 'laptop';
}