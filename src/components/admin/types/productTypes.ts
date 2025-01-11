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
  launch_date?: string;
  status?: string;
  display_type?: string;
  screen_protection?: string;
  display_features?: string;
  main_camera_features?: string;
  selfie_camera_features?: string;
  dimensions?: string;
  build_details?: string;
  wlan?: string;
  bluetooth?: string;
  display_type_details?: string;
  display_resolution_details?: string;
  display_protection?: string;
  main_camera_video?: string;
  selfie_camera_video?: string;
  network_technology?: string;
  network_2g_bands?: string;
  network_3g_bands?: string;
  network_4g_bands?: string;
  network_5g_bands?: string;
  network_speed?: string;
};

export type MobileProductData = BaseProductData & {
  camera: string;
  chipset?: string;
  charging_specs?: string;
  resolution?: string;
  screen_size?: string;
  custom_ui?: string;
  software_support?: string;
  cpu?: string;
  architecture?: string;
  fabrication?: string;
  ram_type?: string;
  aspect_ratio?: string;
  pixel_density?: string;
  bezel_less?: boolean;
  touch_screen?: boolean;
  peak_brightness?: string;
  hdr_support?: string;
  refresh_rate?: string;
  height?: string;
  width?: string;
  thickness?: string;
  weight?: string;
  build_material?: string;
  waterproof?: string;
  ruggedness?: string;
  camera_setup?: string;
  camera_autofocus?: string;
  camera_ois?: string;
  camera_flash?: string;
  camera_modes?: string;
  video_recording?: string;
  front_camera_setup?: string;
  front_camera_video?: string;
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