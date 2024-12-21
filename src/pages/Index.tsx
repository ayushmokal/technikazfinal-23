import { Navigation } from "@/components/Navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Index() {
  const [activeTab, setActiveTab] = useState<'popular' | 'recent'>('popular');

  const { data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      console.log('Fetched blogs:', data); // Debug log
      return data;
    }
  });

  const homepageFeatured = blogs?.filter(blog => blog.featured).slice(0, 6) || [];
  const techDeals = blogs?.filter(blog => blog.category === 'TECH' && blog.subcategory === 'TECH DEALS').slice(0, 4) || [];
  const mobileArticles = blogs?.filter(blog => blog.category === 'GADGETS' && blog.subcategory === 'MOBILE').slice(0, 4) || [];
  const popularArticles = blogs?.filter(blog => blog.popular).slice(0, 6) || [];
  const recentArticles = blogs?.slice(0, 6) || [];

  console.log('Mobile articles:', mobileArticles); // Debug log

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Homepage Featured Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Stories</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepageFeatured.map((article, index) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                image={article.image_url || ''}
                category={article.category}
                slug={article.slug}
                featured={index === 0}
              />
            ))}
          </div>
        </section>

        {/* Tech Deals Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">TECH DEALS</h2>
              <Link to="/TECH" className="text-sm text-primary hover:underline">See All</Link>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {techDeals.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                image={article.image_url || ''}
                category={article.category}
                slug={article.slug}
              />
            ))}
          </div>
        </section>

        {/* Mobiles Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">MOBILES</h2>
              <Link to="/gadgets?subcategory=MOBILE" className="text-sm text-primary hover:underline">See All</Link>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {mobileArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                image={article.image_url || ''}
                category={article.category}
                slug={article.slug}
              />
            ))}
          </div>
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular/Recent Articles */}
          <div className="lg:col-span-2">
            <div className="flex gap-4 mb-6">
              <Button 
                variant={activeTab === 'popular' ? 'default' : 'outline'} 
                className="rounded-full"
                onClick={() => setActiveTab('popular')}
              >
                Popular
              </Button>
              <Button 
                variant={activeTab === 'recent' ? 'default' : 'outline'} 
                className="rounded-full"
                onClick={() => setActiveTab('recent')}
              >
                Recent
              </Button>
            </div>
            <div className="space-y-6">
              {(activeTab === 'popular' ? popularArticles : recentArticles).map((article) => (
                <Link 
                  to={`/article/${article.slug}`}
                  key={article.slug} 
                  className="flex gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <img
                    src={article.image_url || '/placeholder.svg'}
                    alt={article.title}
                    className="w-32 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(article.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Button className="w-full mt-6">Load More</Button>
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