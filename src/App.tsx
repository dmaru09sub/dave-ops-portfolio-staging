
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth-context";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";
import Tutorials from "./pages/Tutorials";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPortfolio from "./pages/AdminPortfolio";
import AdminTutorials from "./pages/AdminTutorials";
import AdminAbout from "./pages/AdminAbout";
import AdminContact from "./pages/AdminContact";
import AdminDeployments from "./pages/AdminDeployments";
import AdminInfo from "./pages/AdminInfo";
import AdminTests from "./pages/AdminTests";

const queryClient = new QueryClient();

// Get the base path from Vite's base configuration
const basename = import.meta.env.BASE_URL;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/portfolio" element={<AdminPortfolio />} />
            <Route path="/admin/tutorials" element={<AdminTutorials />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            <Route path="/admin/contact" element={<AdminContact />} />
            <Route path="/admin/info" element={<AdminInfo />} />
            <Route path="/admin/deployments" element={<AdminDeployments />} />
            <Route path="/admin/tests" element={<AdminTests />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
