import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  image: string;
  category: string;
  slug: string;
  featured?: boolean;
}

export function ArticleCard({ title, image, category, slug, featured = false }: ArticleCardProps) {
  return (
    <Link
      to={`/article/${slug}`}
      className={cn(
        "group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl",
        featured ? "md:col-span-2 md:row-span-2" : "",
        "animate-fadeIn"
      )}
    >
      <div className={cn(
        "aspect-video w-full overflow-hidden",
        featured && "md:aspect-[16/9]"
      )}>
        <img
          src={image || '/placeholder.svg'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className={cn(
          "font-bold leading-tight mb-2 group-hover:text-primary transition-colors",
          featured ? "text-2xl md:text-3xl" : "text-lg"
        )}>
          {title}
        </h3>
        <div>
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
            {category}
          </span>
        </div>
      </div>
    </Link>
  );
}