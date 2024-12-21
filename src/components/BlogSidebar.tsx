import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BlogSidebar() {
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const { data: latestBlogs } = useQuery({
    queryKey: ['latest-blogs', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (selectedCategory !== "ALL") {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const { data: popularBlogs } = useQuery({
    queryKey: ['popular-blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('popular', true)
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

      {/* Latest Posts Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Latest Posts</h3>
          <div className="flex gap-2">
            {["ALL", "GAMES", "TECH", "MOVIES", "SERIES"].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0) + category.slice(1).toLowerCase()}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {latestBlogs?.map((blog) => (
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

      {/* Popular Posts Section */}
      <Tabs defaultValue="latest" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="latest" className="flex-1">Latest</TabsTrigger>
          <TabsTrigger value="popular" className="flex-1">Popular</TabsTrigger>
        </TabsList>
        <TabsContent value="latest" className="space-y-4">
          {latestBlogs?.slice(0, 3).map((blog) => (
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
        </TabsContent>
        <TabsContent value="popular" className="space-y-4">
          {popularBlogs?.map((blog) => (
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
        </TabsContent>
      </Tabs>

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