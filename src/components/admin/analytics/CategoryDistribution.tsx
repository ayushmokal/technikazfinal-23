import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

export function CategoryDistribution() {
  const { data: categoryData } = useQuery({
    queryKey: ['category-distribution'],
    queryFn: async () => {
      const { data: blogs } = await supabase
        .from('blogs')
        .select('category');

      const distribution = blogs?.reduce((acc: Record<string, number>, blog) => {
        acc[blog.category] = (acc[blog.category] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(distribution || {}).map(([name, count]) => ({
        name,
        count,
        fill: ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'][
          Math.floor(Math.random() * 5)
        ],
      }));
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              innerRadius="30%" 
              outerRadius="100%" 
              data={categoryData}
              startAngle={180} 
              endAngle={0}
            >
              <RadialBar
                minAngle={15}
                background
                clockWise={true}
                dataKey="count"
                label={{ fill: '#666', position: 'insideStart' }}
              />
              <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}