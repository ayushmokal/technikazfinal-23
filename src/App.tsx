import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GadgetsPage from "./pages/GadgetsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductReviewsPage from "./pages/ProductReviewsPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <GadgetsPage />,
  },
  {
    path: "/gadgets",
    element: <GadgetsPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/product/:id/reviews",
    element: <ProductReviewsPage />
  }
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}