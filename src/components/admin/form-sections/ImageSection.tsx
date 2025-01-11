import { ImageUpload } from "../ImageUpload";
import { FormLabel } from "@/components/ui/form";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ImageSectionProps {
  onMainImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGalleryImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentImageUrl?: string;
  currentGalleryImages?: string[];
  onRemoveGalleryImage: (index: number) => void;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_GALLERY_IMAGES = 3;

export function ImageSection({
  onMainImageChange,
  onGalleryImagesChange,
  currentImageUrl,
  currentGalleryImages,
  onRemoveGalleryImage,
}: ImageSectionProps) {
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > MAX_FILE_SIZE) {
      toast({
        title: "Error",
        description: "Main image must be less than 2MB",
        variant: "destructive",
      });
      return;
    }
    onMainImageChange(e);
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + (currentGalleryImages?.length || 0) > MAX_GALLERY_IMAGES) {
      toast({
        title: "Error",
        description: `Maximum ${MAX_GALLERY_IMAGES} gallery images allowed`,
        variant: "destructive",
      });
      return;
    }

    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast({
        title: "Error",
        description: "All images must be less than 2MB",
        variant: "destructive",
      });
      return;
    }

    onGalleryImagesChange(e);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product Images</h3>
      <div className="grid gap-6">
        <div>
          <ImageUpload 
            onChange={handleMainImageChange} 
            currentImageUrl={currentImageUrl}
            label="Main Product Image (Max 2MB)"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Upload a clear, high-quality image of your product
          </p>
        </div>
        
        <div>
          <ImageUpload 
            onChange={handleGalleryImagesChange} 
            currentGalleryImages={currentGalleryImages}
            label={`Product Gallery Images (Max ${MAX_GALLERY_IMAGES} images, 2MB each)`}
            multiple
            onRemoveImage={onRemoveGalleryImage}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Add up to {MAX_GALLERY_IMAGES} additional product images
          </p>
        </div>
      </div>
    </div>
  );
}