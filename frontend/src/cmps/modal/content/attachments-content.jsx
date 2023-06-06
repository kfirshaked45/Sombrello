import { updateBoard } from '../../../store/board.actions';
import { ImgUploader } from '../../img-uploader';

export function AttachmentsContent({ task, group, board, dispatch }) {
  const handleAddAttachment = (attachment) => {
    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              attachments: [...(t.attachments || []), attachment],
            };
          }
          return t;
        });

        return {
          ...g,
          tasks: updatedTasks,
        };
      }
      return g;
    });

    const updatedBoard = { ...board, groups: updatedGroups };
    dispatch(updateBoard(updatedBoard));
  };

  return (
    <div>
      <ImgUploader onUploaded={handleAddAttachment} />
    </div>
  );
}
