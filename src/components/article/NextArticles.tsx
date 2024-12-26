import { BlogFormData } from "@/types/blog";
import { ArticleContent } from "./ArticleContent";
import { Button } from "@/components/ui/button";

interface NextArticlesProps {
  articles: BlogFormData[];
  isLoadingMore: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

export function NextArticles({ articles, isLoadingMore, onLoadMore, hasMore }: NextArticlesProps) {
  if (!articles.length) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">More Articles</h2>
      {articles.map((article) => (
        <ArticleContent key={article.slug} blog={article} />
      ))}
      
      {hasMore && (
        <div className="flex justify-center py-8">
          <Button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            variant="outline"
            size="lg"
          >
            {isLoadingMore ? "Loading..." : "Load More Articles"}
          </Button>
        </div>
      )}
    </div>
  );
}