import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data - replace with actual Google Analytics data integration
const mockData = [
  { date: '2024-01-01', pageViews: 1200, sessions: 800, users: 600 },
  { date: '2024-01-02', pageViews: 1400, sessions: 900, users: 700 },
  { date: '2024-01-03', pageViews: 1100, sessions: 750, users: 550 },
  { date: '2024-01-04', pageViews: 1600, sessions: 1000, users: 800 },
  { date: '2024-01-05', pageViews: 1800, sessions: 1200, users: 900 },
  { date: '2024-01-06', pageViews: 1300, sessions: 850, users: 650 },
  { date: '2024-01-07', pageViews: 1700, sessions: 1100, users: 850 },
];

export function GoogleAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,100</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,050</div>
            <p className="text-xs text-muted-foreground">+10.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 45s</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
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
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pageViews" stroke="#8884d8" name="Page Views" />
                <Line type="monotone" dataKey="sessions" stroke="#82ca9d" name="Sessions" />
                <Line type="monotone" dataKey="users" stroke="#ffc658" name="Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}