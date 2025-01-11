export interface Product {
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
  type: 'mobile' | 'laptop';
  camera?: string;
  chipset?: string;
  resolution?: string;
  screen_size?: string;
  charging_specs?: string;
  graphics?: string;
  ports?: string;
  gallery_images?: string[];
  created_at: string;
  updated_at: string;
}

export type MobileProduct = Product & {
  type: 'mobile';
};

export type LaptopProduct = Product & {
  type: 'laptop';
};