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
        "group block overflow-hidden bg-white transition-all duration-300 hover:shadow-lg",
        mainFeatured ? "lg:col-span-3" : featured ? "lg:col-span-2" : "lg:col-span-1",
        "animate-fadeIn"
      )}
    >
      <div className="relative w-full h-[400px] overflow-hidden">
        <img
          src={image || '/placeholder.svg'}
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