import type { Json } from "@/integrations/supabase/types";

export interface BaseProductData {
  // Basic Info
  name: string;
  brand: string;
  model_name?: string;
  price: number;
  color?: string;
  image_url?: string;
  gallery_images?: string[];

  // Core Specs
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;

  // Launch Details
  announced?: string;
  status?: string;

  // Platform
  os?: string;
  chipset?: string;
  cpu?: string;
  gpu?: string;

  // Memory
  card_slot?: string;
  internal_storage?: string;

  // Display
  display_type?: string;
  screen_size?: string;
  resolution?: string;
  screen_protection?: string;
  display_features?: string;
  refresh_rate?: string;

  // Camera
  camera?: string;
  main_camera_features?: string;
  main_camera_video?: string;
  front_camera?: string;
  selfie_camera_features?: string;
  selfie_camera_video?: string;

  // Battery
  battery_type?: string;
  charging_specs?: string;

  // Design
  dimensions?: string;
  weight?: string;
  build_material?: string;
  protection_details?: string;
  colors_list?: string;

  // Network
  network_technology?: string;
  network_2g_bands?: string;
  network_3g_bands?: string;
  network_4g_bands?: string;
  network_5g_bands?: string;
  network_speed?: string;

  // Sound
  loudspeaker?: string;
  audio_jack?: string;

  // Connectivity
  wlan_details?: string;
  bluetooth_details?: string;
  positioning?: string;
  nfc?: string;
  radio?: string;
  usb?: string;
}

export interface MobileProductData extends BaseProductData {
  camera: string;
}

export interface LaptopProductData extends BaseProductData {
  graphics?: string;
  ports?: string;
}

export type ProductFormData = MobileProductData | LaptopProductData;