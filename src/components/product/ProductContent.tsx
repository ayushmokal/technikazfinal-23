import { ProductSpecifications } from "@/components/admin/ProductSpecifications";
import { ProductReview } from "./ProductReview";
import { CompareSection } from "./CompareSection";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductKeySpecs } from "./ProductKeySpecs";
import { ProductComments } from "./ProductComments";
import { PopularMobiles } from "./PopularMobiles";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";
import { Heart, Calendar } from "lucide-react";

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
    // Add more brands as needed
  };
  return brandWebsites[brand] || '#';
};

interface ProductContentProps {
  product: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
  activeSection: string;
}

export function ProductContent({ product, type }: ProductContentProps) {
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
                  <Heart className="w-6 h-6 stroke-1" />
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
              <Button variant="default" className="bg-teal-600 hover:bg-teal-700">Compare</Button>
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
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{product.name} REVIEW</h2>
          <ProductReview productName={product.name} />
          <div className="mb-12">
            <a href="#" className="text-primary hover:underline text-sm">Read Full Reviews →</a>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specifications" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Full Specification</h2>
        <ProductSpecifications product={product} />
      </section>

      {/* Expert Review Section */}
      <section id="expert-review" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Expert Review</h2>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">{product.name} REVIEW</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-green-600 mb-4">PROS</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">+</span>
                  <span>Premium build quality</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">+</span>
                  <span>Excellent performance</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">+</span>
                  <span>Great camera system</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-4">CONS</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-red-600">-</span>
                  <span>Premium pricing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600">-</span>
                  <span>No charger in box</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600">-</span>
                  <span>Average battery life</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison section removed */}

      {/* Comments Section */}
      <section id="user-comments" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        <ProductComments productId={product.id} />
      </section>

      {/* Popular Mobiles Section */}
      {isMobile && <PopularMobiles />}
    </div>
  );
}
