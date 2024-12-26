import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function RatingsAnalytics() {
  const { data: ratingsData } = useQuery({
    queryKey: ['blog-ratings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('title, average_rating')
        .order('average_rating', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Top Rated Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ratingsData}>
              <XAxis 
                dataKey="title" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="average_rating" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ fill: '#22c55e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}