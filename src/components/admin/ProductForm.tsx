import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "./ImageUpload";
import { Form } from "@/components/ui/form";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { SpecificationsSection } from "./form-sections/SpecificationsSection";
import { AdditionalSpecsSection } from "./form-sections/AdditionalSpecsSection";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const mobileProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  model_name: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  display_specs: z.string().min(1, "Display specifications are required"),
  processor: z.string().min(1, "Processor is required"),
  ram: z.string().min(1, "RAM is required"),
  storage: z.string().min(1, "Storage is required"),
  battery: z.string().min(1, "Battery specifications are required"),
  camera: z.string().min(1, "Camera specifications are required"),
  os: z.string().optional(),
  chipset: z.string().optional(),
  charging_specs: z.string().optional(),
  screen_size: z.string().optional(),
  resolution: z.string().optional(),
  color: z.string().optional(),
  image_url: z.string().optional(),
  gallery_images: z.array(z.string()).optional(),
});

const laptopProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  model_name: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  display_specs: z.string().min(1, "Display specifications are required"),
  processor: z.string().min(1, "Processor is required"),
  ram: z.string().min(1, "RAM is required"),
  storage: z.string().min(1, "Storage is required"),
  battery: z.string().min(1, "Battery specifications are required"),
  graphics: z.string().optional(),
  os: z.string().optional(),
  ports: z.string().optional(),
  color: z.string().optional(),
  image_url: z.string().optional(),
  gallery_images: z.array(z.string()).optional(),
});

export type ProductFormData = z.infer<typeof mobileProductSchema> | z.infer<typeof laptopProductSchema>;

interface ProductFormProps {
  initialData?: ProductFormData;
  onSuccess?: () => void;
  productType?: 'mobile' | 'laptop';
}

export function ProductForm({ initialData, onSuccess, productType: propProductType }: ProductFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [productType, setProductType] = useState<'mobile' | 'laptop'>(propProductType || 'mobile');

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productType === 'mobile' ? mobileProductSchema : laptopProductSchema),
    defaultValues: initialData || {
      name: "",
      brand: "",
      model_name: "",
      price: 0,
      display_specs: "",
      processor: "",
      ram: "",
      storage: "",
      battery: "",
      camera: "", // Default value for mobile
      gallery_images: [],
    },
  });

  useEffect(() => {
    if (propProductType) {
      setProductType(propProductType);
    }
  }, [propProductType]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryImageFiles(Array.from(e.target.files));
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    const currentImages = form.getValues().gallery_images || [];
    const updatedImages = [...currentImages];
    updatedImages.splice(index, 1);
    form.setValue('gallery_images', updatedImages);
  };

  const uploadImage = async (file: File, folder: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);

      if (mainImageFile) {
        data.image_url = await uploadImage(mainImageFile, 'main');
      }

      if (galleryImageFiles.length > 0) {
        const uploadPromises = galleryImageFiles.map(file => 
          uploadImage(file, 'gallery')
        );
        const newGalleryImages = await Promise.all(uploadPromises);
        
        const existingGalleryImages = data.gallery_images || [];
        data.gallery_images = [...existingGalleryImages, ...newGalleryImages];
      }

      const table = productType === 'mobile' ? 'mobile_products' : 'laptops';
      
      if (initialData?.id) {
        const { error } = await supabase
          .from(table)
          .update(data)
          .eq('id', initialData.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} updated successfully`,
        });
      } else {
        const { error } = await supabase
          .from(table)
          .insert([data]);

        if (error) throw error;

        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} added successfully`,
        });
      }

      form.reset();
      setMainImageFile(null);
      setGalleryImageFiles([]);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save product",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="mobile" className="w-full" onValueChange={(value) => setProductType(value as 'mobile' | 'laptop')}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mobile">Mobile Phone</TabsTrigger>
        <TabsTrigger value="laptop">Laptop</TabsTrigger>
      </TabsList>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <BasicInfoSection form={form} />
          <SpecificationsSection form={form} productType={productType} />
          <AdditionalSpecsSection form={form} productType={productType} />
          
          <div className="space-y-4">
            <ImageUpload 
              onChange={handleMainImageChange} 
              currentImageUrl={initialData?.image_url}
              label="Main Product Image"
            />
            
            <ImageUpload 
              onChange={handleGalleryImagesChange} 
              currentGalleryImages={initialData?.gallery_images}
              label="Product Gallery Images"
              multiple
              onRemoveImage={handleRemoveGalleryImage}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Update" : "Add"} {productType === 'mobile' ? 'Mobile Phone' : 'Laptop'}
          </Button>
        </form>
      </Form>
    </Tabs>
  );
}