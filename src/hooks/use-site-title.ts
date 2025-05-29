
import { useEffect } from 'react';
import { useSiteInfo } from './use-site-info';

export const useSiteTitle = (pageTitle?: string) => {
  const { siteInfo } = useSiteInfo();
  
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
};
