
import { Github, ExternalLink } from "lucide-react";
import { useSiteInfo } from "@/hooks/use-site-info";

export const PortfolioFooter = () => {
  const { siteInfo } = useSiteInfo();
  
  const portfolioRepoUrl = siteInfo.portfolio_repo_url || "https://github.com/dmaru09sub/dave-ops-portfolio";

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 Dave-Ops Portfolio. Built with modern DevOps practices.
          </div>
          
          <a
            href={portfolioRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Github className="w-4 h-4" />
            <span className="font-medium">Dave-Ops.Net Portfolio</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </footer>
  );
};
