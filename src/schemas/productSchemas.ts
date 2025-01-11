import { z } from "zod";

const baseProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  model_name: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  image_url: z.string().optional(),
  display_specs: z.string().min(1, "Display specs are required"),
  processor: z.string().min(1, "Processor is required"),
  ram: z.string().min(1, "RAM is required"),
  storage: z.string().min(1, "Storage is required"),
  battery: z.string().min(1, "Battery is required"),
  os: z.string().optional(),
  color: z.string().optional(),
  type: z.enum(['mobile', 'laptop']),
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
});

export const laptopProductSchema = baseProductSchema.extend({
  graphics: z.string().optional(),
  ports: z.string().optional(),
});

export const expertReviewSchema = z.object({
  product_id: z.string().uuid(),
  rating: z.number().min(0).max(10),
  author: z.string().min(1),
  summary: z.string().min(1),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  verdict: z.string().min(1),
});

export type ExpertReviewFormData = z.infer<typeof expertReviewSchema>;
export type ProductFormData = z.infer<typeof mobileProductSchema> | z.infer<typeof laptopProductSchema>;