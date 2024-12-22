import { Link } from "react-router-dom";
import { BlogFormData } from "@/types/blog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ArticleGridProps {
  articles: BlogFormData[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {articles.map((article) => (
        <div key={article.slug} className="flex flex-col">
          <Link
            to={`/article/${article.slug}`}
            className="block group"
          >
            <div className="relative overflow-hidden rounded-xl">
              <AspectRatio ratio={4/3}>
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
            className="mt-3 hover:text-primary transition-colors"
          >
            <h3 className="font-medium text-lg line-clamp-2">
              {article.title}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
}