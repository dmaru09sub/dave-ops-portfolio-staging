
import { supabase } from '@/integrations/supabase/client';

// Dave Ops Portfolio specific database operations
export const daveopsDb = {
  // Future project-related operations will go here
  // Example: projects, blog posts, tutorials, etc.
  
  // Profiles operations (shared across all apps)
  profiles: {
    async getProfile(userId: string) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    },

    async updateProfile(userId: string, updates: Record<string, any>) {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);
      
      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
      return data;
    }
  }
};

// Application-specific table prefixes for data isolation
export const TABLE_PREFIXES = {
  DAVEOPS: 'daveops_',
  SHARED: '' // For shared tables like profiles
} as const;

// Helper function to get table name with proper prefix
export const getTableName = (tableName: string, prefix: keyof typeof TABLE_PREFIXES = 'DAVEOPS') => {
  return `${TABLE_PREFIXES[prefix]}${tableName}`;
};

// Type-safe table name helper specifically for Dave Ops
export const daveopsTable = (tableName: string) => getTableName(tableName, 'DAVEOPS');

// Helper to ensure we only access Dave Ops data
export const withDaveOpsContext = (query: any) => {
  return query.not('application_context', 'eq', null);
};
