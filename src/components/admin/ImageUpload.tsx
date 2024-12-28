import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  currentImageUrl?: string;
}

export function ImageUpload({ onChange, label = "Product Image", currentImageUrl }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <FormLabel>{label}</FormLabel>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="relative overflow-hidden"
          type="button"
        >
          Choose file
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </Button>
        <span className="text-sm text-muted-foreground">
          {previewUrl ? "File selected" : "No file chosen"}
        </span>
      </div>
      {(previewUrl || currentImageUrl) && (
        <div className="w-full max-w-[200px]">
          <AspectRatio ratio={1}>
            <img
              src={previewUrl || currentImageUrl}
              alt="Preview"
              className="object-contain w-full h-full rounded-md"
            />
          </AspectRatio>
        </div>
      )}
    </div>
  );
}