import { Button } from "@/components/ui/button";
import { categories } from "@/types/blog";
import type { Subcategory } from "@/types/blog";

interface EntertainmentCategoriesProps {
  subcategory: Subcategory;
  setSubcategory: (subcategory: Subcategory) => void;
}

export function EntertainmentCategories({ subcategory, setSubcategory }: EntertainmentCategoriesProps) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <Button
        variant={subcategory === "ALL" ? "default" : "outline"}
        onClick={() => setSubcategory("ALL")}
        className="min-w-[100px]"
      >
        All
      </Button>
      {categories.ENTERTAINMENT.map((sub) => (
        <Button
          key={sub}
          variant={subcategory === sub ? "default" : "outline"}
          onClick={() => setSubcategory(sub)}
          className="min-w-[100px]"
        >
          {sub}
        </Button>
      ))}
    </div>
  );
}