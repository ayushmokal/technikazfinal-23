import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LaptopProduct } from "@/types/product";

interface LaptopProductGridProps {
  products: LaptopProduct[];
}

export function LaptopProductGrid({ products }: LaptopProductGridProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Latest Laptops</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((laptop) => (
          <Link 
            key={laptop.id}
            to={`/product/${laptop.id}?type=laptop`}
            className="bg-white rounded-xl overflow-hidden group hover:shadow-lg transition-shadow"
          >
            <AspectRatio ratio={16/9}>
              <img
                src={laptop.image_url || "/placeholder.svg"}
                alt={laptop.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </AspectRatio>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">{laptop.name}</h3>
              <p className="text-gray-600">₹{laptop.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}