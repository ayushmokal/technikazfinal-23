import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogFormData } from "@/types/blog";

interface ArticleTabsProps {
  popularArticles: BlogFormData[];
  recentArticles: BlogFormData[];
  upcomingArticles?: BlogFormData[];
  onTabChange: (value: string) => void;
  category: string;
}

const ITEMS_PER_PAGE = 6;

export function ArticleTabs({ 
  popularArticles, 
  recentArticles, 
  upcomingArticles = [],
  onTabChange,
  category 
}: ArticleTabsProps) {
  const [visiblePopular, setVisiblePopular] = useState(ITEMS_PER_PAGE);
  const [visibleRecent, setVisibleRecent] = useState(ITEMS_PER_PAGE);
  const [visibleUpcoming, setVisibleUpcoming] = useState(ITEMS_PER_PAGE);

  // Helper function to get popular articles based on category
  const getPopularArticles = () => {
    console.log('Getting popular articles for category:', category);
    const categoryField = `popular_in_${category.toLowerCase()}` as keyof BlogFormData;
    const filteredArticles = popularArticles.filter(article => {
      const isPopular = article[categoryField];
      console.log(`Article ${article.title} popular status:`, isPopular);
      return isPopular === true;
    });
    console.log('Filtered popular articles:', filteredArticles);
    return filteredArticles;
  };

  const filteredPopularArticles = getPopularArticles();

  const handleLoadMore = (tab: string) => {
    switch (tab) {
      case 'popular':
        setVisiblePopular(prev => prev + ITEMS_PER_PAGE);
        break;
      case 'recent':
        setVisibleRecent(prev => prev + ITEMS_PER_PAGE);
        break;
      case 'upcoming':
        setVisibleUpcoming(prev => prev + ITEMS_PER_PAGE);
        break;
    }
  };

  return (
    <Tabs defaultValue="popular" className="w-full" onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="popular">Popular</TabsTrigger>
        <TabsTrigger value="recent">Recent</TabsTrigger>
        {upcomingArticles.length > 0 && (
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="popular" className="space-y-4">
        {filteredPopularArticles.length > 0 ? (
          <>
            {filteredPopularArticles.slice(0, visiblePopular).map((article) => (
              <Link
                key={article.slug}
                to={`/article/${article.slug}`}
                className="flex gap-4 group hover:bg-gray-100 p-2 rounded-lg"
              >
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-32 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(article.created_at).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
            {filteredPopularArticles.length > visiblePopular && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleLoadMore('popular')}
              >
                Load More
              </Button>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center py-4">No popular articles found in this category</p>
        )}
      </TabsContent>

      <TabsContent value="recent" className="space-y-4">
        {recentArticles.slice(0, visibleRecent).map((article) => (
          <Link
            key={article.slug}
            to={`/article/${article.slug}`}
            className="flex gap-4 group hover:bg-gray-100 p-2 rounded-lg"
          >
            <img
              src={article.image_url}
              alt={article.title}
              className="w-32 h-24 object-cover rounded"
            />
            <div>
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(article.created_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
        {recentArticles.length > visibleRecent && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleLoadMore('recent')}
          >
            Load More
          </Button>
        )}
      </TabsContent>

      {upcomingArticles.length > 0 && (
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingArticles.slice(0, visibleUpcoming).map((article) => (
            <Link
              key={article.slug}
              to={`/article/${article.slug}`}
              className="flex gap-4 group hover:bg-gray-100 p-2 rounded-lg"
            >
              <img
                src={article.image_url}
                alt={article.title}
                className="w-32 h-24 object-cover rounded"
              />
              <div>
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Coming {new Date(article.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
          {upcomingArticles.length > visibleUpcoming && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleLoadMore('upcoming')}
            >
              Load More
            </Button>
          )}
        </TabsContent>
      )}
    </Tabs>
  );
}