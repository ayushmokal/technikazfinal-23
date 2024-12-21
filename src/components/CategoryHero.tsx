import { Link } from "react-router-dom";
import { BlogFormData } from "@/types/blog";

interface CategoryHeroProps {
  featuredArticle: BlogFormData | undefined;
  gridArticles: BlogFormData[];
}

export function CategoryHero({ featuredArticle, gridArticles }: CategoryHeroProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {featuredArticle && (
        <>
          <div className="lg:col-span-2">
            <Link to={`/article/${featuredArticle.slug}`} className="block">
              <img
                src={featuredArticle.image_url}
                alt={featuredArticle.title}
                className="w-full aspect-[16/9] object-cover rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-4">{featuredArticle.title}</h2>
            </Link>
          </div>
          <div className="space-y-4">
            {gridArticles.slice(0, 2).map((article) => (
              <Link
                key={article.slug}
                to={`/article/${article.slug}`}
                className="block"
              >
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full aspect-[16/9] object-cover rounded-lg"
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}