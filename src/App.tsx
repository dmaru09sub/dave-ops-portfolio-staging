import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from './contexts/auth-context';
import { DomainContextProvider } from './contexts/DomainContext';
import { SiteTitleProvider } from './components/site-title-provider';
import { Toaster } from "@/components/ui/toaster"

// Import your page components
import Index from './pages/Index';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Tutorials from './pages/Tutorials';
import CICDTutorial from './pages/CICDTutorial';
import NotFound from './pages/NotFound';
import PortfolioSetupTutorial from './pages/PortfolioSetupTutorial';

// Admin imports
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDeployments from './pages/AdminDeployments';
import AdminPortfolio from './pages/AdminPortfolio';
import AdminAbout from './pages/AdminAbout';
import AdminBlog from './pages/AdminBlog';
import AdminContact from './pages/AdminContact';
import AdminInfo from './pages/AdminInfo';
import AdminTutorials from './pages/AdminTutorials';
import AdminTests from './pages/AdminTests';
import AdminAnalytics from './pages/AdminAnalytics';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DomainContextProvider>
          <SiteTitleProvider>
            <AuthProvider>
              <BrowserRouter>
                <Toaster />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/tutorials/cicd-pipeline" element={<CICDTutorial />} />
                  <Route path="/tutorials/portfolio-setup" element={<PortfolioSetupTutorial />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/deployments" element={<AdminDeployments />} />
                  <Route path="/admin/portfolio" element={<AdminPortfolio />} />
                  <Route path="/admin/about" element={<AdminAbout />} />
                  <Route path="/admin/blog" element={<AdminBlog />} />
                  <Route path="/admin/contact" element={<AdminContact />} />
                  <Route path="/admin/info" element={<AdminInfo />} />
                  <Route path="/admin/tutorials" element={<AdminTutorials />} />
                  <Route path="/admin/tests" element={<AdminTests />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </SiteTitleProvider>
        </DomainContextProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
