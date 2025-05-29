
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSiteInfo } from '@/hooks/use-site-info';

interface SiteTitleContextType {
  setPageTitle: (title: string) => void;
  clearPageTitle: () => void;
}

const SiteTitleContext = createContext<SiteTitleContextType | undefined>(undefined);

export const useSiteTitleContext = () => {
  const context = useContext(SiteTitleContext);
  if (!context) {
    throw new Error('useSiteTitleContext must be used within a SiteTitleProvider');
  }
  return context;
};

interface SiteTitleProviderProps {
  children: React.ReactNode;
}

export const SiteTitleProvider = ({ children }: SiteTitleProviderProps) => {
  const [pageTitle, setPageTitleState] = useState<string>('');
  const { siteInfo } = useSiteInfo();

  const setPageTitle = (title: string) => {
    setPageTitleState(title);
  };

  const clearPageTitle = () => {
    setPageTitleState('');
  };

  useEffect(() => {
    const siteTitle = siteInfo.site_title || 'Dave-Ops.Net';
    const fullTitle = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
    document.title = fullTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', siteInfo.site_description || 'DevOps Portfolio and Tutorials');
    }
  }, [pageTitle, siteInfo.site_title, siteInfo.site_description]);

  return (
    <SiteTitleContext.Provider value={{ setPageTitle, clearPageTitle }}>
      {children}
    </SiteTitleContext.Provider>
  );
};
