
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PortfolioFormData {
  title: string;
  description: string;
  long_description: string;
  technologies: string;
  github_url: string;
  demo_url: string;
  image_url: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
}

interface PortfolioFormProps {
  formData: PortfolioFormData;
  setFormData: (data: PortfolioFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEditing
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Sort Order</label>
          <Input
            type="number"
            value={formData.sort_order}
            onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Long Description</label>
        <Textarea
          value={formData.long_description}
          onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
          rows={5}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Technologies (comma-separated)</label>
          <Input
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            placeholder="React, TypeScript, Node.js"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Image URL</label>
          <Input
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">GitHub URL</label>
          <Input
            value={formData.github_url}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Demo URL</label>
          <Input
            value={formData.demo_url}
            onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
          <span className="text-sm">Featured</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          />
          <span className="text-sm">Published</span>
        </label>
      </div>

      <div className="flex gap-2">
        <Button type="submit">
          {isEditing ? 'Update' : 'Create'} Project
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PortfolioForm;
