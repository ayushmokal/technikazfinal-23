import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, X, Menu, Search as SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { categories } from "@/types/blog";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const navigationCategories = [
  {
    name: "GAMES",
    path: "/games",
    subcategories: categories.GAMES,
  },
  {
    name: "TECH",
    path: "/tech",
    subcategories: categories.TECH,
  },
  {
    name: "ENTERTAINMENT",
    path: "/entertainment",
    subcategories: categories.ENTERTAINMENT,
  },
  {
    name: "GADGETS",
    path: "/gadgets",
    subcategories: categories.GADGETS,
  },
  {
    name: "STOCKS",
    path: "/stocks",
    subcategories: categories.STOCKS,
  },
];

export function Navigation() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/b9245872-2c89-4c1b-91eb-8e2ea38da7fd.png" 
              alt="Technikaz" 
              className="h-8 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationCategories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {navigationCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Input
                type="search"
                placeholder="Search"
                className="w-[200px]"
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchVisible && (
          <div className="md:hidden px-4 py-2">
            <Input
              type="search"
              placeholder="Search"
              className="w-full"
            />
          </div>
        )}
      </div>
    </nav>
  );
}