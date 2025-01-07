import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import GadgetsPage from "@/pages/GadgetsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ComparePage from "@/pages/ComparePage";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<GadgetsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
