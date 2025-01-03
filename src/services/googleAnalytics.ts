import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export type AnalyticsData = {
  date: string;
  pageViews: number;
  sessions: number;
  users: number;
}

export type AggregatedMetrics = {
  totalPageViews: number;
  totalUsers: number;
  avgSessionDuration: string;
  pageViewsChange: string;
  activeUsersChange: string;
  sessionDurationChange: string;
}

export async function initializeGoogleAnalytics() {
  try {
    const { data, error } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'GA_MEASUREMENT_ID')
      .maybeSingle();

    if (error) {
      console.error('Error fetching Google Analytics Measurement ID:', error);
      return;
    }

    if (!data?.value) {
      console.error('Google Analytics Measurement ID not found');
      return;
    }

    const measurementId = data.value;

    // Load Google Analytics Script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', measurementId);
  } catch (error) {
    console.error('Error initializing Google Analytics:', error);
  }
}

export async function fetchAnalyticsData(): Promise<AnalyticsData[]> {
  try {
    // For now, return mock data until we implement the full GA API integration
    return [
      { date: '2024-01-01', pageViews: 1200, sessions: 800, users: 600 },
      { date: '2024-01-02', pageViews: 1400, sessions: 900, users: 700 },
      { date: '2024-01-03', pageViews: 1100, sessions: 750, users: 550 },
      { date: '2024-01-04', pageViews: 1600, sessions: 1000, users: 800 },
      { date: '2024-01-05', pageViews: 1800, sessions: 1200, users: 900 },
      { date: '2024-01-06', pageViews: 1300, sessions: 850, users: 650 },
      { date: '2024-01-07', pageViews: 1700, sessions: 1100, users: 850 },
    ];
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return [];
  }
}

export function calculateMetrics(data: AnalyticsData[]): AggregatedMetrics {
  if (!data || data.length === 0) {
    return {
      totalPageViews: 0,
      totalUsers: 0,
      avgSessionDuration: '0m 0s',
      pageViewsChange: '0%',
      activeUsersChange: '0%',
      sessionDurationChange: '0%'
    };
  }

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
}