import { Button } from "@/components/ui/button";

interface EntertainmentCategoriesProps {
  subcategory: string;
  setSubcategory: (subcategory: string) => void;
}

export function EntertainmentCategories({ subcategory, setSubcategory }: EntertainmentCategoriesProps) {
  const categories = ["ALL", "MOVIES", "SERIES", "COMICS"];

  return (
    <div className="flex justify-center gap-4 mb-8">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={subcategory === cat ? "default" : "outline"}
          onClick={() => {
            console.log('Switching to category:', cat);
            setSubcategory(cat);
          }}
          className="min-w-[100px]"
        >
          {cat === "ALL" ? "All" : cat}
        </Button>
      ))}
    </div>
  );
}