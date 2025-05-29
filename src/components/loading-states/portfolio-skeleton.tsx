
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PortfolioSkeletonProps {
  count?: number;
  variant?: 'grid' | 'list';
}

export const PortfolioSkeleton = ({ count = 6, variant = 'grid' }: PortfolioSkeletonProps) => {
  return (
    <div className={variant === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
      {[...Array(count)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-video bg-gray-200 animate-pulse"></div>
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="h-9 bg-gray-200 rounded flex-1 animate-pulse"></div>
              <div className="h-9 bg-gray-200 rounded flex-1 animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
