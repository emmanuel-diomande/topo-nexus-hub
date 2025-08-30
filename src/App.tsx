import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Accueil from "./pages/Accueil";
import APropos from "./pages/APropos";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Boutique from "./pages/Boutique";
import AdminPanel from "./components/admin/AdminPanel";
import StockManagement from "./components/admin/StockManagement";
import OrderManagement from "./components/admin/OrderManagement";
import Statistics from "./components/admin/Statistics";
import ProductDetails from "./components/admin/ProductDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/accueil" replace />} />
          <Route path="/accueil" element={<Layout><Accueil /></Layout>} />
          <Route path="/a-propos" element={<Layout><APropos /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/boutique" element={<Layout><Boutique /></Layout>} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/stocks" element={<StockManagement />} />
          <Route path="/admin/commandes" element={<OrderManagement />} />
          <Route path="/admin/statistiques" element={<Statistics />} />
          <Route path="/admin/produit/:id" element={<ProductDetails />} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
