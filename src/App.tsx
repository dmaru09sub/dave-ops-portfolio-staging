
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Tutorials from "./pages/Tutorials";
import CICDTutorial from "./pages/CICDTutorial";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDeployments from "./pages/AdminDeployments";
import AdminPortfolio from "./pages/AdminPortfolio";
import AdminAbout from "./pages/AdminAbout";
import AdminContact from "./pages/AdminContact";
import AdminTutorials from "./pages/AdminTutorials";
import AdminBlog from "./pages/AdminBlog";
import AdminInfo from "./pages/AdminInfo";
import AdminTests from "./pages/AdminTests";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/tutorials/cicd-pipeline" element={<CICDTutorial />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/deployments" element={<AdminDeployments />} />
            <Route path="/admin/portfolio" element={<AdminPortfolio />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            <Route path="/admin/contact" element={<AdminContact />} />
            <Route path="/admin/tutorials" element={<AdminTutorials />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/info" element={<AdminInfo />} />
            <Route path="/admin/tests" element={<AdminTests />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
