import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsData, calculateMetrics, type AnalyticsData } from "@/services/googleAnalytics";

export function GoogleAnalytics() {
  const { data: analyticsData, isLoading, error } = useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalyticsData,
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  if (isLoading) {
    return <div>Loading analytics data...</div>;
  }

  if (error) {
    console.error('Error loading analytics data:', error);
    return <div>Error loading analytics data. Using mock data instead.</div>;
  }

  // Use mock data if no real data is available
  const data = analyticsData || [];
  const metrics = calculateMetrics(data);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.totalPageViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.pageViewsChange} from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeUsersChange} from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.avgSessionDuration}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.sessionDurationChange} from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Website Traffic Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="pageViews" 
                  stroke="#8884d8" 
                  name="Page Views" 
                />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#82ca9d" 
                  name="Sessions" 
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#ffc658" 
                  name="Users" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}