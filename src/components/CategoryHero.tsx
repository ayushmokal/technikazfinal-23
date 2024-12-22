import { BlogFormData } from "@/types/blog";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { SideArticle } from "@/components/SideArticle";

interface CategoryHeroProps {
  featuredArticle: BlogFormData | undefined;
  gridArticles: BlogFormData[];
}

export function CategoryHero({ featuredArticle, gridArticles }: CategoryHeroProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 animate-fadeIn">
      {featuredArticle && (
        <>
          <div className="lg:col-span-3">
            <FeaturedArticle article={featuredArticle} />
          </div>
          <div className="lg:col-span-1 space-y-6">
            {gridArticles.slice(0, 2).map((article) => (
              <SideArticle key={article.slug} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}