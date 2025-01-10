import { z } from "zod";
import type { Json } from "@/integrations/supabase/types";

export const expertReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  date: z.string().optional(),
  author: z.string().min(1),
  summary: z.string().min(1),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  verdict: z.string().min(1),
});

export type ExpertReviewFormData = z.infer<typeof expertReviewSchema>;

const baseProductSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  model_name: z.string().optional(),
  price: z.number().min(0),
  display_specs: z.string().min(1),
  processor: z.string().min(1),
  ram: z.string().min(1),
  storage: z.string().min(1),
  battery: z.string().min(1),
  os: z.string().optional(),
  color: z.string().optional(),
  image_url: z.string().url().optional(),
  gallery_images: z.array(z.string().url()).optional(),
});

export const mobileProductSchema = baseProductSchema.extend({
  camera: z.string(),
  chipset: z.string().optional(),
  charging_specs: z.string().optional(),
  resolution: z.string().optional(),
  screen_size: z.string().optional(),
  announced: z.string().optional(),
  status: z.string().optional(),
  gpu: z.string().optional(),
  card_slot: z.string().optional(),
  internal_storage: z.string().optional(),
  storage_type: z.string().optional(),
  display_type_details: z.string().optional(),
  display_resolution_details: z.string().optional(),
  display_protection: z.string().optional(),
  display_features: z.string().optional(),
  main_camera_features: z.string().optional(),
  main_camera_video: z.string().optional(),
  selfie_camera_features: z.string().optional(),
  selfie_camera_video: z.string().optional(),
  dimensions: z.string().optional(),
  build_details: z.string().optional(),
  sim: z.string().optional(),
  protection_details: z.string().optional(),
  battery_type: z.string().optional(),
  charging_details: z.string().optional(),
  wlan_details: z.string().optional(),
  bluetooth_details: z.string().optional(),
  radio: z.string().optional(),
  infrared: z.boolean().optional(),
  network_technology: z.string().optional(),
  network_2g_bands: z.string().optional(),
  network_3g_bands: z.string().optional(),
  network_4g_bands: z.string().optional(),
  network_5g_bands: z.string().optional(),
  network_speed: z.string().optional(),
  sensors_list: z.string().optional(),
  models_list: z.string().optional(),
  colors_list: z.string().optional(),
  price_details: z.string().optional(),
  multimedia_specs: z.any().optional(),
  sensor_specs: z.any().optional(),
  network_specs: z.any().optional(),
  design_specs: z.any().optional(),
  camera_details: z.any().optional(),
  performance_specs: z.any().optional(),
  display_details: z.any().optional(),
  general_specs: z.any().optional(),
});

export const laptopProductSchema = baseProductSchema.extend({
  graphics: z.string().optional(),
  ports: z.string().optional(),
  multimedia_specs: z.any().optional(),
  connectivity_specs: z.any().optional(),
  design_specs: z.any().optional(),
  performance_specs: z.any().optional(),
  display_details: z.any().optional(),
});

export type ProductFormData = z.infer<typeof mobileProductSchema> | z.infer<typeof laptopProductSchema>;