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
      <h2 className="text-xl font-semibold mb-4">PHOTO ALBUMS</h2>
      <Tabs defaultValue="design" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-4 py-2 whitespace-nowrap"
            >
              {category.label} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="aspect-square relative overflow-hidden rounded-lg border bg-white">
              <img
                src={images[currentIndex]}
                alt={`${productName} - ${category.label}`}
                className="object-contain w-full h-full p-4"
              />
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 mt-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 flex-shrink-0 rounded-lg border overflow-hidden cursor-pointer ${
                    index === currentIndex ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${productName} view ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}