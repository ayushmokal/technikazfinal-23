import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export async function initializeGoogleAnalytics() {
  const { data: { value: measurementId } } = await supabase
    .from('secrets')
    .select('value')
    .eq('name', 'GA_MEASUREMENT_ID')
    .single();

  if (!measurementId) {
    console.error('Google Analytics Measurement ID not found');
    return;
  }

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
}

export async function fetchAnalyticsData() {
  try {
    const response = await fetch('https://www.googleapis.com/analytics/v4/data/realtime', {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return null;
  }
}

async function getAccessToken() {
  const { data: { value: clientEmail } } = await supabase
    .from('secrets')
    .select('value')
    .eq('name', 'GOOGLE_ANALYTICS_CLIENT_EMAIL')
    .single();

  const { data: { value: privateKey } } = await supabase
    .from('secrets')
    .select('value')
    .eq('name', 'GOOGLE_ANALYTICS_PRIVATE_KEY')
    .single();

  // Implement OAuth2 token generation here
  // This is a placeholder - you'll need to implement proper OAuth2 flow
  return 'your_access_token';
}