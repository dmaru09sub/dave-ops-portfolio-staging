
-- Enable realtime for the deployments table
ALTER TABLE public.daveops_portfolio_deployments REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.daveops_portfolio_deployments;
