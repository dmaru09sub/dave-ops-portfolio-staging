
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SiteInfo {
  id: string;
  setting_key: string;
  setting_value: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSiteInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('daveops_site_info')
          .select('*');

        if (error) throw error;

        const infoMap: Record<string, string> = {};
        (data as SiteInfo[])?.forEach((item) => {
          infoMap[item.setting_key] = item.setting_value || '';
        });
        
        setSiteInfo(infoMap);
      } catch (error) {
        console.error('Error fetching site info:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch site information',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSiteInfo();
  }, [toast]);

  const updateSiteInfo = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('daveops_site_info')
        .upsert({ 
          setting_key: key, 
          setting_value: value,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'setting_key' 
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating site info:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatePromises = Object.entries(siteInfo).map(([key, value]) =>
        updateSiteInfo(key, value)
      );

      await Promise.all(updatePromises);

      toast({
        title: 'Success',
        description: 'Site information updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update site information',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setSiteInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return {
    siteInfo,
    loading,
    saving,
    handleSave,
    handleInputChange
  };
};
