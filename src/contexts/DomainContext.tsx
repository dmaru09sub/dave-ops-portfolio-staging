
import React, { createContext, useContext, useEffect, useState } from 'react';

interface DomainContextType {
  domain: string;
  subdomain: string | null;
  isSubdomain: boolean;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export const useDomainContext = () => {
  const context = useContext(DomainContext);
  if (context === undefined) {
    throw new Error('useDomainContext must be used within a DomainContextProvider');
  }
  return context;
};

export const DomainContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [domainInfo, setDomainInfo] = useState<DomainContextType>({
    domain: '',
    subdomain: null,
    isSubdomain: false,
  });

  useEffect(() => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
    let domain = hostname;
    let subdomain = null;
    let isSubdomain = false;

    if (parts.length > 2) {
      subdomain = parts[0];
      domain = parts.slice(1).join('.');
      isSubdomain = true;
    }

    setDomainInfo({
      domain,
      subdomain,
      isSubdomain,
    });
  }, []);

  return (
    <DomainContext.Provider value={domainInfo}>
      {children}
    </DomainContext.Provider>
  );
};
