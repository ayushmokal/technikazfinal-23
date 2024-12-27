import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export function ImageUpload({ onChange, label = "Product Image" }: ImageUploadProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file",
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
      });
      return;
    }

    setIsUploading(true);
    try {
      onChange(e);
      toast({
        title: "File selected",
        description: "Image ready for upload",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="cursor-pointer"
        disabled={isUploading}
      />
      {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
    </div>
  );
}