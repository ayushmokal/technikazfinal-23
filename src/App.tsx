import { useEffect } from "react";
import { initializeGoogleAnalytics } from "@/services/googleAnalytics";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "@/pages/AdminPanel";
import Login from "@/pages/Login";

function App() {
  useEffect(() => {
    initializeGoogleAnalytics();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
