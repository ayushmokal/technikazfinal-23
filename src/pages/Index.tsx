import { Navigation } from "@/components/Navigation";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { FeaturedArticlesGrid } from "@/components/FeaturedArticlesGrid";
import { CarouselSection } from "@/components/CarouselSection";
import { ArticleTabs } from "@/components/ArticleTabs";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const [activeTab, setActiveTab] = useState("popular");
  const { toast } = useToast();

  const { data: blogs = [], isError, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      try {
        console.log('Fetching all blogs');
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching blogs:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load blog posts. Please try again later.",
          });
          throw error;
        }
        
        console.log('Blogs fetched:', data);
        return data || [];
      } catch (error) {
        console.error('Error in blogs query:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
        });
        throw error;
      }
    },
    retry: 2,
    retryDelay: 1000,
  });

  // Filter blogs after successful fetch
  const homepageFeatured = blogs?.filter(blog => blog.featured).slice(0, 6) || [];
  const techDeals = blogs?.filter(blog => 
    blog.category === 'TECH' && 
    blog.subcategory === 'Tech Deals'
  ) || [];
  
  const mobileArticles = blogs?.filter(blog => 
    blog.category === 'GADGETS' && 
    blog.subcategory === 'MOBILE'
  ).slice(0, 4) || [];
  
  const popularArticles = blogs?.filter(blog => blog.popular) || [];
  const recentArticles = blogs?.slice(0, 6) || [];

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Error loading content</h2>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Loading...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Homepage Featured Section */}
        <section className="mb-12">
          <FeaturedArticlesGrid articles={homepageFeatured} />
        </section>

        {/* Advertisement Section Above Tech Deals */}
        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center mb-12">
          <span className="text-gray-500">Advertisement</span>
        </div>

        {/* Tech Deals Section */}
        <CarouselSection 
          title="TECH DEALS"
          linkTo="/tech"
          articles={techDeals}
        />

        {/* Mobiles Section */}
        <CarouselSection 
          title="MOBILES"
          linkTo="/gadgets?subcategory=MOBILE"
          articles={mobileArticles}
        />

        {/* Advertisement Section Below Mobiles */}
        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center mb-12">
          <span className="text-gray-500">Advertisement</span>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <ArticleTabs
              popularArticles={popularArticles}
              recentArticles={recentArticles}
              onTabChange={setActiveTab}
              category="HOME"
            />
          </div>

          <div className="lg:col-span-4">
            <BlogSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}