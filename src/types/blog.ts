export interface BlogFormData {
  id?: string;
  title: string;
  content: string;
  category: string;
  subcategory?: string | null;
  author: string;
  image_url?: string | null;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export const categories = {
  GAMES: ["PS5", "XBOX", "NINTENDO"],
  TECH: ["TECH DEALS", "NEWS"],
  ENTERTAINMENT: ["MOVIES", "SERIES", "COMICS"],
  GADGETS: ["MOBILE", "LAPTOPS"],
  STOCKS: [],
} as const;