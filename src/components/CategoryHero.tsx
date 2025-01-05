import { BlogFormData } from "@/types/blog";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CategoryHeroProps {
  featuredArticle: BlogFormData | undefined;
  gridArticles: BlogFormData[];
}

export function CategoryHero({ featuredArticle, gridArticles }: CategoryHeroProps) {
  if (!featuredArticle) return null;

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 animate-fadeIn">
      {/* Placeholder for spacing */}
      <div className="h-4" />
    </div>
  );
}