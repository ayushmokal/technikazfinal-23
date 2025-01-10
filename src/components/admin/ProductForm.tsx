import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { useProductForm } from "./hooks/useProductForm";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { SpecificationsSection } from "./form-sections/SpecificationsSection";
import { ImageSection } from "./form-sections/ImageSection";
import { CameraSection } from "./form-sections/CameraSection";
import { AdditionalSpecsSection } from "./form-sections/AdditionalSpecsSection";
import type { ProductFormProps } from "./types/productTypes";

export function ProductForm({ initialData, onSuccess, productType: propProductType }: ProductFormProps) {
  const {
    form,
    isLoading,
    productType,
    handleMainImageChange,
    handleGalleryImagesChange,
    handleRemoveGalleryImage,
    onSubmit,
  } = useProductForm({ initialData, onSuccess, productType: propProductType });

  const handleFormSubmit = async (data: any) => {
    try {
      const formData = {
        ...data,
        id: initialData?.id,
        multimedia_specs: data.multimedia_specs || {},
        design_specs: data.design_specs || {},
        performance_specs: data.performance_specs || {},
        display_details: data.display_details || {},
        ...(productType === 'mobile' ? {
          sensor_specs: data.sensor_specs || {},
          network_specs: data.network_specs || {},
          camera_details: data.camera_details || {},
          general_specs: data.general_specs || {},
        } : {
          connectivity_specs: data.connectivity_specs || {},
        })
      };

      await onSubmit(formData);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <Card className="p-6 space-y-8">
          <BasicInfoSection form={form} />
          
          <ImageSection
            form={form}
            onMainImageChange={handleMainImageChange}
            onGalleryImagesChange={handleGalleryImagesChange}
            onRemoveGalleryImage={handleRemoveGalleryImage}
          />
          
          <SpecificationsSection form={form} productType={productType} />
          
          {productType === 'mobile' && (
            <>
              <CameraSection form={form} />
              <AdditionalSpecsSection form={form} />
            </>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : initialData ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </Card>
      </form>
    </div>
  );
}