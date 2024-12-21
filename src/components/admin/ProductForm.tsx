import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "./ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProductFormData {
  name: string;
  price: string;
  display_specs: string;
  processor: string;
  camera: string;
  battery: string;
  image_url: string;
}

interface ProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductForm({ onSuccess, onCancel }: ProductFormProps) {
  const { toast } = useToast();
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      price: "",
      display_specs: "",
      processor: "",
      camera: "",
      battery: "",
      image_url: "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image",
      });
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    form.setValue("image_url", publicUrl);
  };

  const onSubmit = async (data: ProductFormData) => {
    const { error } = await supabase
      .from('mobile_products')
      .insert([{
        ...data,
        price: parseFloat(data.price),
      }]);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add mobile product",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Mobile product added successfully",
    });
    
    form.reset();
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ImageUpload onChange={handleImageUpload} />

        <FormField
          control={form.control}
          name="display_specs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Specifications</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="processor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Processor</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="camera"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Camera</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="battery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battery</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit">Add Product</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}