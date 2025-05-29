
import React from 'react';

interface EnhancedMarkdownRendererProps {
  content: string;
  className?: string;
}

export const EnhancedMarkdownRenderer = ({ content, className = "" }: EnhancedMarkdownRendererProps) => {
  const parseMarkdown = (text: string) => {
    return text
      // Headers (H1-H6)
      .replace(/^######\s+(.*$)/gim, '<h6 class="text-base font-medium mt-4 mb-2 text-muted-foreground">$1</h6>')
      .replace(/^#####\s+(.*$)/gim, '<h5 class="text-lg font-medium mt-4 mb-2">$1</h5>')
      .replace(/^####\s+(.*$)/gim, '<h4 class="text-xl font-semibold mt-6 mb-3">$1</h4>')
      .replace(/^###\s+(.*$)/gim, '<h3 class="text-2xl font-semibold mt-6 mb-3">$1</h3>')
      .replace(/^##\s+(.*$)/gim, '<h2 class="text-3xl font-semibold mt-8 mb-4">$1</h2>')
      .replace(/^#\s+(.*$)/gim, '<h1 class="text-4xl font-bold mt-8 mb-4">$1</h1>')
      
      // Bold and Italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong class="font-bold italic">$1</strong>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-primary hover:underline font-medium transition-colors" target="_blank" rel="noopener noreferrer">$1</a>')
      
      // Code blocks
      .replace(/```([^`\n]*)\n([^`]+)```/gim, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4 border"><code class="text-sm font-mono">$2</code></pre>')
      
      // Inline code
      .replace(/`([^`]+)`/gim, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono border">$1</code>')
      
      // Lists
      .replace(/^\*\s+(.+)$/gim, '<li class="ml-4 mb-1">$1</li>')
      .replace(/^-\s+(.+)$/gim, '<li class="ml-4 mb-1">$1</li>')
      .replace(/^\d+\.\s+(.+)$/gim, '<li class="ml-4 mb-1 list-decimal">$1</li>')
      
      // Blockquotes
      .replace(/^>\s+(.+)$/gim, '<blockquote class="border-l-4 border-primary/30 pl-4 my-4 italic text-muted-foreground">$1</blockquote>')
      
      // Horizontal rule
      .replace(/^---$/gim, '<hr class="my-6 border-border">')
      
      // Line breaks and paragraphs
      .replace(/\n\n/gim, '</p><p class="mb-4">')
      .replace(/\n/gim, '<br />');
  };

  // Wrap lists in ul tags
  let processedContent = parseMarkdown(content);
  processedContent = processedContent.replace(/(<li[^>]*>.*?<\/li>(?:\s*<li[^>]*>.*?<\/li>)*)/gis, '<ul class="list-disc ml-6 mb-4 space-y-1">$1</ul>');
  
  const htmlContent = `<div class="prose prose-lg max-w-none"><p class="mb-4">${processedContent}</p></div>`;

  return (
    <div 
      className={`prose prose-gray max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
