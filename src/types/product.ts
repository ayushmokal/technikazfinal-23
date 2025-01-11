export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  model_name?: string;
  price: number;
  image_url?: string;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  os?: string;
  color?: string;
  gallery_images?: string[];
  created_at: string;
  updated_at: string;
}

export interface MobileProduct extends BaseProduct {
  camera?: string;
  chipset?: string;
  resolution?: string;
  screen_size?: string;
  charging_specs?: string;
}

export interface LaptopProduct extends BaseProduct {
  graphics?: string;
  ports?: string;
}

export type Product = MobileProduct | LaptopProduct;