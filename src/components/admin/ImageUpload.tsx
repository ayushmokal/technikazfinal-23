import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export function ImageUpload({ onChange, label = "Product Image" }: ImageUploadProps) {
  return (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>
      <Input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="cursor-pointer"
      />
    </div>
  );
}