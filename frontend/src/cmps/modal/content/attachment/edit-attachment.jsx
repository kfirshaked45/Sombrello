import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../../../store/board.actions';

export function EditAttachment({ attachmentId, board, group, task, onClose }) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const currentAttachment = task.attachments.find((attachment) => attachment.id === attachmentId);

  if (!currentAttachment) {
    return null; // Handle case when current attachment is not found
  }

  const updateAttachment = () => {
    const newImageName = inputRef.current.value;

    const updatedAttachments = task.attachments.map((attachment) => {
      if (attachment.id === attachmentId) {
        return {
          ...attachment,
          imageName: newImageName,
        };
      }
      return attachment;
    });

    const updatedTasks = group.tasks.map((currentTask) => {
      if (currentTask.id === task.id) {
        return {
          ...currentTask,
          attachments: updatedAttachments,
        };
      }
      return currentTask;
    });

    const updatedGroups = board.groups.map((currentGroup) => {
      if (currentGroup.id === group.id) {
        return {
          ...currentGroup,
          tasks: updatedTasks,
        };
      }
      return currentGroup;
    });

    const updatedBoard = {
      ...board,
      groups: updatedGroups,
    };

    dispatch(updateBoard(updatedBoard));
    onClose();
  };

  return (
    <div className="pop-over-content">
      <span className="edit-link-name"> Link Name</span>

      <input type="search" defaultValue={currentAttachment.imageName} ref={inputRef} style={{ margin: '4px 0 12px', width: '100%' }} />
      <button className="quill-save-btn" style={{ paddingLeft: '24px', paddingRight: '24px' }} onClick={updateAttachment}>
        Update
      </button>
    </div>
  );
}
