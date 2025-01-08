import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductGalleryTabsProps {
  mainImage: string | null;
  productName: string;
}

export function ProductGalleryTabs({ mainImage, productName }: ProductGalleryTabsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    mainImage || "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">PHOTO ALBUMS</h2>
      </div>
      
      <div className="mt-4">
        <div className="relative bg-gray-50 rounded-lg">
          <div className="aspect-[4/3] flex items-center justify-center p-4">
            <img
              src={images[currentIndex]}
              alt={`${productName}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-4 pb-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded border overflow-hidden ${
                index === currentIndex 
                  ? 'border-emerald-600 ring-1 ring-emerald-600' 
                  : 'border-gray-200 hover:border-emerald-600'
              }`}
            >
              <img
                src={image}
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}