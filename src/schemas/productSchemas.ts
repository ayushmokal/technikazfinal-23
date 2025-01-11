import { z } from "zod";

const baseProductSchema = z.object({
  // Basic Info
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  model_name: z.string(),
  price: z.number().min(0, "Price must be a positive number"),
  color: z.string(),
  image_url: z.string().optional(),
  gallery_images: z.array(z.string()).optional(),

  // Core Specs
  display_specs: z.string().min(1, "Display specifications are required"),
  processor: z.string().min(1, "Processor is required"),
  ram: z.string().min(1, "RAM is required"),
  storage: z.string().min(1, "Storage is required"),
  battery: z.string().min(1, "Battery is required"),

  // Launch Details
  announced: z.string().optional(),
  status: z.string().optional(),

  // Platform
  os: z.string().optional(),
  chipset: z.string().optional(),
  cpu: z.string().optional(),
  gpu: z.string().optional(),

  // Memory
  card_slot: z.string().optional(),
  internal_storage: z.string().optional(),

  // Display
  display_type: z.string().optional(),
  screen_size: z.string().optional(),
  resolution: z.string().optional(),
  screen_protection: z.string().optional(),
  display_features: z.string().optional(),
  refresh_rate: z.string().optional(),

  // Camera
  camera_resolution: z.string().optional(),
  camera_features: z.string().optional(),
  camera_video: z.string().optional(),
  front_camera_resolution: z.string().optional(),
  front_camera_features: z.string().optional(),
  front_camera_video: z.string().optional(),

  // Battery
  battery_capacity: z.string().optional(),
  battery_type: z.string().optional(),
  charging_specs: z.string().optional(),

  // Design
  dimensions: z.string().optional(),
  weight: z.string().optional(),
  build_material: z.string().optional(),
  protection_details: z.string().optional(),
  colors_list: z.string().optional(),

  // Network
  network_technology: z.string().optional(),
  network_2g_bands: z.string().optional(),
  network_3g_bands: z.string().optional(),
  network_4g_bands: z.string().optional(),
  network_5g_bands: z.string().optional(),
  network_speed: z.string().optional(),

  // Sound
  loudspeaker: z.string().optional(),
  audio_jack: z.string().optional(),

  // Connectivity
  wlan: z.string().optional(),
  bluetooth: z.string().optional(),
  positioning: z.string().optional(),
  nfc: z.string().optional(),
  radio: z.string().optional(),
  usb: z.string().optional(),
});

export const mobileProductSchema = baseProductSchema.extend({
  camera: z.string().min(1, "Camera is required"),
});

export const laptopProductSchema = baseProductSchema.extend({
  graphics: z.string().optional(),
  ports: z.string().optional(),
});

export const expertReviewSchema = z.object({
  rating: z.number().min(0).max(10),
  author: z.string().min(1, "Author is required"),
  summary: z.string().min(1, "Summary is required"),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  verdict: z.string().min(1, "Verdict is required"),
});

export type ProductFormData = z.infer<typeof mobileProductSchema> | z.infer<typeof laptopProductSchema>;
export type ExpertReviewFormData = z.infer<typeof expertReviewSchema>;