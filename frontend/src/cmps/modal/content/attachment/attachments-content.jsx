import { utilService } from '../../../../services/util.service';
import { updateBoard } from '../../../../store/board.actions';
import { ImgUploader } from '../../../img-uploader';

export function AttachmentsContent({ task, group, board, dispatch }) {
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

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              attachments: [...(t.attachments || []), newAttachment],
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
  }

  return (
    <div>
      <ImgUploader onUploaded={handleAddAttachment} />
    </div>
  );
}
