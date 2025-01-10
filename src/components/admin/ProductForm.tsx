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
      console.log("Starting form submission with data:", data);
      
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
      const result = await onSubmit({
        ...data,
        // Ensure all specification fields are included
        display_specs: data.display_specs || '',
        processor: data.processor || '',
        ram: data.ram || '',
        storage: data.storage || '',
        battery: data.battery || '',
        ...(productType === 'mobile' ? {
          camera: (data as MobileProductData).camera || '',
        } : {
          graphics: (data as LaptopProductData).graphics || '',
          ports: (data as LaptopProductData).ports || '',
        })
      });
      
      console.log("Form submission completed with result:", result);
      
      if (result) {
        setTempProductId(result.id);
        // Reset form only on successful submission of new products
        if (!initialData) {
          form.reset();
          // Clear any file inputs
          const fileInputs = document.querySelectorAll('input[type="file"]');
          fileInputs.forEach((input: any) => {
            input.value = '';
          });
        }
        
        // Show success toast with more details
        toast({
          title: "Success!",
          description: `Product "${data.name}" has been ${initialData ? 'updated' : 'added'} successfully.`,
          duration: 5000,
        });
      }
      
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
                type="submit"
                disabled={isLoading}
                className="w-full mb-4"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⌛</span>
                    Saving...
                  </span>
                ) : (
                  `${initialData ? 'Update' : 'Add'} ${productType === 'mobile' ? 'Mobile Phone' : 'Laptop'}`
                )}
              </Button>

              {(initialData?.id || tempProductId) && (
                <>
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
                      onSuccess={() => {
                        toast({
                          title: "Success",
                          description: "Expert review added successfully",
                        });
                        setShowExpertReview(false);
                      }}
                    />
                  )}
                </>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}