import type { Json } from "@/integrations/supabase/types";

export type BaseProductData = {
  id?: string;
  name: string;
  brand: string;
  model_name?: string;
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
  status?: string;
  dimensions?: string;
  build_details?: string;
  sim?: string;
  protection_details?: string;
  display_type_details?: string;
  display_resolution_details?: string;
  display_protection?: string;
  display_features?: string;
  main_camera_features?: string;
  selfie_camera_features?: string;
  launch_date?: string;
  announced?: string;
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
  initialData?: ProductFormData & { id?: string };
  onSuccess?: (productId: string) => void;
  productType?: 'mobile' | 'laptop';
}