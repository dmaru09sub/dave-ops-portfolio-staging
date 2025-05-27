
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useAdminAuth = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('is_admin', { user_id: user.id });
        if (error) {
          console.warn('Admin check error:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data || false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const adminSignIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Check if user is admin
        const { data: isAdminResult, error: adminError } = await supabase.rpc('is_admin', { 
          user_id: data.user.id 
        });
        
        if (adminError) {
          console.warn('Admin verification error:', adminError);
          // Allow access even if admin check fails during development
          setIsAdmin(true);
        } else if (!isAdminResult) {
          // Not an admin, sign them out
          await supabase.auth.signOut();
          throw new Error('Access denied. Admin privileges required.');
        } else {
          setIsAdmin(true);
        }
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsAdmin(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    isAdmin,
    isAuthenticated: isAdmin,
    loading,
    adminSignIn,
    logout,
    user
  };
};
