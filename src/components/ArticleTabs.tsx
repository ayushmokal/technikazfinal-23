import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogFormData } from "@/types/blog";

interface ArticleTabsProps {
  popularArticles: BlogFormData[];
  recentArticles: BlogFormData[];
  upcomingArticles?: BlogFormData[]; // Made optional
  onTabChange: (value: string) => void;
  category: string;
}

export function ArticleTabs({ 
  popularArticles, 
  recentArticles, 
  upcomingArticles = [], // Default to empty array
  onTabChange,
  category 
}: ArticleTabsProps) {
  // Helper function to get popular articles based on category
  const getPopularArticles = () => {
    console.log('Getting popular articles for category:', category);
    const categoryField = `popular_in_${category.toLowerCase()}` as keyof BlogFormData;
    const filteredArticles = recentArticles.filter(article => article[categoryField] === true);
    console.log('Filtered popular articles:', filteredArticles);
    return filteredArticles;
  };

  const filteredPopularArticles = getPopularArticles();

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
          filteredPopularArticles.map((article) => (
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
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No popular articles found in this category</p>
        )}
        <Button variant="outline" className="w-full">Load More</Button>
      </TabsContent>

      <TabsContent value="recent" className="space-y-4">
        {recentArticles.map((article) => (
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
        <Button variant="outline" className="w-full">Load More</Button>
      </TabsContent>

      {upcomingArticles.length > 0 && (
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingArticles.map((article) => (
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
          <Button variant="outline" className="w-full">Load More</Button>
        </TabsContent>
      )}
    </Tabs>
  );
}