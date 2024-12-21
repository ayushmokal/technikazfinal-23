import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUpload({ onChange }: ImageUploadProps) {
  return (
    <div className="space-y-2">
      <FormLabel>Blog Image</FormLabel>
      <Input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="cursor-pointer"
      />
    </div>
  );
}