import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  currentImageUrl?: string;
  currentGalleryImages?: string[];
  multiple?: boolean;
  onRemoveImage?: (index: number) => void;
}

export function ImageUpload({ 
  onChange, 
  label = "Product Image", 
  currentImageUrl, 
  currentGalleryImages = [],
  multiple = false,
  onRemoveImage 
}: ImageUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = files.map(file => URL.createObjectURL(file));
      
      if (multiple) {
        setPreviewUrls(prevUrls => [...prevUrls, ...urls]);
      } else {
        // Clean up previous preview URLs to prevent memory leaks
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        setPreviewUrls([urls[0]]);
      }
    }
    onChange(e);
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

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
        {(previewUrls.length > 0 ? previewUrls : 
          multiple ? currentGalleryImages : 
          (currentImageUrl ? [currentImageUrl] : [])
        ).map((url, index) => (
          <div key={url + index} className="relative group">
            <div className="w-[200px] h-[200px] relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-contain rounded-md border border-gray-200"
              />
            </div>
            {onRemoveImage && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onRemoveImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}