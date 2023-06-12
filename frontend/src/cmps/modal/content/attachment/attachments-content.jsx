import { utilService } from '../../../../services/util.service';
import { updateBoard } from '../../../../store/board.actions';
import { ImgUploader } from '../../../img-uploader';

export function AttachmentsContent({ task, group, board, dispatch, createActivity }) {
  function handleAddAttachment(attachment) {
    const { imgUrl, height, width, uploadedAt, imageName } = attachment; // Destructure the attachment object

    // Create a new attachment object with additional details
    const newAttachment = {
      id: utilService.makeId(),
      imgUrl,
      height,
      width,
      uploadedAt, // Set the current date and time as the uploadedAt value
      imageName,
      // Assuming the attachment object has a 'name' property for the image name
      // Add other desired properties here
    };

    const activityText = `Added attachment "${newAttachment.imageName}" to task "${task.title}"`;
    const activity = createActivity(activityText);

    const updatedGroups = board.groups.map((currentGroup) => {
      if (currentGroup.id === group.id) {
        const updatedTasks = currentGroup.tasks.map((currentTask) => {
          if (currentTask.id === task.id) {
            return {
              ...currentTask,
              attachments: [...(currentTask.attachments || []), newAttachment],
            };
          }
          return currentTask;
        });

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
      activities: [...board.activities, activity],
    };

    dispatch(updateBoard(updatedBoard));
  }

  return (
    <div>
      <ImgUploader onUploaded={handleAddAttachment} />
    </div>
  );
}
