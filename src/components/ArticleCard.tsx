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
        "animate-fadeIn",
        featured ? "col-span-2 row-span-2" : ""
      )}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 p-4 text-white">
        <div className="mb-2">
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-tight group-hover:text-primary-foreground transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
}