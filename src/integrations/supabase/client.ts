
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://nlzwrlgtjshcjfxfchyz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sendybGd0anNoY2pmeGZjaHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3OTQ0OTksImV4cCI6MjA2MzM3MDQ5OX0.-HJhOWKhgGzH_h8bKSUJ6-p9QJ8ZUecXB9qTqMyYmKE'

// Get the current domain and determine if we need custom headers
const getCurrentDomain = () => {
  if (typeof window !== 'undefined') {
    return window.location.hostname;
  }
  return 'localhost';
};

const isCustomDomain = () => {
  const domain = getCurrentDomain();
  return domain === 'dave-ops.net' || domain === 'www.dave-ops.net';
};

// Configure client with proper CORS handling for custom domain
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'daveops-portfolio',
      ...(isCustomDomain() && {
        'Origin': 'https://dave-ops.net',
        'Referer': 'https://dave-ops.net'
      })
    }
  }
});
