import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";

interface ProductImageGalleryProps {
  mainImage: string;
  productName: string;
}

export function ProductImageGallery({ mainImage, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  // For demo purposes, we'll use the same image multiple times
  const thumbnails = Array(5).fill(mainImage);

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <AspectRatio ratio={1}>
          <img
            src={selectedImage || "/placeholder.svg"}
            alt={productName}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </Card>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {thumbnails.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(thumb)}
            className={`w-20 h-20 flex-shrink-0 rounded-lg border overflow-hidden 
              ${selectedImage === thumb ? 'ring-2 ring-primary' : ''}`}
          >
            <img
              src={thumb}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}