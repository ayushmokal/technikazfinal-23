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
import type { MobileProductData, LaptopProductData } from "./types/productTypes";

interface ProductFormProps {
  initialData?: (MobileProductData | LaptopProductData) & { id?: string };
  onSuccess?: () => void;
  productType?: 'mobile' | 'laptop';
}

export function ProductForm({ initialData, onSuccess, productType: propProductType }: ProductFormProps) {
  const [showExpertReview, setShowExpertReview] = useState(true);
  const [productId, setProductId] = useState<string>(initialData?.id || "");
  
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
    onSuccess: (newProductId) => {
      setProductId(newProductId);
      onSuccess?.();
    }, 
    productType: propProductType 
  });

  const fillSampleData = () => {
    if (productType === 'mobile') {
      form.reset({
        name: "Sample Mobile Phone",
        brand: "TechBrand",
        model_name: "X2000",
        price: 999.99,
        display_specs: "6.7-inch AMOLED",
        processor: "Snapdragon 8 Gen 2",
        camera: "108MP + 12MP + 8MP",
        battery: "5000mAh",
        ram: "8GB",
        storage: "256GB",
        os: "Android 14",
        chipset: "Latest Snapdragon",
        charging_specs: "65W Fast Charging",
        resolution: "2400 x 1080",
        screen_size: "6.7 inches",
        color: "Midnight Black",
        launch_date: "2024",
        custom_ui: "CustomOS 5.0",
        software_support: "3 years",
        architecture: "64-bit",
        fabrication: "4nm",
        ram_type: "LPDDR5",
        display_type: "AMOLED",
        aspect_ratio: "20:9",
        pixel_density: "395 ppi",
        screen_protection: "Gorilla Glass Victus",
        bezel_less: true,
        touch_screen: true,
        peak_brightness: "1500 nits",
        hdr_support: "HDR10+",
        refresh_rate: "120Hz",
        height: "164.3mm",
        width: "74.6mm",
        thickness: "8.9mm",
        weight: "206g",
        build_material: "Glass and Aluminum",
        waterproof: "IP68",
        ruggedness: "Military Grade",
        camera_setup: "Triple Camera",
        camera_autofocus: true,
        camera_ois: true,
        camera_flash: "Dual LED",
        camera_modes: "Night Mode, Portrait, Pro",
        video_recording: "8K@24fps",
        front_camera_setup: "32MP",
        front_camera_video: "4K@60fps"
      });
    } else {
      form.reset({
        name: "Sample Laptop",
        brand: "TechBook",
        model_name: "Pro X15",
        price: 1499.99,
        display_specs: "15.6-inch IPS",
        processor: "Intel Core i7-13700H",
        ram: "16GB",
        storage: "512GB SSD",
        graphics: "RTX 4060",
        battery: "90Wh",
        os: "Windows 11 Pro",
        ports: "2x USB-C, 3x USB-A, HDMI",
        color: "Space Gray"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{initialData ? 'Edit' : 'Add'} {productType === 'mobile' ? 'Mobile Phone' : 'Laptop'}</CardTitle>
            <Button 
              type="button" 
              variant="outline" 
              onClick={fillSampleData}
              className="ml-4"
            >
              Fill Sample Data
            </Button>
          </div>
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

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowExpertReview(!showExpertReview)}
                className="w-full"
              >
                {showExpertReview ? 'Hide' : 'Show'} Expert Review
              </Button>

              {showExpertReview && (
                <ExpertReviewForm 
                  productId={productId} 
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