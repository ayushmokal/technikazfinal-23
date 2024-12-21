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
        "group block overflow-hidden rounded-lg bg-white transition-all duration-300 hover:shadow-lg",
        mainFeatured ? "lg:col-span-3" : featured ? "lg:col-span-2" : "lg:col-span-1",
        "animate-fadeIn"
      )}
    >
      <div className={cn(
        "relative w-full overflow-hidden",
        mainFeatured ? "aspect-[16/9]" : featured ? "aspect-[4/3]" : "aspect-[4/3]"
      )}>
        <img
          src={image || '/placeholder.svg'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className={cn(
          "font-bold leading-tight mb-3 group-hover:text-primary transition-colors",
          mainFeatured ? "text-2xl md:text-3xl" : featured ? "text-xl md:text-2xl" : "text-lg"
        )}>
          {title}
        </h3>
        <div>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {category}
          </span>
        </div>
      </div>
    </Link>
  );
}