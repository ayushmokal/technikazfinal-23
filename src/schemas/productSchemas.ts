import { z } from "zod";

const baseProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  model_name: z.string().optional(),
  price: z.number().min(0, "Price must be a positive number"),
  display_specs: z.string().min(1, "Display specifications are required"),
  processor: z.string().min(1, "Processor is required"),
  ram: z.string().min(1, "RAM is required"),
  storage: z.string().min(1, "Storage is required"),
  battery: z.string().min(1, "Battery is required"),
  os: z.string().optional(),
  color: z.string().optional(),
  image_url: z.string().optional(),
  gallery_images: z.array(z.string()).optional(),
});

export const mobileProductSchema = baseProductSchema.extend({
  camera: z.string().min(1, "Camera is required"),
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
  // Add the missing fields that caused TypeScript errors
  camera_setup: z.string().optional(),
  front_camera_setup: z.string().optional(),
  weight: z.string().optional(),
  build_material: z.string().optional(),
  positioning: z.string().optional(),
  nfc: z.string().optional(),
  usb: z.string().optional(),
  loudspeaker: z.string().optional(),
  audio_jack: z.string().optional(),
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

export const expertReviewSchema = z.object({
  product_id: z.string().uuid(),
  rating: z.number().min(0).max(5),
  author: z.string().min(1, "Author is required"),
  summary: z.string().min(1, "Summary is required"),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  verdict: z.string().min(1, "Verdict is required"),
});

export type ProductFormData = z.infer<typeof mobileProductSchema> | z.infer<typeof laptopProductSchema>;
export type ExpertReviewFormData = z.infer<typeof expertReviewSchema>;