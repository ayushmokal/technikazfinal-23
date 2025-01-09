import type { Json } from "@/integrations/supabase/types";

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
  resolution?: string;
  screen_size?: string;
  camera_details?: Json;
  sensor_specs?: Json;
  network_specs?: Json;
  general_specs?: Json;
  launch_date?: string;
  custom_ui?: string;
  software_support?: string;
  architecture?: string;
  fabrication?: string;
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