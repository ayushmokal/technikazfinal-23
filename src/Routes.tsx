import { Routes as RouterRoutes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "@/pages/Index";
import ArticlePage from "@/pages/ArticlePage";

export function Routes() {
  return (
    <RouterRoutes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
      </Route>
    </RouterRoutes>
  );
}