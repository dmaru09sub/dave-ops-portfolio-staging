
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';

interface FormActionsProps {
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ saving, onSave, onCancel }) => {
  return (
    <div className="flex gap-2">
      <Button onClick={onSave} disabled={saving}>
        <Save className="h-4 w-4 mr-2" />
        {saving ? 'Saving...' : 'Save'}
      </Button>
      <Button variant="outline" onClick={onCancel}>
        <X className="h-4 w-4 mr-2" />
        Cancel
      </Button>
    </div>
  );
};

export default FormActions;
