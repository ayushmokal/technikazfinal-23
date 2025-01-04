import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { BlogFormData } from "@/types/blog";

interface FeaturedArticlesGridProps {
  articles: BlogFormData[];
}

export function FeaturedArticlesGrid({ articles }: FeaturedArticlesGridProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const getImageUrl = (url: string | null | undefined) => {
    if (!url) return '/placeholder.svg';
    // If it's already a full URL, return it
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // If it's a relative URL, ensure it starts with /
    return url.startsWith('/') ? url : `/${url}`;
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Main Featured Article - 50% width */}
      <div className="col-span-12 lg:col-span-6">
        <Link to={`/article/${articles[0].slug}`} className="block group">
          <div className="relative overflow-hidden rounded-t-xl">
            <AspectRatio ratio={16/9} className="mb-4">
              <img
                src={getImageUrl(articles[0].image_url)}
                alt={articles[0].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-b-[30px]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </AspectRatio>
            <div className="flex flex-col justify-between h-[120px]">
              <h2 className="text-2xl font-bold line-clamp-2 mb-2">
                {articles[0].title}
              </h2>
              <p className="text-gray-600">
                {new Date(articles[0].created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Second Featured Article - 50% width */}
      {articles[1] && (
        <div className="col-span-12 lg:col-span-6">
          <Link to={`/article/${articles[1].slug}`} className="block group">
            <div className="relative overflow-hidden rounded-t-xl">
              <AspectRatio ratio={16/9} className="mb-4">
                <img
                  src={getImageUrl(articles[1].image_url)}
                  alt={articles[1].title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-b-[30px]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </AspectRatio>
              <div className="flex flex-col justify-between h-[120px]">
                <h2 className="text-2xl font-bold line-clamp-2 mb-2">
                  {articles[1].title}
                </h2>
                <p className="text-gray-600">
                  {new Date(articles[1].created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}