import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import EditBlogPage from "./pages/EditBlogPage";
import ArticlePage from "./pages/ArticlePage";
import GamesPage from "./pages/GamesPage";
import TechPage from "./pages/TechPage";
import StocksPage from "./pages/StocksPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import GadgetsPage from "./pages/GadgetsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/tech" element={<TechPage />} />
            <Route path="/stocks" element={<StocksPage />} />
            <Route path="/entertainment" element={<EntertainmentPage />} />
            <Route path="/gadgets" element={<GadgetsPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/edit/:id" element={<EditBlogPage />} />
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;