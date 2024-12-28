import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ onChange, label = "Image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
      });
      return;
    }

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a valid image file (JPEG, PNG, WebP, or GIF)",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      // Upload to Supabase storage
      const { error: uploadError, data } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      if (!data) throw new Error('Upload failed - no data returned');

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      // Update the form
      onChange(publicUrl);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
      });
    } finally {
      setIsUploading(false);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <FormLabel>{label}</FormLabel>
      <Input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="cursor-pointer"
        disabled={isUploading}
      />
      <p className="text-sm text-muted-foreground">
        Supported formats: JPEG, PNG, WebP, GIF (max 5MB)
      </p>
      {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
    </div>
  );
}