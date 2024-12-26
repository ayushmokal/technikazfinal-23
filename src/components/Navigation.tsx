import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, X, Search, Menu, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { categories } from "@/types/blog";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";
import { BlogFormData } from "@/types/blog";

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
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { data: searchResults } = useQuery({
    queryKey: ['blogs', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .ilike('title', `%${searchQuery}%`)
        .limit(5);
      
      if (error) {
        console.error('Error searching blogs:', error);
        return [];
      }
      
      return data as BlogFormData[];
    },
    enabled: searchQuery.length > 0,
  });

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
          <Button variant="ghost" size="sm" className="hidden sm:block">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <div className="space-y-4">
                    {navigationCategories.map((category) => (
                      <Collapsible key={category.name}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-lg">
                          <Link to={category.path} className="flex-1">
                            {category.name}
                          </Link>
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-4 space-y-2">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory}
                              to={`${category.path}?subcategory=${subcategory}`}
                              className="block p-2 hover:bg-gray-100 rounded-lg"
                            >
                              {subcategory}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/b9245872-2c89-4c1b-91eb-8e2ea38da7fd.png" 
                alt="Technikaz" 
                className="h-8 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
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
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search articles..."
                className="w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setOpen(true)}
              />
              <CommandDialog open={open} onOpenChange={setOpen}>
                <Command>
                  <CommandInput 
                    placeholder="Search articles..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Articles">
                      {searchResults?.map((article) => (
                        <CommandItem
                          key={article.id}
                          onSelect={() => {
                            navigate(`/article/${article.slug}`);
                            setOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <Search className="mr-2 h-4 w-4" />
                          {article.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </CommandDialog>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}