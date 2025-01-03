import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export async function initializeGoogleAnalytics() {
  const { data, error } = await supabase
    .from('secrets')
    .select('value')
    .eq('name', 'GA_MEASUREMENT_ID')
    .single();

  if (error || !data) {
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
}

export async function fetchAnalyticsData() {
  try {
    const { data: clientEmail, error: clientEmailError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'GOOGLE_ANALYTICS_CLIENT_EMAIL')
      .single();

    const { data: privateKey, error: privateKeyError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'GOOGLE_ANALYTICS_PRIVATE_KEY')
      .single();

    if (clientEmailError || privateKeyError || !clientEmail || !privateKey) {
      console.error('Google Analytics credentials not found');
      return null;
    }

    const response = await fetch('https://www.googleapis.com/analytics/v4/data/realtime', {
      headers: {
        Authorization: `Bearer ${await getAccessToken(clientEmail.value, privateKey.value)}`,
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

async function getAccessToken(clientEmail: string, privateKey: string) {
  // Implement OAuth2 token generation here
  // This is a placeholder - you'll need to implement proper OAuth2 flow
  return 'your_access_token';
}