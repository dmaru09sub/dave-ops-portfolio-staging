
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth-context';

// Generate a session ID that persists for the browser session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('daveops_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('daveops_session_id', sessionId);
  }
  return sessionId;
};

export const usePageViewTracking = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const sessionId = getSessionId();
        const hostname = window.location.hostname;
        const origin = window.location.origin;
        
        // Track the page view with host information
        await supabase.from('daveops_page_views').insert({
          page_path: location.pathname,
          user_id: user?.id || null,
          session_id: sessionId,
          user_agent: navigator.userAgent,
          hostname: hostname,
          origin: origin,
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [location.pathname, user?.id]);
};
