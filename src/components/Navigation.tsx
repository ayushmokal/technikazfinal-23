import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
    name: "GADGETS",
    path: "/gadgets",
    subcategories: ["MOBILE", "LAPTOPS"],
  },
  {
    name: "STOCKS",
    path: "/stocks",
    subcategories: [],
  },
];

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-black text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>

      {/* Main Navigation */}
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
            <Input
              type="search"
              placeholder="Search"
              className="w-[200px]"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}