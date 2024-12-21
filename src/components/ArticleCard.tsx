import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  image: string;
  category: string;
  slug: string;
  featured?: boolean;
  mainFeatured?: boolean;
}

export function ArticleCard({ 
  title, 
  image, 
  category, 
  slug, 
  featured = false,
  mainFeatured = false 
}: ArticleCardProps) {
  return (
    <Link
      to={`/article/${slug}`}
      className={cn(
        "group block overflow-hidden bg-white rounded-lg transition-all duration-300 hover:shadow-lg",
        mainFeatured ? "col-span-full" : featured ? "md:col-span-2" : "",
        "animate-fadeIn"
      )}
    >
      <div className={cn(
        "relative w-full overflow-hidden",
        mainFeatured ? "aspect-[21/9]" : "aspect-[16/9]"
      )}>
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className={cn(
          "font-bold leading-tight group-hover:text-primary transition-colors",
          mainFeatured ? "text-2xl md:text-3xl" : featured ? "text-xl md:text-2xl" : "text-lg"
        )}>
          {title}
        </h3>
      </div>
    </Link>
  );
}