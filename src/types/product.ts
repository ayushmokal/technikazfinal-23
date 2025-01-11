import type { Json } from "@/integrations/supabase/types";

export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string | null;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  os: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
  gallery_images: string[] | null;
  model_name: string | null;
}

export interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
}

export interface MobileProduct extends BaseProduct {
  camera: string;
  chipset: string | null;
  charging_specs: string | null;
  resolution: string | null;
  screen_size: string | null;
  front_camera: string | null;
  network_technology: string | null;
  network_2g_bands: string | null;
  network_3g_bands: string | null;
  network_4g_bands: string | null;
  network_5g_bands: string | null;
  network_speed: string | null;
  announced: string | null;
  status: string | null;
  dimensions: string | null;
  build_details: string | null;
  sim: string | null;
  protection_details: string | null;
  display_type_details: string | null;
  display_resolution_details: string | null;
  display_protection: string | null;
  display_features: string | null;
  cpu: string | null;
  gpu: string | null;
  card_slot: string | null;
  internal_storage: string | null;
  storage_type: string | null;
  main_camera_features: string | null;
  main_camera_video: string | null;
  selfie_camera_features: string | null;
  selfie_camera_video: string | null;
  loudspeaker: string | null;
  audio_jack: string | null;
  wlan_details: string | null;
  bluetooth_details: string | null;
  radio: string | null;
  infrared: boolean | null;
  sensors_list: string | null;
  battery_type: string | null;
  charging_details: string | null;
  models_list: string | null;
  colors_list: string | null;
  price_details: string | null;
  multimedia_specs: Json | null;
  sensor_specs: Json | null;
  network_specs: Json | null;
  design_specs: Json | null;
  camera_details: Json | null;
  performance_specs: Json | null;
  display_details: Json | null;
  general_specs: Json | null;
}