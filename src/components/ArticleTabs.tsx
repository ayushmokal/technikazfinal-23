import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SideArticle } from "@/components/SideArticle";
import { BlogFormData } from "@/types/blog";
import { Button } from "@/components/ui/button";

interface ArticleTabsProps {
  popularArticles: BlogFormData[];
  recentArticles: BlogFormData[];
  onTabChange: (value: string) => void;
  category: string;
}

export function ArticleTabs({
  popularArticles,
  recentArticles,
  onTabChange,
  category,
}: ArticleTabsProps) {
  const [visiblePopularArticles, setVisiblePopularArticles] = useState(6);
  const [visibleRecentArticles, setVisibleRecentArticles] = useState(6);

  const handleLoadMorePopular = () => {
    setVisiblePopularArticles((prev) => prev + 6);
  };

  const handleLoadMoreRecent = () => {
    setVisibleRecentArticles((prev) => prev + 6);
  };

  return (
    <Tabs defaultValue="popular" onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="popular">Popular in {category}</TabsTrigger>
        <TabsTrigger value="recent">Recent</TabsTrigger>
      </TabsList>
      <TabsContent value="popular">
        <div className="space-y-6">
          {popularArticles.slice(0, visiblePopularArticles).map((article) => (
            <SideArticle key={article.slug} article={article} />
          ))}
          {visiblePopularArticles < popularArticles.length && (
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={handleLoadMorePopular}
                className="w-full max-w-[200px]"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="recent">
        <div className="space-y-6">
          {recentArticles.slice(0, visibleRecentArticles).map((article) => (
            <SideArticle key={article.slug} article={article} />
          ))}
          {visibleRecentArticles < recentArticles.length && (
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={handleLoadMoreRecent}
                className="w-full max-w-[200px]"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}