import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export function BlogSidebar() {
  const [email, setEmail] = useState("");

  const { data: upcomingBlogs } = useQuery({
    queryKey: ['upcoming-blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    }
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setEmail("");
  };

  return (
    <aside className="space-y-8">
      {/* Newsletter Section */}
      <div className="bg-secondary p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Subscribe to Newsletter</h3>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Subscribe
          </Button>
        </form>
      </div>

      {/* Upcoming Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Latest Posts</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">Games</Button>
          <Button variant="outline" size="sm">Phone</Button>
          <Button variant="outline" size="sm">Movies</Button>
          <Button variant="outline" size="sm">More</Button>
        </div>
        <div className="space-y-4">
          {upcomingBlogs?.map((blog) => (
            <Link 
              to={`/article/${blog.slug}`}
              key={blog.id} 
              className="flex gap-3 group hover:bg-secondary p-2 rounded-lg transition-colors"
            >
              <img
                src={blog.image_url || "/placeholder.svg"}
                alt={blog.title}
                className="w-20 h-14 object-cover rounded"
              />
              <div>
                <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Popular Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="w-full justify-start">
            <span className="mr-2">🎮</span> Games
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <span className="mr-2">📱</span> Tech
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <span className="mr-2">🎬</span> Movies
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <span className="mr-2">📺</span> Series
          </Button>
        </div>
      </div>
    </aside>
  );
}