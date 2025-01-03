import { useEffect } from "react";
import { initializeGoogleAnalytics } from "@/services/googleAnalytics";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "@/pages/AdminPanel";
import Login from "@/pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useEffect(() => {
    const setupGA = async () => {
      try {
        await initializeGoogleAnalytics();
      } catch (error) {
        console.error('Error initializing Google Analytics:', error);
      }
    };
    
    setupGA();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;