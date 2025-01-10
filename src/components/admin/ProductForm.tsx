import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { SpecificationsSection } from "./form-sections/SpecificationsSection";
import { AdditionalSpecsSection } from "./form-sections/AdditionalSpecsSection";
import { CameraSection } from "./form-sections/CameraSection";
import { ImageSection } from "./form-sections/ImageSection";
import { ExpertReviewForm } from "./expert-review/ExpertReviewForm";
import { useProductForm } from "./hooks/useProductForm";
import type { MobileProductData, LaptopProductData } from "./types/productTypes";
import { useToast } from "@/components/ui/use-toast";

interface ProductFormProps {
  initialData?: (MobileProductData | LaptopProductData) & { id?: string };
  onSuccess?: () => void;
  productType?: 'mobile' | 'laptop';
}

export function ProductForm({ initialData, onSuccess, productType: propProductType }: ProductFormProps) {
  const [showExpertReview, setShowExpertReview] = useState(false);
  const [tempProductId, setTempProductId] = useState<string>("");
  const { toast } = useToast();
  
  const {
    form,
    isLoading,
    productType,
    handleMainImageChange,
    handleGalleryImagesChange,
    handleRemoveGalleryImage,
    onSubmit,
  } = useProductForm({ 
    initialData, 
    onSuccess: (productId) => {
      setTempProductId(productId);
      toast({
        title: "Success",
        description: `Product ${initialData ? 'updated' : 'added'} successfully`,
      });
      onSuccess?.();
    }, 
    productType: propProductType 
  });

  const handleFormSubmit = async (data: MobileProductData | LaptopProductData) => {
    try {
      // Create base form data with common fields
      const baseFormData = {
        ...data,
        multimedia_specs: {},
        design_specs: {},
        performance_specs: {},
        display_details: {},
      };

      // Add type-specific fields based on product type
      const formData = productType === 'mobile' 
        ? {
            ...baseFormData,
            sensor_specs: (data as MobileProductData).sensor_specs || {},
            network_specs: (data as MobileProductData).network_specs || {},
            camera_details: (data as MobileProductData).camera_details || {},
            general_specs: (data as MobileProductData).general_specs || {},
          }
        : {
            ...baseFormData,
            connectivity_specs: (data as LaptopProductData).connectivity_specs || {},
          };

      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save product. Please try again.",
      });
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
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
              <div className="grid gap-8">
                <div className="space-y-6">
                  <BasicInfoSection form={form} />
                  <Separator />
                  <SpecificationsSection form={form} productType={productType} />
                  <Separator />
                  <AdditionalSpecsSection form={form} productType={productType} />
                  <Separator />
                  <CameraSection form={form} productType={productType} />
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

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowExpertReview(!showExpertReview)}
                className="w-full"
              >
                {showExpertReview ? 'Hide' : 'Add'} Expert Review
              </Button>

              {showExpertReview && (
                <ExpertReviewForm 
                  productId={initialData?.id || tempProductId} 
                  className="mt-6"
                />
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : initialData ? "Update" : "Add"} {productType === 'mobile' ? 'Mobile Phone' : 'Laptop'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}