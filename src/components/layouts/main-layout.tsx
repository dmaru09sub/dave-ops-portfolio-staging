
import React, { ReactNode } from "react";
import { usePageViewTracking } from "@/hooks/use-page-view-tracking";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  usePageViewTracking();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 relative overflow-hidden">
      {/* Animated cloud background */}
      <div className="fixed inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-clouds animate-drift-slow"></div>
        <div className="absolute inset-0 bg-clouds animate-drift-medium" style={{ animationDelay: '-10s' }}></div>
        <div className="absolute inset-0 bg-clouds animate-drift-fast" style={{ animationDelay: '-20s' }}></div>
      </div>
      
      <div className="flex flex-col min-h-screen relative z-10">
        <div className="flex-1">
          {children}
        </div>
        <footer className="py-6 border-t glass-effect">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dave-Ops.Net Portfolio. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
