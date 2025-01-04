import { Button } from "@/components/ui/button";
import { Calendar, Heart } from "lucide-react";

interface ProductHeaderProps {
  name: string;
  brand: string;
  price: number;
}

export function ProductHeader({ name, brand, price }: ProductHeaderProps) {
  return (
    <div className="flex flex-col space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{name}</h1>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Released January 2024</span>
            </div>
            <span>About {brand}</span>
          </div>
        </div>
        <Button>Compare</Button>
      </div>

      {/* Price and Variants Section */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">₹{price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">(onwards)</span>
          </div>
          <a href="#" className="text-sm text-primary hover:underline">
            See All Variants
          </a>
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-md">
            <option>256 GB Storage</option>
            <option>512 GB Storage</option>
          </select>
          <select className="px-4 py-2 border rounded-md">
            <option>Any Colour</option>
            <option>Black</option>
            <option>Gold</option>
          </select>
        </div>
      </div>
    </div>
  );
}