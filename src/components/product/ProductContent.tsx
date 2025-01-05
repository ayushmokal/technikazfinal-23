import { ProductSpecifications } from "@/components/admin/ProductSpecifications";
import { ProductReview } from "./ProductReview";
import { CompareSection } from "./CompareSection";
import { ProductComments } from "./ProductComments";
import { Button } from "@/components/ui/button";
import type { LaptopProduct, MobileProduct } from "@/pages/ProductDetailPage";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface ProductContentProps {
  product: LaptopProduct | MobileProduct;
  type: 'mobile' | 'laptop';
  activeSection: string;
}

export function ProductContent({ product, type }: ProductContentProps) {
  const isLaptop = type === 'laptop';
  const [isOpen, setIsOpen] = useState(false);

  const { data: popularMobiles } = useQuery({
    queryKey: ['popular-mobiles', product.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mobile_products')
        .select('*')
        .neq('id', product.id)
        .limit(6);

      if (error) throw error;
      return data;
    },
    enabled: type === 'mobile',
  });

  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <section id="overview" className="scroll-mt-24">
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-6">{product.name} REVIEW</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-green-600">
                  PROS
                </h3>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>AI & productivity features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Strong performance & battery life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Good display & cameras</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Useful Pen</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-red-600">
                  CONS
                </h3>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>AI & productivity features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Strong performance & battery life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Good display & cameras</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Useful Pen</span>
                  </li>
                </ul>
              </div>
            </div>
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
              <CollapsibleTrigger asChild>
                <Button variant="link" className="text-primary hover:text-primary/90 p-0 h-auto font-semibold">
                  Read Full Reviews {'>'}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="prose max-w-none">
                  <p>
                    Detailed review content goes here. This section expands when the user clicks "Read Full Reviews".
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      <Separator />

      {/* Specifications Section */}
      <section id="specifications" className="scroll-mt-24">
        <a href="#specifications" className="no-underline hover:text-primary transition-colors">
          <h2 className="text-xl font-semibold mb-6">Full Specification</h2>
        </a>
        <ProductSpecifications product={product} />
      </section>

      <Separator />

      {/* Expert Review Section */}
      <section id="expert-review" className="scroll-mt-24">
        <h2 className="text-xl font-semibold mb-6">Expert Review</h2>
        <ProductReview productName={product.name} />
      </section>

      <Separator />

      {/* Compare Section */}
      <section id="compare" className="scroll-mt-24">
        <h2 className="text-xl font-semibold mb-6">Compare Products</h2>
        <CompareSection currentProduct={product} type={type} />
      </section>

      <Separator />

      {/* Comments Section */}
      <section id="comments" className="scroll-mt-24">
        <ProductComments productId={product.id} />
      </section>

      {type === 'mobile' && (
        <>
          <Separator />
          {/* Popular Mobiles Section */}
          <section id="popular-mobiles" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6">Popular Mobile Phones</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularMobiles?.map((mobile) => (
                <Link
                  key={mobile.id}
                  to={`/product/${mobile.id}?type=mobile`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
                >
                  <div className="aspect-square mb-4">
                    <img
                      src={mobile.image_url || "/placeholder.svg"}
                      alt={mobile.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{mobile.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">
                    ₹{mobile.price.toLocaleString()}
                  </p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Display: {mobile.display_specs}</p>
                    <p>Camera: {mobile.camera}</p>
                    <p>Battery: {mobile.battery}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}