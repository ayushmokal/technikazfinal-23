import { BlogFormData } from "@/types/blog";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CategoryHeroProps {
  featuredArticle: BlogFormData | undefined;
  gridArticles: BlogFormData[];
}

export function CategoryHero({ featuredArticle, gridArticles }: CategoryHeroProps) {
  if (!featuredArticle) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 mb-8 animate-fadeIn">
      {/* Main Featured Article */}
      <div className="lg:col-span-3 bg-white rounded-xl overflow-hidden group">
        <Link to={`/article/${featuredArticle.slug}`} className="block">
          <div className="relative overflow-hidden">
            <AspectRatio ratio={16/9}>
              <img
                src={featuredArticle.image_url}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </AspectRatio>
          </div>
          <div className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold hover:text-primary transition-colors">
              {featuredArticle.title}
            </h2>
          </div>
        </Link>
      </div>

      {/* Side Articles Column */}
      <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {gridArticles.slice(0, 2).map((article) => (
          <div key={article.slug} className="bg-white rounded-xl overflow-hidden group">
            <Link to={`/article/${article.slug}`} className="block">
              <div className="relative overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-medium hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}