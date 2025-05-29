
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useDomainContext } from "@/hooks/use-domain-context";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Rocket, FolderOpen, User, Mail, BookOpen, Info, TestTube, PenTool, LogOut, Settings, ExternalLink, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated, loading, logout } = useAdminAuth();
  const { liveSiteUrl } = useDomainContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle redirect in useEffect to avoid state updates during render
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { title: "Dashboard", url: "/admin", icon: Settings, publicPath: "/" },
    { title: "Deployments", url: "/admin/deployments", icon: Rocket, publicPath: "/" },
    { title: "Portfolio", url: "/admin/portfolio", icon: FolderOpen, publicPath: "/portfolio" },
    { title: "About", url: "/admin/about", icon: User, publicPath: "/about" },
    { title: "Tutorials", url: "/admin/tutorials", icon: BookOpen, publicPath: "/tutorials" },
    { title: "Blog", url: "/admin/blog", icon: PenTool, publicPath: "/blog" },
    { title: "Contact", url: "/admin/contact", icon: Mail, publicPath: "/contact" },
    { title: "Analytics", url: "/admin/analytics", icon: BarChart3, publicPath: "/" },
    { title: "Site Info", url: "/admin/info", icon: Info, publicPath: "/" },
    { title: "Tests", url: "/admin/tests", icon: TestTube, publicPath: "/" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dave-Ops Admin</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <div className="flex items-center w-full">
                        <SidebarMenuButton asChild isActive={location.pathname === item.url} className="flex-1">
                          <Link to={item.url}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                        {item.publicPath && (
                          <a 
                            href={`${liveSiteUrl}${item.publicPath}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-sidebar-accent rounded ml-1"
                            title={`View ${item.title} on live site`}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span>View Live Site</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <SidebarTrigger />
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
