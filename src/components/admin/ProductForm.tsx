import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { SpecificationsSection } from "./form-sections/SpecificationsSection";
import { AdditionalSpecsSection } from "./form-sections/AdditionalSpecsSection";
import { ImageSection } from "./form-sections/ImageSection";
import { ExpertReviewForm } from "./ExpertReviewForm";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      setTempProductId(productId);
      if (onSuccess) {
        await onSuccess();
      }
      toast({
        title: "Success",
        description: `${initialData ? 'Updated' : 'Added'} ${productType === 'mobile' ? 'mobile phone' : 'laptop'} successfully!`,
      });
      
      if (!initialData) {
        form.reset();
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach((input: any) => {
          input.value = '';
        });
      }
    }, 
    productType: propProductType 
  });

  const handleFormSubmit = async (data: MobileProductData | LaptopProductData) => {
    try {
      setIsSubmitting(true);
      console.log("Starting form submission with data:", data);
      
      // Only validate required fields based on database schema
      const requiredFields = ['name', 'brand', 'price', 'display_specs', 'processor', 'ram', 'storage', 'battery'];
      if (productType === 'mobile') {
        requiredFields.push('camera');
      }

      const missingFields = requiredFields.filter(field => !data[field as keyof typeof data]);
      
      if (missingFields.length > 0) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: `Please fill in these required fields: ${missingFields.join(', ')}`,
        });
        return;
      }

      const formattedData = {
        ...data,
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price
      };

      const result = await onSubmit(formattedData);
      
      if (result) {
        setTempProductId(result.id);
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
    } finally {
      setIsSubmitting(false);
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
                disabled={isSubmitting || isLoading}
                className="w-full mb-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
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