export interface BlogFormData {
  id?: string;
  title: string;
  content: string;
  category: string;
  subcategory: string;
  author: string;
  image_url: string;
  slug: string;
  featured?: boolean;
  popular?: boolean;
}

export const categories = {
  TECH: ["Tech Deals", "News"],
  GAMES: ["PC", "PS5", "Xbox", "Nintendo"],
  ENTERTAINMENT: ["Movies", "TV Shows", "Music", "Anime"],
  STOCKS: ["Market News", "Analysis", "IPO", "Crypto"]
} as const;

export type Category = keyof typeof categories;
export type Subcategory = typeof categories[Category][number];