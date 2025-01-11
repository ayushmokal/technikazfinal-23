import { Link } from "react-router-dom";
import type { MobileProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List } from "lucide-react";

interface MobileProductListProps {
  products: MobileProduct[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export function MobileProductList({ products, onLoadMore, hasMore, isLoading }: MobileProductListProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold">Latest Mobile Phones</h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Input 
            type="search" 
            placeholder="Search mobiles..." 
            className="max-w-xs"
          />
          <div className="flex items-center gap-2">
            <Select defaultValue="default">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="samsung">Samsung</SelectItem>
                <SelectItem value="oneplus">OnePlus</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}?type=mobile`}
            className="block"
          >
            <div className="bg-white rounded-lg p-4 border hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-2xl font-bold mt-2">₹{product.price.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Display</p>
                      <p className="font-medium">{product.display_specs}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Processor</p>
                      <p className="font-medium">{product.processor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Camera</p>
                      <p className="font-medium">{product.camera}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Battery</p>
                      <p className="font-medium">{product.battery}</p>
                    </div>
                  </div>
                  <Button variant="default" className="w-full md:w-auto">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}