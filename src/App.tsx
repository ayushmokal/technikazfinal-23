import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GadgetsPage from "./pages/GadgetsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductReviewsPage from "./pages/ProductReviewsPage";
import ProductFullSpecsPage from "./pages/ProductFullSpecsPage";

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
    element: <ProductReviewsPage />,
  },
  {
    path: "/product/:id/specifications",
    element: <ProductFullSpecsPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}