
import React from 'react';

interface EnvelopeAnimationProps {
  isVisible: boolean;
  onAnimationEnd: () => void;
}

export const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({
  isVisible,
  onAnimationEnd
}) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
      onAnimationEnd={onAnimationEnd}
    >
      <div className="animate-[envelope-send_2s_ease-out_forwards]">
        <div className="relative">
          {/* Envelope */}
          <div className="w-16 h-12 bg-white border-2 border-primary rounded-sm shadow-lg">
            <div className="absolute inset-x-0 top-0 h-6 bg-primary/10 border-b border-primary/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-4 border-l-4 border-r-4 border-t-4 border-primary border-b-0 transform rotate-45"></div>
              </div>
            </div>
          </div>
          
          {/* Flying effect particles */}
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary/60 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-primary/40 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
