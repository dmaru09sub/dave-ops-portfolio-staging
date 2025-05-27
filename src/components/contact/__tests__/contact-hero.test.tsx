
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { describe, it, expect } from 'vitest';
import { ContactHero } from '../contact-hero';

describe('ContactHero', () => {
  it('renders the hero section with correct content', () => {
    render(<ContactHero />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText(/Ready to collaborate/)).toBeInTheDocument();
    expect(screen.getByText(/DevOps project/)).toBeInTheDocument();
  });

  it('renders the mail icon', () => {
    render(<ContactHero />);
    
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<ContactHero />);
    
    const heading = screen.getByText('Get In Touch');
    expect(heading).toHaveClass('text-5xl', 'font-bold', 'bg-gradient-to-r');
  });
});
