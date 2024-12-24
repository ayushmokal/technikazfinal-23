import { BlogFormData } from "@/types/blog";
import { ArticleCard } from "@/components/ArticleCard";

interface ArticleGridProps {
  articles: BlogFormData[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (!articles.length) return null;

  // First article is main featured
  const mainArticle = articles[0];
  // Next two articles are featured
  const featuredArticles = articles.slice(1, 3);
  // Rest of the articles
  const regularArticles = articles.slice(3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {mainArticle && (
        <ArticleCard
          key={mainArticle.slug}
          title={mainArticle.title}
          image={mainArticle.image_url || ''}
          category={mainArticle.category}
          slug={mainArticle.slug}
          mainFeatured={true}
        />
      )}
      
      {featuredArticles.map((article) => (
        <ArticleCard
          key={article.slug}
          title={article.title}
          image={article.image_url || ''}
          category={article.category}
          slug={article.slug}
          featured={true}
        />
      ))}
      
      {regularArticles.map((article) => (
        <ArticleCard
          key={article.slug}
          title={article.title}
          image={article.image_url || ''}
          category={article.category}
          slug={article.slug}
        />
      ))}
    </div>
  );
}
