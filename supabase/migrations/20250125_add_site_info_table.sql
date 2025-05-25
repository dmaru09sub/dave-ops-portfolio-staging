
-- Create table for site information
CREATE TABLE IF NOT EXISTS public.daveops_site_info (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key text NOT NULL UNIQUE,
    setting_value text,
    description text,
    updated_at timestamp with time zone DEFAULT now()
);

-- Insert default values
INSERT INTO public.daveops_site_info (setting_key, setting_value, description) VALUES
('github_url', 'https://github.com/dmaru09sub', 'GitHub profile URL'),
('site_title', 'Dave-Ops.Net', 'Main site title'),
('site_description', 'DevOps Portfolio and Tutorials', 'Site description for meta tags'),
('contact_email', 'admin@dave-ops.net', 'Primary contact email'),
('linkedin_url', '', 'LinkedIn profile URL'),
('twitter_url', '', 'Twitter profile URL')
ON CONFLICT (setting_key) DO NOTHING;

-- Enable RLS
ALTER TABLE public.daveops_site_info ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.daveops_site_info
    FOR SELECT USING (true);

-- Create policy to allow admin write access
CREATE POLICY "Allow admin write access" ON public.daveops_site_info
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.daveops_user_roles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );
