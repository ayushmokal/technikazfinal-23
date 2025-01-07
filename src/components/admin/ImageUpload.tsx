import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  currentImageUrl?: string;
  multiple?: boolean;
}

export function ImageUpload({ onChange, label = "Product Image", currentImageUrl, multiple = false }: ImageUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
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
          Choose file{multiple ? 's' : ''}
          <Input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </Button>
        <span className="text-sm text-muted-foreground">
          {previewUrls.length > 0 ? `${previewUrls.length} file(s) selected` : "No file chosen"}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(previewUrls.length > 0 ? previewUrls : (currentImageUrl ? [currentImageUrl] : [])).map((url, index) => (
          <div key={index} className="relative">
            <AspectRatio ratio={1}>
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="object-contain w-full h-full rounded-md"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
}