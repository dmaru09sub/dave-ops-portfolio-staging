
import { useMemo } from 'react';

export const useDomainContext = () => {
  return useMemo(() => {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const isLovable = hostname.includes('lovable.app');
    const isCustomDomain = hostname === 'dave-ops.net' || hostname === 'www.dave-ops.net';
    const isGitHubPages = hostname.includes('github.io');

    // Determine the live site URL based on context
    let liveSiteUrl: string;
    
    if (isCustomDomain) {
      liveSiteUrl = 'https://dave-ops.net';
    } else if (isGitHubPages) {
      liveSiteUrl = window.location.origin;
    } else if (isLovable) {
      
      liveSiteUrl = 'https://daveops-portfolio.github.io/';
    } else if (isLocalhost) {
      // For local development, link to production
      liveSiteUrl = 'https://daveops-portfolio.github.io/';
    } else {
      // Default fallback
      liveSiteUrl = 'https://daveops-portfolio.github.io/';
    }

    return {
      hostname,
      isLocalhost,
      isLovable,
      isCustomDomain,
      isGitHubPages,
      liveSiteUrl
    };
  }, []);
};
