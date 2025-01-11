export interface BaseProductData {
  name: string;
  brand: string;
  model_name: string;
  price: number;
  color?: string;
  image_url?: string;
  gallery_images?: string[];
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  os?: string;
  // Network fields
  network_technology?: string;
  network_2g_bands?: string;
  network_3g_bands?: string;
  network_4g_bands?: string;
  network_5g_bands?: string;
  network_speed?: string;
  // Additional specs
  chipset?: string;
  charging_specs?: string;
  screen_size?: string;
  resolution?: string;
  // Camera fields
  main_camera_features?: string;
  main_camera_video?: string;
  selfie_camera_features?: string;
  selfie_camera_video?: string;
  status?: string;
}

export interface MobileProductData extends BaseProductData {
  camera: string;
}

export interface LaptopProductData extends BaseProductData {
  graphics?: string;
  ports?: string;
}

export type ProductFormData = MobileProductData | LaptopProductData;