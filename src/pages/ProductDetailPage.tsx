import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSidebar } from "@/components/product/ProductSidebar";
import { ProductContent } from "@/components/product/ProductContent";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export type ProductType = 'mobile' | 'laptop';

export default function ProductDetailPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as ProductType || 'mobile';
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id, type],
    queryFn: async () => {
      if (!id) {
        throw new Error('Product ID is required');
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('type', type)
        .maybeSingle();

      if (error) {
        console.error('Error fetching product:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product details",
        });
        throw error;
      }

      if (!data) {
        toast({
          variant: "destructive",
          title: "Not Found",
          description: "Product not found",
        });
        navigate('/gadgets');
        return null;
      }

      return data;
    },
    enabled: !!id,
  });

  if (isLoading || !product) {
    return (
      <Layout>
        <div className="container mx-auto py-4 px-4 md:py-8">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-4 px-4 md:py-8">
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-[1fr_3fr]'} gap-6 md:gap-8`}>
          <div className="space-y-6 md:space-y-8">
            <ProductGallery 
              mainImage={product.image_url} 
              productName={product.name}
              galleryImages={product.gallery_images}
            />
            {!isMobile && (
              <ProductSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                mainImage={product.image_url}
                productName={product.name}
                galleryImages={product.gallery_images}
              />
            )}
          </div>
          <ProductContent
            product={product}
            type={type}
            activeSection={activeSection}
          />
        </div>
      </div>
    </Layout>
  );
}