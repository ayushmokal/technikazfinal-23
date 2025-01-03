import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsData } from "@/services/googleAnalytics";

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
    return <div>Error loading analytics data. Using mock data instead.</div>;
  }

  // If no real data is available, use mock data
  const data = analyticsData || [
  { date: '2024-01-01', pageViews: 1200, sessions: 800, users: 600 },
  { date: '2024-01-02', pageViews: 1400, sessions: 900, users: 700 },
  { date: '2024-01-03', pageViews: 1100, sessions: 750, users: 550 },
  { date: '2024-01-04', pageViews: 1600, sessions: 1000, users: 800 },
  { date: '2024-01-05', pageViews: 1800, sessions: 1200, users: 900 },
  { date: '2024-01-06', pageViews: 1300, sessions: 850, users: 650 },
  { date: '2024-01-07', pageViews: 1700, sessions: 1100, users: 850 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData?.pageViews || '10,100'}
            </div>
            <p className="text-xs text-muted-foreground">
              {analyticsData?.pageViewsChange || '+20.1%'} from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData?.activeUsers || '5,050'}
            </div>
            <p className="text-xs text-muted-foreground">
              {analyticsData?.activeUsersChange || '+10.5%'} from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData?.avgSessionDuration || '2m 45s'}
            </div>
            <p className="text-xs text-muted-foreground">
              {analyticsData?.sessionDurationChange || '+5.2%'} from last month
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
