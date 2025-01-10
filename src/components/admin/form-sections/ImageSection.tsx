import { ImageUpload } from "../ImageUpload";
import { Form, FormLabel } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";

interface ImageSectionProps {
  form: UseFormReturn<ProductFormData>;
  onMainImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGalleryImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentImageUrl?: string;
  currentGalleryImages?: string[];
  onRemoveGalleryImage: (index: number) => void;
}

export function ImageSection({
  form,
  onMainImageChange,
  onGalleryImagesChange,
  currentImageUrl,
  currentGalleryImages,
  onRemoveGalleryImage,
}: ImageSectionProps) {
  return (
    <Form {...form}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Product Images</h3>
        <div className="grid gap-6">
          <ImageUpload 
            onChange={onMainImageChange} 
            currentImageUrl={currentImageUrl}
            label="Main Product Image"
          />
          
          <ImageUpload 
            onChange={onGalleryImagesChange} 
            currentGalleryImages={currentGalleryImages}
            label="Product Gallery Images"
            multiple
            onRemoveImage={onRemoveGalleryImage}
          />
        </div>
      </div>
    </Form>
  );
}