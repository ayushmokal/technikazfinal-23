import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { navigationCategories } from "./navigationData";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <div className="py-4">
          <div className="space-y-2">
            {navigationCategories.map((category) => (
              <Collapsible key={category.name}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-gray-100">
                  <Link to={category.path} className="flex-1">
                    {category.name}
                  </Link>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory}
                      to={`${category.path}?subcategory=${subcategory}`}
                      className="block p-3 hover:bg-gray-100"
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
  );
}