import type { Json } from "@/integrations/supabase/types";

type JsonRecord = Record<string, any>;

export type BaseProductData = {
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
  design_specs?: JsonRecord;
  display_details?: JsonRecord;
  performance_specs?: JsonRecord;
  multimedia_specs?: JsonRecord;
};

export type MobileProductData = BaseProductData & {
  camera: string;
  chipset?: string;
  charging_specs?: string;
  resolution?: string;
  screen_size?: string;
  camera_details?: JsonRecord;
  sensor_specs?: JsonRecord;
  network_specs?: JsonRecord;
  general_specs?: JsonRecord;
  network_technology?: string;
  network_2g_bands?: string;
  network_3g_bands?: string;
  network_4g_bands?: string;
  network_5g_bands?: string;
  network_speed?: string;
  dimensions?: string;
  weight?: string;
  display_type?: string;
  display_type_details?: string;
  display_resolution_details?: string;
  display_protection?: string;
  display_features?: string;
  main_camera_features?: string;
  main_camera_video?: string;
  selfie_camera_features?: string;
  selfie_camera_video?: string;
};

export type LaptopProductData = BaseProductData & {
  graphics?: string;
  ports?: string;
  connectivity_specs?: JsonRecord;
};

export type ProductFormData = MobileProductData | LaptopProductData;

export interface UseProductFormProps {
  initialData?: ProductFormData & { id?: string };
  onSuccess?: (productId: string) => void;
  productType?: 'mobile' | 'laptop';
}