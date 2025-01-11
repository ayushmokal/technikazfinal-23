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
  display_type?: string;
  screen_protection?: string;
  display_features?: string;
}

export interface MobileProductData extends BaseProductData {
  camera: string;
  chipset?: string;
  charging_specs?: string;
  screen_size?: string;
  resolution?: string;
  network_technology?: string;
  network_2g_bands?: string;
  network_3g_bands?: string;
  network_4g_bands?: string;
  network_5g_bands?: string;
  network_speed?: string;
  main_camera_features?: string;
  main_camera_video?: string;
  selfie_camera_features?: string;
  selfie_camera_video?: string;
}

export interface LaptopProductData extends BaseProductData {
  graphics?: string;
  ports?: string;
}

export type ProductFormData = MobileProductData | LaptopProductData;