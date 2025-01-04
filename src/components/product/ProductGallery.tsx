import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProductGalleryProps {
  mainImage: string | null;
  productName: string;
}

export function ProductGallery({ mainImage, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-lg border bg-white">
        <img
          src={selectedImage || "/placeholder.svg"}
          alt={productName}
          className="object-contain w-full h-full p-4"
        />
      </div>
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="w-20 h-20 flex-shrink-0 rounded-lg border overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(mainImage)}
            >
              <img
                src={mainImage || "/placeholder.svg"}
                alt={`${productName} view ${index}`}
                className="w-full h-full object-contain p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}