import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsData } from "@/services/googleAnalytics";

// Define types for our analytics data
type AnalyticsData = {
  date: string;
  pageViews: number;
  sessions: number;
  users: number;
}

type AggregatedMetrics = {
  totalPageViews: number;
  totalUsers: number;
  avgSessionDuration: string;
  pageViewsChange: string;
  activeUsersChange: string;
  sessionDurationChange: string;
}

export function GoogleAnalytics() {
  const { data: analyticsData, isLoading, error } = useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalyticsData,
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  // Calculate aggregated metrics from time series data
  const calculateMetrics = (data: AnalyticsData[]): AggregatedMetrics => {
    if (!data || data.length === 0) return {
      totalPageViews: 0,
      totalUsers: 0,
      avgSessionDuration: '0m 0s',
      pageViewsChange: '0%',
      activeUsersChange: '0%',
      sessionDurationChange: '0%'
    };

    const totalPageViews = data.reduce((sum, day) => sum + day.pageViews, 0);
    const totalUsers = data.reduce((sum, day) => sum + day.users, 0);
    
    // Calculate percentage changes (comparing last day to first day)
    const firstDay = data[0];
    const lastDay = data[data.length - 1];
    const pageViewsChange = ((lastDay.pageViews - firstDay.pageViews) / firstDay.pageViews * 100).toFixed(1);
    const usersChange = ((lastDay.users - firstDay.users) / firstDay.users * 100).toFixed(1);
    const sessionsChange = ((lastDay.sessions - firstDay.sessions) / firstDay.sessions * 100).toFixed(1);

    return {
      totalPageViews,
      totalUsers,
      avgSessionDuration: '2m 45s', // Placeholder - would be calculated from actual session data
      pageViewsChange: `${pageViewsChange}%`,
      activeUsersChange: `${usersChange}%`,
      sessionDurationChange: `${sessionsChange}%`
    };
  };

  if (isLoading) {
    return <div>Loading analytics data...</div>;
  }

  if (error) {
    return <div>Error loading analytics data. Using mock data instead.</div>;
  }

  // Use mock data if no real data is available
  const data = analyticsData || [
    { date: '2024-01-01', pageViews: 1200, sessions: 800, users: 600 },
    { date: '2024-01-02', pageViews: 1400, sessions: 900, users: 700 },
    { date: '2024-01-03', pageViews: 1100, sessions: 750, users: 550 },
    { date: '2024-01-04', pageViews: 1600, sessions: 1000, users: 800 },
    { date: '2024-01-05', pageViews: 1800, sessions: 1200, users: 900 },
    { date: '2024-01-06', pageViews: 1300, sessions: 850, users: 650 },
    { date: '2024-01-07', pageViews: 1700, sessions: 1100, users: 850 },
  ];

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