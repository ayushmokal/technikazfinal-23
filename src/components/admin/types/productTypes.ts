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
  design_specs?: Json;
  display_details?: Json;
  performance_specs?: Json;
  multimedia_specs?: Json;
  graphics?: string;
  ram_type?: string;
};

export type MobileProductData = BaseProductData & {
  camera: string;
  front_camera: string;
  chipset?: string;
  charging_specs?: string;
  screen_size?: string;
  resolution?: string;
  camera_details?: Json;
  sensor_specs?: Json;
  network_specs?: Json;
  general_specs?: Json;
  launch_date?: string;
  release_date?: string;
  wlan?: string;
  bluetooth?: string;
  nfc?: string;
  positioning?: string;
  usb?: string;
  network_technology?: string;
  network_2g_bands?: string;
  network_3g_bands?: string;
  network_4g_bands?: string;
  network_5g_bands?: string;
  network_speed?: string;
  loudspeaker?: string;
  audio_jack?: string;
  sensors?: string;
  models?: string;
  camera_setup?: string;
  camera_autofocus?: boolean;
  camera_ois?: boolean;
  camera_flash?: string;
  camera_modes?: string;
  video_recording?: string;
  front_camera_setup?: string;
  front_camera_video?: string;
};

export type LaptopProductData = BaseProductData & {
  graphics?: string;
  ports?: string;
  connectivity_specs?: Json;
};

export interface UseProductFormProps {
  initialData?: (MobileProductData | LaptopProductData) & { id?: string };
  onSuccess?: (productId: string) => void;
  productType?: 'mobile' | 'laptop';
}