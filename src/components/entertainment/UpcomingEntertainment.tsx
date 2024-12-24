import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BlogFormData } from "@/types/blog";

interface UpcomingEntertainmentProps {
  upcomingArticles: BlogFormData[];
}

export function UpcomingEntertainment({ upcomingArticles }: UpcomingEntertainmentProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-primary p-4">
        <h2 className="text-white font-semibold">Upcomings</h2>
        <div className="flex gap-2 mt-2">
          {["Movies", "Series", "Comics"].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              size="sm"
              className="text-white hover:text-primary hover:bg-white"
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>
      <div className="divide-y">
        {upcomingArticles.map((article) => (
          <Link
            key={article.slug}
            to={`/article/${article.slug}`}
            className="flex gap-4 p-4 hover:bg-gray-50"
          >
            <img
              src={article.image_url}
              alt={article.title}
              className="w-20 h-16 object-cover rounded"
            />
            <div>
              <h4 className="font-medium line-clamp-2">{article.title}</h4>
              <p className="text-sm text-gray-500">
                Coming {new Date(article.created_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}