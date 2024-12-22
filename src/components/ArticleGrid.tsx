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
              <h3 className="font-medium text-white group-hover:text-primary-foreground transition-colors">
                {article.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}