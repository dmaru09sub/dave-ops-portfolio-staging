
import { useTutorialFetch } from './use-tutorial-fetch';
import { useTutorialSave } from './use-tutorial-save';
import { useTutorialDelete } from './use-tutorial-delete';
import { useTutorialToggle } from './use-tutorial-toggle';

export const useTutorialOperations = () => {
  const { fetchTutorials } = useTutorialFetch();
  const { saveTutorial } = useTutorialSave();
  const { deleteTutorial } = useTutorialDelete();
  const { togglePublished } = useTutorialToggle();

  return {
    fetchTutorials,
    saveTutorial,
    deleteTutorial,
    togglePublished
  };
};
