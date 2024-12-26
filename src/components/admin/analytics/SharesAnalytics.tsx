import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function SharesAnalytics() {
  const { data: sharesData } = useQuery({
    queryKey: ['blog-shares'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('title, share_count')
        .order('share_count', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data || [];
    },
  });

  const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Shared Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sharesData}
                dataKey="share_count"
                nameKey="title"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {sharesData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}