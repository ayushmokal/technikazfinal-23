import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ProductImageGalleryProps {
  product: {
    name: string;
    image_url: string | null;
  };
  trigger: React.ReactNode;
}

export function ProductImageGallery({ product, trigger }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    product?.image_url || "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const categories = [
    { id: 'design', label: 'DESIGN', count: 16 },
    { id: 'camera', label: 'CAMERA UI & SAMPLES', count: 25 },
    { id: '360', label: '360° VIEW', count: 1 },
    { id: 'ui', label: 'UI SCREENSHOTS', count: 11 },
    { id: 'benchmarks', label: 'BENCHMARKS', count: 3 },
    { id: 'videos', label: 'VIDEOS', count: 1 },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-7xl p-0 gap-0">
        <Tabs defaultValue="design" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b h-12 bg-white">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                {category.label} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="relative">
                <div className="flex items-center">
                  <button
                    onClick={previousImage}
                    className="absolute left-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white/90 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <div className="w-full overflow-hidden">
                    <div 
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                      {images.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                          <img
                            src={image}
                            alt={`${product.name} view ${index + 1}`}
                            className="w-full h-[80vh] object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white/90 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentImageIndex === index ? 'bg-primary' : 'bg-gray-300'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}