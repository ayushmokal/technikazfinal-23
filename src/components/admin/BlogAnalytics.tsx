import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/types/blog";

export function BlogAnalytics() {
  const { data: blogStats } = useQuery({
    queryKey: ['blog-stats'],
    queryFn: async () => {
      const { data: blogs } = await supabase
        .from('blogs')
        .select('category');

      const stats = Object.keys(categories).reduce((acc, category) => {
        acc[category] = blogs?.filter(blog => blog.category === category).length || 0;
        return acc;
      }, {} as Record<string, number>);

      return stats;
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {blogStats && Object.entries(blogStats).map(([category, count]) => (
        <Card key={category}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count}</div>
            <p className="text-xs text-muted-foreground">Total Posts</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}