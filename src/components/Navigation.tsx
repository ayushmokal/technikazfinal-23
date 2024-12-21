import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "GAMES",
    path: "/games",
    subcategories: ["PS5", "Xbox", "Nintendo"],
  },
  {
    name: "TECH",
    path: "/tech",
    subcategories: ["Tech Deals", "News"],
  },
  {
    name: "ENTERTAINMENT",
    path: "/entertainment",
    subcategories: ["Movies", "Series", "Comics"],
  },
  {
    name: "MOBILES",
    path: "/mobiles",
    subcategories: ["Mobile", "Laptops"],
  },
  {
    name: "STOCKS",
    path: "/stocks",
    subcategories: [],
  },
];

export function Navigation() {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            Technikaz
          </Link>
          <div className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="search"
              placeholder="Search"
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}