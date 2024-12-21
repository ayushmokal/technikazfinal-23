import { Link } from "react-router-dom";
import { BlogFormData } from "@/types/blog";

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
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full aspect-[4/3] object-cover rounded-lg mb-2"
          />
          <h3 className="font-medium group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}