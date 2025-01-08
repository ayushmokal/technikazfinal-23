import { ProductSpecifications } from "@/components/admin/ProductSpecifications";
import { ProductReviewCard } from "./ProductReviewCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductKeySpecs } from "./ProductKeySpecs";
import { ProductComments } from "./ProductComments";
import { PopularMobiles } from "./PopularMobiles";
import type { LaptopProduct, MobileProduct } from "@/types/product";
import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { CompareDialog } from "./CompareDialog";
import { ProductRatingSystem } from "./ProductRatingSystem";
import { ProductReview } from "./ProductReview";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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
  const [selectedStorage, setSelectedStorage] = useState<string>(product.storage || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.color || '');
  const isLaptop = type === 'laptop';
  const isMobile = type === 'mobile';
  const brandWebsite = getBrandWebsite(product.brand || '');

  // Fetch product variants
  const { data: variants } = useQuery({
    queryKey: ['product-variants', product.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(type === 'laptop' ? 'laptops' : 'mobile_products')
        .select('*')
        .eq('name', product.name)
        .eq('brand', product.brand);

      if (error) throw error;
      return data || [];
    },
  });

  // Get unique storage and color options
  const storageOptions = [...new Set(variants?.map(v => v.storage))].filter(Boolean);
  const colorOptions = [...new Set(variants?.map(v => v.color))].filter(Boolean);

  useEffect(() => {
    if (product.storage) setSelectedStorage(product.storage);
    if (product.color) setSelectedColor(product.color);
  }, [product]);

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
              <a href="#variants" className="text-sm text-primary hover:underline">See All Variants</a>
            </div>

            {isMobile && (
              <div className="flex items-center gap-6">
                <Select value={selectedStorage} onValueChange={setSelectedStorage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Storage" />
                  </SelectTrigger>
                  <SelectContent>
                    {storageOptions.map((storage) => (
                      <SelectItem key={storage} value={storage || ''}>
                        {storage} Storage
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color} value={color || ''}>
                        {color}
                      </SelectItem>
                    ))}
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

      {/* Variants Section */}
      <section id="variants" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6">Available Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {variants?.map((variant) => (
            <div key={variant.id} className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">{variant.name}</h3>
              <p className="text-sm text-muted-foreground">
                {variant.storage} • {variant.color}
              </p>
              <p className="font-medium">₹{variant.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>

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
