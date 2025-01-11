import { z } from "zod";

const baseProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  brand: z.string().optional(),
  model_name: z.string().optional(),
  price: z.number().optional(),
  display_specs: z.string().optional(),
  processor: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  battery: z.string().optional(),
  os: z.string().optional(),
  color: z.string().optional(),
  image_url: z.string().optional(),
  gallery_images: z.array(z.string()).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const mobileProductSchema = baseProductSchema.extend({
  camera: z.string().optional(),
  chipset: z.string().optional(),
  resolution: z.string().optional(),
  screen_size: z.string().optional(),
  charging_specs: z.string().optional(),
  status: z.string().optional(),
  dimensions: z.string().optional(),
  build_details: z.string().optional(),
  sim: z.string().optional(),
  protection_details: z.string().optional(),
  display_type_details: z.string().optional(),
  display_resolution_details: z.string().optional(),
  display_protection: z.string().optional(),
  display_features: z.string().optional(),
  main_camera_features: z.string().optional(),
  main_camera_video: z.string().optional(),
  selfie_camera_features: z.string().optional(),
  selfie_camera_video: z.string().optional(),
  launch_date: z.string().optional(),
  announced: z.string().optional(),
  network_technology: z.string().optional(),
  network_2g_bands: z.string().optional(),
  network_3g_bands: z.string().optional(),
  network_4g_bands: z.string().optional(),
  network_5g_bands: z.string().optional(),
  network_speed: z.string().optional(),
  wlan_details: z.string().optional(),
  bluetooth_details: z.string().optional(),
  radio: z.string().optional(),
  infrared: z.boolean().optional(),
  sensors_list: z.string().optional(),
  battery_type: z.string().optional(),
  charging_details: z.string().optional(),
  models_list: z.string().optional(),
  colors_list: z.string().optional(),
  price_details: z.string().optional(),
});

export const laptopProductSchema = baseProductSchema.extend({
  graphics: z.string().optional(),
  ports: z.string().optional(),
});

export const expertReviewSchema = z.object({
  product_id: z.string().uuid().optional(),
  rating: z.number().min(0).max(10).optional(),
  author: z.string().optional(),
  summary: z.string().optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  verdict: z.string().optional(),
});

export type ProductFormData = z.infer<typeof mobileProductSchema> | z.infer<typeof laptopProductSchema>;
export type ExpertReviewFormData = z.infer<typeof expertReviewSchema>;