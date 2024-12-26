import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogFormData } from "@/types/blog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
    if (category === "HOME") {
      return popularArticles;
    }
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

  const ArticleItem = ({ article }: { article: BlogFormData }) => (
    <Link
      key={article.slug}
      to={`/article/${article.slug}`}
      className="flex gap-4 group hover:bg-gray-100 p-2 rounded-lg"
    >
      <div className="w-[240px] h-[135px] overflow-hidden rounded">
        <AspectRatio ratio={16/9}>
          <img
            src={article.image_url}
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
              <ArticleItem key={article.slug} article={article} />
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
          <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No popular articles available</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="recent" className="space-y-4">
        {recentArticles.slice(0, visibleRecent).map((article) => (
          <ArticleItem key={article.slug} article={article} />
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
            <ArticleItem key={article.slug} article={article} />
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