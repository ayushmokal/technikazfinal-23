import { Link } from "react-router-dom";
import { BlogFormData } from "@/types/blog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CategoryHeroProps {
  featuredArticle: BlogFormData | undefined;
  gridArticles: BlogFormData[];
}

export function CategoryHero({ featuredArticle, gridArticles }: CategoryHeroProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 animate-fadeIn">
      {featuredArticle && (
        <>
          {/* Main Featured Article - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <Link to={`/article/${featuredArticle.slug}`} className="block group">
              <div className="relative overflow-hidden rounded-xl">
                <AspectRatio ratio={16/9}>
                  <img
                    src={featuredArticle.image_url}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
              </div>
            </Link>
            <Link 
              to={`/article/${featuredArticle.slug}`}
              className="block mt-3 hover:text-primary transition-colors"
            >
              <h2 className="text-xl md:text-2xl font-bold">
                {featuredArticle.title}
              </h2>
            </Link>
          </div>

          {/* Right Side Articles - Stack in one column */}
          <div className="lg:col-span-1 space-y-6">
            {gridArticles.slice(0, 2).map((article) => (
              <div key={article.slug}>
                <Link
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
                  </div>
                </Link>
                <Link 
                  to={`/article/${article.slug}`}
                  className="block mt-3 hover:text-primary transition-colors"
                >
                  <h3 className="text-base font-medium">
                    {article.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}