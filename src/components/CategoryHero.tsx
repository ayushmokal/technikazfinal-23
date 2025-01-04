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
    <div className="grid grid-cols-1 gap-6 mb-8 animate-fadeIn">
      {/* Main Featured Article - Full width */}
      <div className="bg-white rounded-xl overflow-hidden group">
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
          <div className="p-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold hover:text-primary transition-colors">
              {featuredArticle.title}
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}