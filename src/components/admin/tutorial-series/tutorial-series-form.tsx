
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import type { TutorialItem } from '@/types/tutorial-types';

interface TutorialSeriesFormData {
  title: string;
  description: string;
  difficulty_level: string;
  estimated_duration: number;
  prerequisites: string[];
  tutorials: TutorialItem[];
  published: boolean;
  sort_order: number;
}

interface TutorialSeriesFormProps {
  formData: TutorialSeriesFormData;
  setFormData: (data: TutorialSeriesFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const TutorialSeriesForm: React.FC<TutorialSeriesFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEditing
}) => {
  const addPrerequisite = () => {
    setFormData({
      ...formData,
      prerequisites: [...formData.prerequisites, '']
    });
  };

  const updatePrerequisite = (index: number, value: string) => {
    const updated = [...formData.prerequisites];
    updated[index] = value;
    setFormData({ ...formData, prerequisites: updated });
  };

  const removePrerequisite = (index: number) => {
    const updated = formData.prerequisites.filter((_, i) => i !== index);
    setFormData({ ...formData, prerequisites: updated });
  };

  const addTutorial = () => {
    const newTutorial: TutorialItem = {
      id: `tutorial-${Date.now()}`,
      title: '',
      description: '',
      sort_order: formData.tutorials.length + 1,
      estimated_duration: 30,
      completed: false
    };
    setFormData({
      ...formData,
      tutorials: [...formData.tutorials, newTutorial]
    });
  };

  const updateTutorial = (index: number, field: keyof TutorialItem, value: any) => {
    const updated = [...formData.tutorials];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, tutorials: updated });
  };

  const removeTutorial = (index: number) => {
    const updated = formData.tutorials.filter((_, i) => i !== index);
    setFormData({ ...formData, tutorials: updated });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Tutorial Series' : 'Create New Tutorial Series'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
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
              <label className="text-sm font-medium">Difficulty Level</label>
              <select
                value={formData.difficulty_level}
                onChange={(e) => setFormData({ ...formData, difficulty_level: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Brief description of the tutorial series..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Estimated Duration (minutes)</label>
              <Input
                type="number"
                value={formData.estimated_duration}
                onChange={(e) => setFormData({ ...formData, estimated_duration: parseInt(e.target.value) || 60 })}
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
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Prerequisites</label>
              <Button type="button" variant="outline" size="sm" onClick={addPrerequisite}>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.prerequisites.map((prereq, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={prereq}
                    onChange={(e) => updatePrerequisite(index, e.target.value)}
                    placeholder="e.g., Basic React knowledge"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePrerequisite(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Tutorials in Series</label>
              <Button type="button" variant="outline" size="sm" onClick={addTutorial}>
                <Plus className="h-4 w-4 mr-1" />
                Add Tutorial
              </Button>
            </div>
            <div className="space-y-4">
              {formData.tutorials.map((tutorial, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <Input
                      value={tutorial.title}
                      onChange={(e) => updateTutorial(index, 'title', e.target.value)}
                      placeholder="Tutorial title"
                    />
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={tutorial.estimated_duration || 30}
                        onChange={(e) => updateTutorial(index, 'estimated_duration', parseInt(e.target.value))}
                        placeholder="Duration (min)"
                        className="w-24"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTutorial(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={tutorial.description || ''}
                    onChange={(e) => updateTutorial(index, 'description', e.target.value)}
                    placeholder="Tutorial description"
                    rows={2}
                  />
                </Card>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
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
              {isEditing ? 'Update' : 'Create'} Series
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TutorialSeriesForm;
