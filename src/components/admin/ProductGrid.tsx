import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  display_specs: string;
  processor: string;
  camera: string;
  battery: string;
}

interface ProductGridProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export function ProductGrid({ products, onDelete }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-start">
              <span>{product.name}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
            )}
            <div className="space-y-2">
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Display:</strong> {product.display_specs}</p>
              <p><strong>Processor:</strong> {product.processor}</p>
              <p><strong>Camera:</strong> {product.camera}</p>
              <p><strong>Battery:</strong> {product.battery}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}