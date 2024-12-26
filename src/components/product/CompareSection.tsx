import { Button } from "@/components/ui/button";

interface CompareSectionProps {
  suggestedProducts: Array<{
    id: string;
    name: string;
    image: string;
  }>;
}

export function CompareSection({ suggestedProducts }: CompareSectionProps) {
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Compare Suggested Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {suggestedProducts.map((product) => (
          <div key={product.id} className="bg-white p-2 rounded-lg shadow">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-32 object-contain rounded mb-2"
            />
            <Button variant="outline" className="w-full">Compare</Button>
          </div>
        ))}
      </div>
    </div>
  );
}