import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function ViewsChart() {
  const { data: viewsData } = useQuery({
    queryKey: ['blog-views'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('title, view_count')
        .order('view_count', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Most Viewed Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={viewsData}>
              <XAxis 
                dataKey="title" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="view_count" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}