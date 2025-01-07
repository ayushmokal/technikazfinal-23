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
  multimedia_specs?: Record<string, any>;
  design_specs?: Record<string, any>;
  performance_specs?: Record<string, any>;
  display_details?: Record<string, any>;
}

export interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
  model_name: string | null;
  connectivity_specs?: Record<string, any>;
}

export interface MobileProduct extends BaseProduct {
  camera: string;
  chipset: string | null;
  charging_specs: string | null;
  resolution: string | null;
  screen_size: string | null;
  model_name: string | null;
  camera_details?: Record<string, any>;
  sensor_specs?: Record<string, any>;
  network_specs?: Record<string, any>;
  general_specs?: Record<string, any>;
}