import { Navigation } from "@/components/Navigation";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { FeaturedArticlesGrid } from "@/components/FeaturedArticlesGrid";
import { CarouselSection } from "@/components/CarouselSection";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [activeTab, setActiveTab] = useState<'popular' | 'recent'>('popular');

  const { data: blogs, isError, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      try {
        console.log('Fetching all blogs');
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        if (!data) {
          console.log('No data returned');
          return [];
        }
        
        console.log('Blogs fetched successfully:', data);
        return data;
      } catch (err) {
        console.error('Error in queryFn:', err);
        throw err;
      }
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    meta: {
      errorMessage: 'Failed to fetch blog posts'
    }
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
  
  const popularArticles = blogs?.filter(blog => blog.popular).slice(0, 6) || [];
  const recentArticles = blogs?.slice(0, 6) || [];

  const ArticleItem = ({ article }: { article: any }) => (
    <Link
      to={`/article/${article.slug}`}
      className="flex gap-4 group hover:bg-gray-100 p-2 rounded-lg"
    >
      <div className="w-[240px] h-[135px] overflow-hidden rounded">
        <AspectRatio ratio={16/9}>
          <img
            src={article.image_url || '/placeholder.svg'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </AspectRatio>
      </div>
      <div className="flex-1">
        <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          {new Date(article.created_at).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center p-8 bg-red-50 rounded-lg">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error loading content</h2>
            <p className="text-gray-600 mb-4">
              {error instanceof Error ? error.message : 'Please try again later'}
            </p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Retry
            </Button>
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
          <div className="flex flex-col items-center justify-center space-y-4 p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <h2 className="text-xl font-medium text-gray-600">Loading content...</h2>
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

        {/* Advertisement Section */}
        <div className="w-full h-[100px] bg-gray-200 flex items-center justify-center mb-12">
          <span className="text-gray-500">Ads Here</span>
        </div>

        {/* Tech Deals Section */}
        <CarouselSection 
          title="TECH DEALS"
          linkTo="/tech"
          articles={techDeals}
        />

        {/* Advertisement Section */}
        <div className="w-full h-[100px] bg-gray-200 flex items-center justify-center mb-12">
          <span className="text-gray-500">Ads Here</span>
        </div>

        {/* Mobiles Section */}
        <CarouselSection 
          title="MOBILES"
          linkTo="/gadgets?subcategory=MOBILE"
          articles={mobileArticles}
        />

        {/* Advertisement Section */}
        <div className="w-full h-[100px] bg-gray-200 flex items-center justify-center mb-12">
          <span className="text-gray-500">Ads Here</span>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular/Recent Articles */}
          <div className="lg:col-span-2">
            <div className="flex gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-full ${
                  activeTab === 'popular'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-200'
                }`}
                onClick={() => setActiveTab('popular')}
              >
                Popular
              </button>
              <button
                className={`px-4 py-2 rounded-full ${
                  activeTab === 'recent'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-200'
                }`}
                onClick={() => setActiveTab('recent')}
              >
                Recent
              </button>
            </div>
            <div className="space-y-6">
              {(activeTab === 'popular' ? popularArticles : recentArticles).map(
                (article) => (
                  <ArticleItem key={article.slug} article={article} />
                )
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}