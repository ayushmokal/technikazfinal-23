import { BlogFormData } from "@/types/blog";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ArticleGridProps {
  articles: BlogFormData[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (!articles.length) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);
  const remainingArticles = articles.slice(3);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Featured Article - 60% width */}
        <div className="col-span-12 lg:col-span-7">
          <Link to={`/article/${mainArticle.slug}`} className="block group">
            <div className="relative overflow-hidden rounded-xl">
              <AspectRatio ratio={4/3}>
                <img
                  src={mainArticle.image_url || '/placeholder.svg'}
                  alt={mainArticle.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </AspectRatio>
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
              {mainArticle.title}
            </h2>
          </Link>
        </div>

        {/* Side Articles - 40% width */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          {sideArticles.map((article) => (
            <div key={article.slug} className="bg-white rounded-xl overflow-hidden group">
              <Link to={`/article/${article.slug}`} className="block">
                <div className="relative overflow-hidden">
                  <AspectRatio ratio={4/3}>
                    <img
                      src={article.image_url || '/placeholder.svg'}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Remaining Articles Grid */}
      {remainingArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {remainingArticles.map((article) => (
            <div key={article.slug} className="bg-white rounded-xl overflow-hidden group">
              <Link to={`/article/${article.slug}`} className="block">
                <div className="relative overflow-hidden">
                  <AspectRatio ratio={16/9}>
                    <img
                      src={article.image_url || '/placeholder.svg'}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}