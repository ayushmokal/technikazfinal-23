import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductGalleryTabsProps {
  mainImage: string | null;
  productName: string;
}

export function ProductGalleryTabs({ mainImage, productName }: ProductGalleryTabsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { id: 'design', label: 'DESIGN', count: 16 },
    { id: 'camera', label: 'CAMERA UI & SAMPLES', count: 25 },
    { id: '360', label: '360° VIEW', count: 1 },
    { id: 'ui', label: 'UI SCREENSHOTS', count: 11 },
    { id: 'benchmarks', label: 'BENCHMARKS', count: 3 },
    { id: 'videos', label: 'VIDEOS', count: 1 },
  ];

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
      
      <Tabs defaultValue="design" className="w-full">
        <TabsList className="flex w-full h-auto p-0 bg-transparent border-b border-gray-200">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-4 py-2 text-sm font-bold text-gray-600 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600 hover:text-emerald-600 transition-colors"
            >
              {category.label} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-4">
            <div className="relative bg-gray-50 rounded-lg">
              <div className="aspect-[4/3] flex items-center justify-center p-4">
                <img
                  src={images[currentIndex]}
                  alt={`${productName} - ${category.label}`}
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
