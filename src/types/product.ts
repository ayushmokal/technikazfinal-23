export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  model_name: string | null;
  price: number;
  image_url: string | null;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  os: string | null;
  color: string | null;
  gallery_images: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
}

export interface MobileProduct extends BaseProduct {
  camera: string | null;
  chipset: string | null;
  charging_specs: string | null;
  resolution: string | null;
  screen_size: string | null;
  launch_date?: string;
  status?: string;
  display_type?: string;
  screen_protection?: string;
  display_features?: string;
  main_camera_features?: string;
  selfie_camera_features?: string;
  dimensions?: string;
  build_details?: string;
  wlan?: string;
  bluetooth?: string;
  network_technology?: string;
  network_2g_bands?: string;
  network_3g_bands?: string;
  network_4g_bands?: string;
  network_5g_bands?: string;
  network_speed?: string;
  custom_ui?: string;
  software_support?: string;
  cpu?: string;
  architecture?: string;
  fabrication?: string;
  ram_type?: string;
  aspect_ratio?: string;
  pixel_density?: string;
  bezel_less?: boolean;
  touch_screen?: boolean;
  peak_brightness?: string;
  hdr_support?: string;
  refresh_rate?: string;
  height?: string;
  width?: string;
  thickness?: string;
  weight?: string;
  build_material?: string;
  waterproof?: string;
  ruggedness?: string;
  camera_setup?: string;
  camera_autofocus?: string;
  camera_ois?: string;
  camera_flash?: string;
  camera_modes?: string;
  video_recording?: string;
  front_camera_setup?: string;
  front_camera_video?: string;
}