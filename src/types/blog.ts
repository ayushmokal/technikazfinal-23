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
  featured_in_category?: boolean;
  popular?: boolean;
  popular_in_tech?: boolean;
  popular_in_games?: boolean;
  popular_in_entertainment?: boolean;
  popular_in_stocks?: boolean;
  popular_in_gadgets?: boolean;
  created_at: string;
  updated_at: string;
  view_count?: number;
  share_count?: number;
}

export const categories = {
  TECH: ["Tech Deals", "News"],
  GAMES: ["PS5", "Xbox", "Nintendo", "PC"],
  ENTERTAINMENT: ["Movies", "Series", "Comics"],
  STOCKS: ["Market News", "Analysis", "IPO", "Crypto"],
  GADGETS: ["MOBILE", "LAPTOPS"]
} as const;

export type Category = keyof typeof categories;
export type Subcategory = typeof categories[Category][number];