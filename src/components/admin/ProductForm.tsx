import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { SpecificationsSection } from "./form-sections/SpecificationsSection";
import { AdditionalSpecsSection } from "./form-sections/AdditionalSpecsSection";
import { ImageSection } from "./form-sections/ImageSection";
import { ExpertReviewForm } from "./ExpertReviewForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { 
  mobileProductSchema, 
  laptopProductSchema,
  type ProductFormData 
} from "@/schemas/productSchemas";

interface ProductFormProps {
  initialData?: ProductFormData & { id?: string };
  onSuccess?: () => void;
  productType?: 'mobile' | 'laptop';
}

export function ProductForm({ initialData, onSuccess, productType: propProductType }: ProductFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [productType, setProductType] = useState<'mobile' | 'laptop'>(propProductType || 'mobile');
  const [showExpertReview, setShowExpertReview] = useState(false);

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
      camera: "",
      gallery_images: [],
    },
  });

  useEffect(() => {
    if (propProductType) {
      setProductType(propProductType);
    }
  }, [propProductType]);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please login again to continue.",
        });
        navigate("/admin/login");
      }
    };
    checkAuth();
  }, [navigate, toast]);

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

      // Check authentication before proceeding
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please login again to continue.",
        });
        navigate("/admin/login");
        return;
      }

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
      
      let result;
      if (initialData?.id) {
        const { data: updatedData, error } = await supabase
          .from(table)
          .update(data)
          .eq('id', initialData.id)
          .select()
          .single();

        if (error) throw error;
        result = updatedData;

        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} updated successfully`,
        });
      } else {
        const { data: insertedData, error } = await supabase
          .from(table)
          .insert({
            ...data,
            battery: data.battery || "",  // Ensure required fields are not undefined
            brand: data.brand || "",
            display_specs: data.display_specs || "",
            processor: data.processor || "",
            ram: data.ram || "",
            storage: data.storage || "",
            ...(productType === 'mobile' ? { camera: data.camera || "" } : {})
          })
          .select()
          .single();

        if (error) throw error;
        result = insertedData;

        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} added successfully`,
        });
      }

      form.reset();
      setMainImageFile(null);
      setGalleryImageFiles([]);
      onSuccess?.();
      
      if (result?.id) {
        setShowExpertReview(true);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error.message?.includes('JWT')) {
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Please login again to continue.",
        });
        navigate("/admin/login");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to save product",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? 'Edit' : 'Add'} {productType === 'mobile' ? 'Mobile Phone' : 'Laptop'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-8">
                <div className="space-y-6">
                  <BasicInfoSection form={form} />
                  <Separator />
                  <SpecificationsSection form={form} productType={productType} />
                  <Separator />
                  <AdditionalSpecsSection form={form} productType={productType} />
                  <Separator />
                  <ImageSection 
                    onMainImageChange={handleMainImageChange}
                    onGalleryImagesChange={handleGalleryImagesChange}
                    currentImageUrl={initialData?.image_url}
                    currentGalleryImages={initialData?.gallery_images}
                    onRemoveGalleryImage={handleRemoveGalleryImage}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : initialData ? "Update" : "Add"} {productType === 'mobile' ? 'Mobile Phone' : 'Laptop'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(initialData?.id || showExpertReview) && (
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => setShowExpertReview(!showExpertReview)}
            className="w-full"
          >
            {showExpertReview ? 'Hide' : 'Add'} Expert Review
          </Button>
          
          {showExpertReview && (
            <ExpertReviewForm 
              productId={initialData?.id || ''} 
              onSuccess={() => {
                setShowExpertReview(false);
                toast({
                  title: "Success",
                  description: "Expert review added successfully",
                });
              }}
            />
          )}
        </div>
      )}
    </div>
  );
