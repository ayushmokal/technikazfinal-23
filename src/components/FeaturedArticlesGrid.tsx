import { BlogFormData } from "@/types/blog";
import { ArticleCard } from "@/components/ArticleCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";

interface FeaturedArticlesGridProps {
  articles: BlogFormData[];
}

export function FeaturedArticlesGrid({ articles }: FeaturedArticlesGridProps) {
  if (!articles.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
      {/* Main Featured Article */}
      <div className="col-span-1 md:col-span-7">
        <Link to={`/article/${articles[0].slug}`} className="block group">
          <div className="relative overflow-hidden rounded-xl">
            <AspectRatio ratio={16/9}>
              <img
                src={articles[0].image_url || '/placeholder.svg'}
                alt={articles[0].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </AspectRatio>
          </div>
          <h2 className="mt-4 text-xl md:text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors">
            {articles[0].title}
          </h2>
        </Link>
      </div>

      {/* Second Article */}
      {articles[1] && (
        <div className="col-span-1 md:col-span-5">
          <Link to={`/article/${articles[1].slug}`} className="block group">
            <div className="relative overflow-hidden rounded-xl">
              <AspectRatio ratio={16/9}>
                <img
                  src={articles[1].image_url || '/placeholder.svg'}
                  alt={articles[1].title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </AspectRatio>
            </div>
            <h2 className="mt-4 text-lg md:text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors">
              {articles[1].title}
            </h2>
          </Link>
        </div>
      )}

      {/* Remaining Articles */}
      {articles.slice(2).map((article) => (
        <div key={article.slug} className="col-span-1 sm:col-span-1 md:col-span-3">
          <ArticleCard
            title={article.title}
            image={article.image_url || ''}
            category={article.category}
            slug={article.slug}
          />
        </div>
      ))}
    </div>
  );
}