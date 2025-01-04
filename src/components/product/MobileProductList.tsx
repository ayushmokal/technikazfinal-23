import { useState } from "react";
import { Link } from "react-router-dom";
import { MobileProduct } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MobileProductListProps {
  products: MobileProduct[];
}

export function MobileProductList({ products }: MobileProductListProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<string>("default");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get unique brands from products
  const brands = Array.from(new Set(products.map(product => product.brand))).filter(Boolean);

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
      return matchesSearch && matchesBrand;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <section className="mb-12">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest Mobile Phones</h2>
          <div className="flex gap-4">
            <button 
              className={`p-2 border rounded transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9H21M3 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button 
              className={`p-2 border rounded transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H10V10H3V3ZM14 3H21V10H14V3ZM3 14H10V21H3V14ZM14 14H21V21H14V14Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className={`mt-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
        {filteredAndSortedProducts.map((product) => (
          <Link 
            key={product.id}
            to={`/product/${product.id}?type=mobile`}
            className={`block bg-white rounded-lg p-4 hover:shadow-lg transition-shadow ${
              viewMode === 'grid' ? 'h-full' : ''
            }`}
          >
            <div className={viewMode === 'grid' ? 'flex flex-col gap-4' : 'flex gap-6'}>
              <div className={`${
                viewMode === 'grid' 
                  ? 'w-full aspect-square' 
                  : 'w-48 h-48 flex-shrink-0'
              }`}>
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-medium text-primary mb-2">
                  {product.name} – Full Phone Specification
                </h3>
                <div className="text-2xl font-bold mb-4">
                  ₹{product.price.toLocaleString()}
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex gap-2">
                    <span className="font-medium">Display:</span>
                    <span>{product.display_specs}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">Processor & RAM:</span>
                    <span>{product.ram} | {product.processor}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">Camera:</span>
                    <span>{product.camera}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">Battery:</span>
                    <span>{product.battery}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link 
                    to={`/product/${product.id}?type=mobile`}
                    className="text-primary hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}