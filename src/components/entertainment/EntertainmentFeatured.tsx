import { BlogFormData } from "@/types/blog";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface EntertainmentFeaturedProps {
  mainFeaturedArticle: BlogFormData;
  sideFeaturedArticles: BlogFormData[];
}

export function EntertainmentFeatured({ mainFeaturedArticle, sideFeaturedArticles }: EntertainmentFeaturedProps) {
  return (
    <div className="grid grid-cols-12 gap-6 mb-12">
      {/* Main Featured Article - 60% width */}
      {mainFeaturedArticle && (
        <div className="col-span-12 lg:col-span-7">
          <Link to={`/article/${mainFeaturedArticle.slug}`} className="block group">
            <div className="relative overflow-hidden rounded-xl">
              <AspectRatio ratio={4/3}>
                <img
                  src={mainFeaturedArticle.image_url || '/placeholder.svg'}
                  alt={mainFeaturedArticle.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </AspectRatio>
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
              {mainFeaturedArticle.title}
            </h2>
          </Link>
        </div>
      )}

      {/* Side Articles - 20% width each */}
      <div className="col-span-12 lg:col-span-5 space-y-6">
        {sideFeaturedArticles.map((article) => (
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
  );
}