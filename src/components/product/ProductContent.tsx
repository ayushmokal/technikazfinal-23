import { ProductSpecifications } from "@/components/admin/ProductSpecifications";
import { ProductReviewCard } from "./ProductReviewCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductKeySpecs } from "./ProductKeySpecs";
import { ProductComments } from "./ProductComments";
import { PopularMobiles } from "./PopularMobiles";
import type { LaptopProduct, MobileProduct } from "@/types/product";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { CompareDialog } from "./CompareDialog";
import { ProductRatingSystem } from "./ProductRatingSystem";
import { ProductReview } from "./ProductReview"; // Import the new ProductReview component

const getBrandWebsite = (brand: string): string => {
  const brandWebsites: { [key: string]: string } = {
    'Apple': 'https://www.apple.com',
    'Samsung': 'https://www.samsung.com',
    'OnePlus': 'https://www.oneplus.com',
    'Xiaomi': 'https://www.mi.com',
    'ASUS': 'https://www.asus.com',
    'Dell': 'https://www.dell.com',
    'HP': 'https://www.hp.com',
    'Lenovo': 'https://www.lenovo.com',
  };
  return brandWebsites[brand] || '#';
};

interface ProductContentProps {
  product: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
  activeSection: string;
}

export function ProductContent({ product, type }: ProductContentProps) {
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const isLaptop = type === 'laptop';
  const isMobile = type === 'mobile';
  const brandWebsite = getBrandWebsite(product.brand);

  return (
    <div className="flex-1 space-y-16">
      {/* Overview Section */}
      <section id="overview" className="scroll-mt-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Released January 2024</span>
                  </div>
                  <span>•</span>
                  <a 
                    href={brandWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                  >
                    About {product.brand}
                  </a>
                </div>
              </div>
              <Button 
                variant="default" 
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => setIsCompareDialogOpen(true)}
              >
                Compare
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">(onwards)</span>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">See All Variants</a>
            </div>

            {isMobile && (
              <div className="flex items-center gap-6">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="256 GB Storage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="256">256 GB Storage</SelectItem>
                    <SelectItem value="512">512 GB Storage</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Any Colour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Colour</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <ProductKeySpecs
              type={type}
              screenSize={product.display_specs}
              camera={isMobile ? (product as MobileProduct).camera : undefined}
              processor={product.processor}
              battery={product.battery}
              graphics={isLaptop ? (product as LaptopProduct).graphics : undefined}
            />
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section id="review" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Expert Review</h2>
        <ProductReview productId={product.id} />
      </section>

      {/* User Reviews Section */}
      <section id="user-reviews" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">User Reviews</h2>
        <ProductRatingSystem productId={product.id} />
        <div className="mt-8">
          <ProductComments productId={product.id} />
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specifications" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Full Specification</h2>
        <ProductSpecifications product={product} />
      </section>

      {/* Compare Section */}
      <section id="comparison" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Compare Products</h2>
        <div className="bg-white rounded-lg p-8 border shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 bg-gray-50 p-4 rounded-lg">
              <img 
                src={product.image_url || "/placeholder.svg"} 
                alt={product.name} 
                className="w-32 h-32 object-contain"
              />
              <h3 className="text-sm font-medium text-center mt-2">{product.name}</h3>
            </div>
            <div className="flex-grow space-y-4">
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-gray-900">Add devices to compare</h4>
                <p className="text-gray-600">Compare {product.name} with other devices to find the best match for you</p>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="default" 
                  className="bg-teal-600 hover:bg-teal-700 px-6 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsCompareDialogOpen(true)}
                >
                  Compare Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Mobiles Section */}
      {isMobile && <PopularMobiles />}

      <CompareDialog
        isOpen={isCompareDialogOpen}
        onClose={() => setIsCompareDialogOpen(false)}
        currentProduct={product}
        type={type}
      />
    </div>
  );
}
