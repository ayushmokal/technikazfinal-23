import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { SpecificationsSection } from "./form-sections/SpecificationsSection";
import { AdditionalSpecsSection } from "./form-sections/AdditionalSpecsSection";
import { ImageSection } from "./form-sections/ImageSection";
import { ExpertReviewForm } from "./expert-review/ExpertReviewForm";
import { useProductForm } from "./hooks/useProductForm";
import { useToast } from "@/hooks/use-toast";
import type { MobileProductData, LaptopProductData } from "./types/productTypes";

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
    onSuccess: async (productId) => {
      try {
        setTempProductId(productId);
        toast({
          title: "Success",
          description: `${initialData ? 'Updated' : 'Added'} ${productType === 'mobile' ? 'mobile phone' : 'laptop'} successfully!`,
        });
        if (onSuccess) {
          await onSuccess();
        }
      } catch (error: any) {
        console.error("Error in onSuccess callback:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to process product",
        });
      }
    }, 
    productType: propProductType 
  });

  const handleFormSubmit = async (data: MobileProductData | LaptopProductData) => {
    try {
      console.log("Form submission started with data:", data);
      
      // Basic validation
      if (!data.name || !data.brand || !data.price) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please fill in all required fields",
        });
        return;
      }

      // Submit form data
      const result = await onSubmit(data);
      console.log("Form submission completed with result:", result);
      
      // Reset form and show success message
      form.reset();
      setShowExpertReview(false);
      
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit form",
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

              {showExpertReview && tempProductId && (
                <ExpertReviewForm 
                  productId={initialData?.id || tempProductId} 
                  className="mt-6"
                  onSuccess={() => {
                    toast({
                      title: "Success",
                      description: "Expert review added successfully",
                    });
                    setShowExpertReview(false);
                  }}
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