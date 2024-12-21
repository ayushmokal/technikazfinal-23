export interface BlogFormData {
  title: string;
  content: string;
  category: string;
  subcategory: string;
  author: string;
  image_url: string;
  slug: string;
}

export const categories = {
  GAMES: ["PS5", "XBOX", "NINTENDO"],
  TECH: ["TECH DEALS", "NEWS"],
  ENTERTAINMENT: ["MOVIES", "SERIES", "COMICS"],
  GADGETS: ["MOBILE", "LAPTOPS"],
  STOCKS: [],
} as const;