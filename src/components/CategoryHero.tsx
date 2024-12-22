import { Link } from "react-router-dom";
import { BlogFormData } from "@/types/blog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CategoryHeroProps {
  featuredArticle: BlogFormData | undefined;
  gridArticles: BlogFormData[];
}

export function CategoryHero({ featuredArticle, gridArticles }: CategoryHeroProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-fadeIn">
      {featuredArticle && (
        <>
          {/* Main Featured Article - Takes up 2 columns */}
          <div className="lg:col-span-2 group">
            <Link to={`/article/${featuredArticle.slug}`} className="block">
              <div className="relative overflow-hidden rounded-xl">
                <AspectRatio ratio={16/9}>
                  <img
                    src={featuredArticle.image_url}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {featuredArticle.title}
                  </h2>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Side Articles - Stack in one column */}
          <div className="space-y-6">
            {gridArticles.slice(0, 2).map((article) => (
              <Link
                key={article.slug}
                to={`/article/${article.slug}`}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <AspectRatio ratio={16/9}>
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-lg font-semibold text-white">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}