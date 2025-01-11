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
  resolution?: string;
  screen_size?: string;
  charging_specs?: string;
  status?: string;
  dimensions?: string;
  build_details?: string;
  sim?: string;
  protection_details?: string;
  display_type?: string;
  display_type_details?: string;
  display_resolution_details?: string;
  display_protection?: string;
  display_features?: string;
  screen_protection?: string;
  main_camera_features?: string;
  main_camera_video?: string;
  selfie_camera_features?: string;
  selfie_camera_video?: string;
  launch_date?: string;
  announced?: string;
  wlan?: string;
  bluetooth?: string;
  network_technology?: string;
  network_2g_bands?: string;
  network_3g_bands?: string;
  network_4g_bands?: string;
  network_5g_bands?: string;
  network_speed?: string;
};

export type LaptopProductData = BaseProductData & {
  graphics?: string;
  ports?: string;
};

export type ProductFormData = MobileProductData | LaptopProductData;

export interface UseProductFormProps {
  initialData?: ProductFormData & { id?: string };
  onSuccess?: (productId: string) => void;
  productType?: 'mobile' | 'laptop';
}