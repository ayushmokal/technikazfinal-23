import { BlogFormData } from "@/types/blog";
import { SideArticle } from "@/components/SideArticle";

interface ArticleGridProps {
  articles: BlogFormData[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {articles.map((article) => (
        <SideArticle key={article.slug} article={article} />
      ))}
    </div>
  );
}