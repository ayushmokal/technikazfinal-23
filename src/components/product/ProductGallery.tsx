import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGalleryProps {
  mainImage: string | null;
  galleryImages?: string[];
  productName: string;
}

export function ProductGallery({ mainImage, galleryImages = [], productName }: ProductGalleryProps) {
  const allImages = [mainImage, ...(galleryImages || [])].filter((img): img is string => !!img);
  const [selectedImage, setSelectedImage] = useState(allImages[0] || "/placeholder.svg");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? allImages.length - 1 : prev - 1;
      setSelectedImage(allImages[newIndex]);
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev === allImages.length - 1 ? 0 : prev + 1;
      setSelectedImage(allImages[newIndex]);
      return newIndex;
    });
  };

  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-lg border bg-white">
        <img
          src={selectedImage}
          alt={productName}
          className="object-contain w-full h-full p-4"
        />
        {allImages.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <div
              key={index}
              className={`w-16 h-16 flex-shrink-0 rounded-lg border overflow-hidden cursor-pointer transition-all ${
                index === currentIndex ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'
              }`}
              onClick={() => {
                setSelectedImage(image);
                setCurrentIndex(index);
              }}
            >
              <img
                src={image}
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-contain p-2"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}