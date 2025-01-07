import type { Json } from "@/integrations/supabase/types";

export type MobileProductData = {
  name: string;
  brand: string;
  model_name?: string;
  price: number;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  camera: string;
  os?: string;
  color?: string;
  image_url?: string;
  gallery_images?: string[];
  multimedia_specs?: Json;
  sensor_specs?: Json;
  network_specs?: Json;
  design_specs?: Json;
  camera_details?: Json;
  performance_specs?: Json;
  display_details?: Json;
  general_specs?: Json;
  chipset?: string;
  charging_specs?: string;
  resolution?: string;
  screen_size?: string;
};

export type LaptopProductData = {
  name: string;
  brand: string;
  model_name?: string;
  price: number;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  graphics?: string;
  os?: string;
  ports?: string;
  color?: string;
  image_url?: string;
  gallery_images?: string[];
  multimedia_specs?: Json;
  connectivity_specs?: Json;
  design_specs?: Json;
  performance_specs?: Json;
  display_details?: Json;
};

export interface UseProductFormProps {
  initialData?: (MobileProductData | LaptopProductData) & { id?: string };
  onSuccess?: (productId: string) => void;
  productType?: 'mobile' | 'laptop';
}