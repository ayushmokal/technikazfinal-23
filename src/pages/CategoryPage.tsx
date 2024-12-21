import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ArticleCard } from "@/components/ArticleCard";

const articles = {
  games: [
    {
      title: "PlayStation 5 Pro Release Date, Price, Specs, Preorder Details",
      image: "/lovable-uploads/1c23b046-6ca8-4763-8962-49668043df91.png",
      category: "GAMES",
      slug: "ps5-pro-release",
    },
    // Add more articles
  ],
  // Add more categories
};

export default function CategoryPage() {
  const { category } = useParams();
  const categoryArticles = articles[category as keyof typeof articles] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold capitalize">{category}</h1>
          <div className="flex space-x-4 mt-4">
            {/* Add subcategory tabs here based on category */}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </main>
    </div>
  );
}