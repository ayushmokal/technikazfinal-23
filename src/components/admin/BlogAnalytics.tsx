import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/types/blog";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer 
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function BlogAnalytics() {
  const { data: blogStats } = useQuery({
    queryKey: ['blog-stats'],
    queryFn: async () => {
      const { data: blogs } = await supabase
        .from('blogs')
        .select('*');

      // Category distribution
      const categoryStats = Object.keys(categories).reduce((acc, category) => {
        acc[category] = blogs?.filter(blog => blog.category === category).length || 0;
        return acc;
      }, {} as Record<string, number>);

      // Most viewed articles
      const topViewed = blogs
        ?.sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
        .slice(0, 5)
        .map(blog => ({
          name: blog.title.substring(0, 20) + '...',
          views: blog.view_count || 0
        }));

      // Most shared articles
      const topShared = blogs
        ?.sort((a, b) => (b.share_count || 0) - (a.share_count || 0))
        .slice(0, 5)
        .map(blog => ({
          name: blog.title.substring(0, 20) + '...',
          shares: blog.share_count || 0
        }));

      // Average rating per category
      const avgRatingByCategory = Object.keys(categories).reduce((acc, category) => {
        const categoryBlogs = blogs?.filter(blog => blog.category === category) || [];
        const avgRating = categoryBlogs.reduce((sum, blog) => sum + (blog.average_rating || 0), 0) / categoryBlogs.length;
        acc[category] = Number(avgRating.toFixed(2)) || 0;
        return acc;
      }, {} as Record<string, number>);

      // Format data for pie chart
      const pieData = Object.entries(categoryStats).map(([name, value]) => ({
        name,
        value
      }));

      return {
        categoryStats,
        topViewed,
        topShared,
        avgRatingByCategory,
        pieData
      };
    },
  });

  if (!blogStats) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-8">
      {/* Category Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(blogStats.categoryStats).map(([category, count]) => (
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

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={blogStats.pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {blogStats.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Most Viewed Articles */}
        <Card>
          <CardHeader>
            <CardTitle>Most Viewed Articles</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={blogStats.topViewed}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Most Shared Articles */}
        <Card>
          <CardHeader>
            <CardTitle>Most Shared Articles</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={blogStats.topShared}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="shares" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Average Rating by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Average Rating by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={Object.entries(blogStats.avgRatingByCategory).map(([category, rating]) => ({
                  category,
                  rating
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="rating" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}