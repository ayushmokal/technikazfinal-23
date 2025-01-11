import type { Json } from "@/integrations/supabase/types";

export interface BaseProductData {
  id?: string;
  name?: string;
  brand?: string;
  model_name?: string;
  price?: number;
  display_specs?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  battery?: string;
  os?: string;
  color?: string;
  image_url?: string;
  gallery_images?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface MobileProductData extends BaseProductData {
  camera?: string;
  chipset?: string;
  resolution?: string;
  screen_size?: string;
  charging_specs?: string;
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
  main_camera_video?: string;
  selfie_camera_features?: string;
  selfie_camera_video?: string;
  launch_date?: string;
  announced?: string;
  network_technology?: string;
  network_2g_bands?: string;
  network_3g_bands?: string;
  network_4g_bands?: string;
  network_5g_bands?: string;
  network_speed?: string;
  wlan_details?: string;
  bluetooth_details?: string;
  radio?: string;
  infrared?: boolean;
  sensors_list?: string;
  battery_type?: string;
  charging_details?: string;
  models_list?: string;
  colors_list?: string;
  price_details?: string;
  multimedia_specs?: Json;
  sensor_specs?: Json;
  network_specs?: Json;
  design_specs?: Json;
  camera_details?: Json;
  performance_specs?: Json;
  display_details?: Json;
  general_specs?: Json;
  display_type?: string;
  screen_protection?: string;
  wlan?: string;
  bluetooth?: string;
}

export interface LaptopProductData extends BaseProductData {
  graphics?: string;
  ports?: string;
  multimedia_specs?: Json;
  connectivity_specs?: Json;
  design_specs?: Json;
  performance_specs?: Json;
  display_details?: Json;
}

export interface UseProductFormProps {
  initialData?: MobileProductData | LaptopProductData;
  onSuccess?: (productId: string) => void;
  productType?: 'mobile' | 'laptop';
}

export type ProductFormData = MobileProductData | LaptopProductData;