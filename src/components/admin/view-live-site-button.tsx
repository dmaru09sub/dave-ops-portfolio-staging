
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useDomainContext } from '@/hooks/use-domain-context';

interface ViewLiveSiteButtonProps {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const ViewLiveSiteButton: React.FC<ViewLiveSiteButtonProps> = ({ 
  variant = 'outline', 
  size = 'default',
  className = ''
}) => {
  const { liveSiteUrl } = useDomainContext();

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <a 
        href={liveSiteUrl}
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center gap-2"
      >
        <ExternalLink className="h-4 w-4" />
        View Live Site
      </a>
    </Button>
  );
};

export default ViewLiveSiteButton;
