import { z } from "zod";

const baseProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  model_name: z.string(),
  price: z.number().min(0, "Price must be a positive number"),
  color: z.string().optional(),
  image_url: z.string().optional(),
  gallery_images: z.array(z.string()).optional(),
  display_specs: z.string().min(1, "Display specifications are required"),
  processor: z.string().min(1, "Processor is required"),
  ram: z.string().min(1, "RAM is required"),
  storage: z.string().min(1, "Storage is required"),
  battery: z.string().min(1, "Battery is required"),
  os: z.string().optional(),
  // Network fields
  network_technology: z.string().optional(),
  network_2g_bands: z.string().optional(),
  network_3g_bands: z.string().optional(),
  network_4g_bands: z.string().optional(),
  network_5g_bands: z.string().optional(),
  network_speed: z.string().optional(),
  // Additional specs
  chipset: z.string().optional(),
  charging_specs: z.string().optional(),
  screen_size: z.string().optional(),
  resolution: z.string().optional(),
  // Camera fields
  main_camera_features: z.string().optional(),
  main_camera_video: z.string().optional(),
  selfie_camera_features: z.string().optional(),
  selfie_camera_video: z.string().optional(),
  status: z.string().optional(),
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