export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string | null;
  display_specs: string;
  processor: string;
  ram: string | null;
  storage: string | null;
  battery: string;
  os: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
  gallery_images: string[] | null;
  model_name: string | null;
}

export interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
}

export interface MobileProduct extends BaseProduct {
  camera: string;
  chipset: string | null;
  charging_specs: string | null;
  resolution: string | null;
  screen_size: string | null;
  front_camera: string | null;
  launch_date: string | null;
  release_date: string | null;
  custom_ui: string | null;
  software_support: string | null;
  cpu: string | null;
  architecture: string | null;
  fabrication: string | null;
  ram_type: string | null;
  display_type: string | null;
  aspect_ratio: string | null;
  pixel_density: string | null;
  screen_protection: string | null;
  bezel_less: boolean | null;
  touch_screen: boolean | null;
  peak_brightness: string | null;
  hdr_support: string | null;
  refresh_rate: string | null;
  height: string | null;
  width: string | null;
  thickness: string | null;
  weight: string | null;
  build_material: string | null;
  waterproof: string | null;
  ruggedness: string | null;
  camera_setup: string | null;
  camera_autofocus: boolean | null;
  camera_ois: boolean | null;
  camera_flash: string | null;
  camera_modes: string | null;
  video_recording: string | null;
  front_camera_setup: string | null;
  front_camera_video: string | null;
  wlan: string | null;
  bluetooth: string | null;
  nfc: string | null;
  positioning: string | null;
  usb: string | null;
  network_technology: string | null;
  network_2g_bands: string | null;
  network_3g_bands: string | null;
  network_4g_bands: string | null;
  network_5g_bands: string | null;
  network_speed: string | null;
  loudspeaker: string | null;
  audio_jack: string | null;
  sensors: string | null;
  models: string | null;
}