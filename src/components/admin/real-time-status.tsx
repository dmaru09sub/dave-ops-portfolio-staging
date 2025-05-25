
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Activity, Wifi, WifiOff } from 'lucide-react';

interface RealTimeStatusProps {
  children: React.ReactNode;
}

const RealTimeStatus: React.FC<RealTimeStatusProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    // Subscribe to deployment status changes
    const channel = supabase
      .channel('deployment-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'daveops_portfolio_deployments'
        },
        (payload) => {
          console.log('Real-time deployment update:', payload);
          setLastUpdate(new Date());
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'daveops_changelog_entries'
        },
        (payload) => {
          console.log('Real-time changelog update:', payload);
          setLastUpdate(new Date());
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
        setIsConnected(status === 'SUBSCRIBED');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50">
        <Badge variant={isConnected ? 'default' : 'destructive'} className="flex items-center gap-1">
          {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          {isConnected ? 'Live' : 'Offline'}
        </Badge>
      </div>
      
      {lastUpdate && (
        <div className="fixed top-12 right-4 z-50">
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <Activity className="h-3 w-3" />
            Updated {lastUpdate.toLocaleTimeString()}
          </Badge>
        </div>
      )}
      
      {children}
    </div>
  );
};

export default RealTimeStatus;
