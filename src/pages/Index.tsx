import { Navigation } from "@/components/Navigation";
import { ArticleCard } from "@/components/ArticleCard";

const featuredArticles = [
  {
    title: "My Visit To The Nintendo Museum Made My Life Flash Before My Eyes",
    image: "/lovable-uploads/a18b23ac-6b05-44f3-a903-686fba420812.png",
    category: "GAMES",
    slug: "nintendo-museum-visit",
  },
  {
    title: "Like A Dragon: Pirate Yakuza In Hawaii Brings Back Beat 'Em Up Combat",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "GAMES",
    slug: "dragon-pirate-yakuza",
  },
  // Add more articles as needed
];

const recentArticles = [
  {
    title: "How A 12-Year-Old Changed The Lord Of The Rings Movies Forever",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "ENTERTAINMENT",
    slug: "lotr-12-year-old",
  },
  // Add more articles
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <ArticleCard key={article.slug} {...article} featured={index === 0} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}