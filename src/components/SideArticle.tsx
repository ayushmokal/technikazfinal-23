import { Link } from "react-router-dom";
import { BlogFormData } from "@/types/blog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SideArticleProps {
  article: BlogFormData;
}

export function SideArticle({ article }: SideArticleProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden h-full">
      <Link
        to={`/article/${article.slug}`}
        className="block group"
      >
        <div className="relative overflow-hidden">
          <AspectRatio ratio={16/9}>
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </div>
      </Link>
      <div className="p-4">
        <Link 
          to={`/article/${article.slug}`}
          className="block hover:text-primary transition-colors"
        >
          <h3 className="text-lg font-medium">
            {article.title}
          </h3>
        </Link>
      </div>
    </div>
  );
}