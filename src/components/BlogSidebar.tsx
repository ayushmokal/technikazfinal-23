import { useState } from "react";
import { Facebook, Twitter, Instagram, Pinterest, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

export function BlogSidebar() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Subscribe:", email);
  };

  return (
    <aside className="space-y-8">
      {/* Share Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Share This Article</h3>
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
            <Pinterest className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Youtube className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="space-y-4">
        <form onSubmit={handleSubscribe} className="space-y-4">
          <p className="text-sm text-gray-600">
            Subscribe to our newsletter and receive a selection of cool articles every week
          </p>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            SUBSCRIBE
          </Button>
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-xs text-gray-500">
              By checking this box, you confirm that you have read and are agreeing to our terms of use regarding the storage of the data submitted through this form.
            </label>
          </div>
        </form>
      </div>

      {/* Advertisement Section */}
      <div className="bg-gray-100 p-4 text-center min-h-[200px] flex items-center justify-center">
        <span className="text-gray-400">Ads Here</span>
      </div>

      {/* Upcoming Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Upcomings</h3>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">Games</Button>
            <Button variant="outline" size="sm" className="text-xs">Phone</Button>
            <Button variant="outline" size="sm" className="text-xs">Movies</Button>
            <Button variant="outline" size="sm" className="text-xs">More</Button>
          </div>
          {/* Upcoming Items */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-3">
              <img
                src="/placeholder.svg"
                alt={`PS5 Upcoming Games ${i}`}
                className="w-20 h-14 object-cover rounded"
              />
              <div>
                <h4 className="text-sm font-medium">PS5 Upcoming Games</h4>
                <p className="text-xs text-gray-500">Coming Dec 20, 2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}