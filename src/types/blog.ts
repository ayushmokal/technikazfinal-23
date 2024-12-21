export interface BlogFormData {
  id: string;
  title: string;
  content: string;
  image_url: string;
  category: string;
  subcategory: string;
  slug: string;
  author: string;
  created_at: string;
  updated_at: string;
  featured: boolean;
  popular: boolean;
  upcoming?: boolean;
}

export const categories = {
  GAMES: ["PS5", "Xbox", "Nintendo", "PC"],
  TECH: ["Tech Deals", "News"],
  ENTERTAINMENT: ["Movies", "Series", "Comics"],
  GADGETS: ["Mobile", "Laptops"],
  STOCKS: [],
};