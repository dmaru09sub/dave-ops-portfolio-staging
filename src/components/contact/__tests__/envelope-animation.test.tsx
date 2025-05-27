
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { describe, it, expect, vi } from 'vitest';
import { EnvelopeAnimation } from '../envelope-animation';

describe('EnvelopeAnimation', () => {
  it('renders when visible', () => {
    const mockOnAnimationEnd = vi.fn();
    render(<EnvelopeAnimation isVisible={true} onAnimationEnd={mockOnAnimationEnd} />);
    
    expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument();
  });

  it('does not render when not visible', () => {
    const mockOnAnimationEnd = vi.fn();
    render(<EnvelopeAnimation isVisible={false} onAnimationEnd={mockOnAnimationEnd} />);
    
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  it('calls onAnimationEnd when animation completes', () => {
    const mockOnAnimationEnd = vi.fn();
    render(<EnvelopeAnimation isVisible={true} onAnimationEnd={mockOnAnimationEnd} />);
    
    const animationContainer = screen.getByRole('presentation', { hidden: true });
    
    // Simulate animation end
    fireEvent.animationEnd(animationContainer);
    
    expect(mockOnAnimationEnd).toHaveBeenCalledTimes(1);
  });
});
