import { BlogFormData } from "@/types/blog";
import { ArticleCard } from "@/components/ArticleCard";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FeaturedArticlesGridProps {
  articles: BlogFormData[];
}

export function FeaturedArticlesGrid({ articles }: FeaturedArticlesGridProps) {
  if (!articles.length) return null;

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Main Featured Article - 60% width */}
      <div className="col-span-12 lg:col-span-7">
        <Link to={`/article/${articles[0].slug}`} className="block group h-full">
          <div className="relative overflow-hidden rounded-xl h-full">
            <AspectRatio ratio={16/9} className="h-[400px]">
              <img
                src={articles[0].image_url || '/placeholder.svg'}
                alt={articles[0].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </AspectRatio>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary/90 transition-colors">
                {articles[0].title}
              </h2>
            </div>
          </div>
        </Link>
      </div>

      {/* Second Article - 40% width */}
      {articles[1] && (
        <div className="col-span-12 lg:col-span-5">
          <Link to={`/article/${articles[1].slug}`} className="block group h-full">
            <div className="relative overflow-hidden rounded-xl h-full">
              <AspectRatio ratio={16/9} className="h-[400px]">
                <img
                  src={articles[1].image_url || '/placeholder.svg'}
                  alt={articles[1].title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </AspectRatio>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary/90 transition-colors">
                  {articles[1].title}
                </h2>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Remaining Articles */}
      {articles.slice(2).map((article) => (
        <div key={article.slug} className="col-span-12 sm:col-span-6 lg:col-span-3">
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