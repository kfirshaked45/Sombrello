import React, { useRef, useState } from 'react';
import { RiAttachment2 } from 'react-icons/ri';
import { utilService } from '../../../services/util.service';
import { updateBoard } from '../../../store/board.actions';
import { useDispatch } from 'react-redux';
import { ActionModal } from '../../modal/action-modal';

export function TaskAttachments({ attachments, task, board, group }) {
  console.log(task, 'TASK');
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedAttachmentId, setSelectedAttachmentId] = useState(null);
  console.log(attachments);
  const buttonRef = useRef(null);
  const openActionModal = (action, attachmentId) => {
    setSelectedAction(action);
    setSelectedAttachmentId(attachmentId);
  };

  const closeActionModal = () => {
    setSelectedAction(null);
  };

  const dispatch = useDispatch();
  if (!attachments || attachments.length === 0) return;

  function deleteImg(imgId) {
    const updatedAttachments = attachments.filter((attachment) => attachment.id !== imgId);

    const updatedTasks = group.tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          attachments: updatedAttachments,
        };
      }
      return t;
    });

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        return {
          ...g,
          tasks: updatedTasks,
        };
      }
      return g;
    });

    const updatedBoard = {
      ...board,
      groups: updatedGroups,
    };

    dispatch(updateBoard(updatedBoard));
  }
  // function addCover(cover) {
  //   if (!task.attachments) {
  //     task.attachments = [cover]
  //   } else {
  //     const alreadyMemberIndex = task.members.findIndex(
  //       (m) => m._id === cover._id
  //     )
  //     if (alreadyMemberIndex !== -1) {
  //       task.members.splice(alreadyMemberIndex, 1)
  //     } else {
  //       task.members.push(cover)
  //     }
  //   }

  //   const updatedGroups = board.groups.map((g) => {
  //     if (g.id === group.id) {
  //       const updatedTasks = g.tasks.map((t) => {
  //         if (t.id === task.id) {
  //           return {
  //             ...t,
  //             members: task.members || [],
  //           }
  //         }
  //         return t
  //       })

  //       return {
  //         ...g,
  //         tasks: updatedTasks,
  //       }
  //     }
  //     return g
  //   })
  //   const updatedBoard = { ...board, groups: updatedGroups }

  //   dispatch(updateBoard(updatedBoard))
  // }
  function handleCoverClick(imgId, imgUrl) {
    const isCurrentCover = task.style.coverImg === imgUrl;

    if (isCurrentCover) {
      updateTaskCoverImg(null); // Remove cover image from the task
    } else {
      updateTaskCoverImg(imgUrl); // Set current image as the cover
    }
  }

  async function updateTaskCoverImg(imgUrl) {
    const updatedTasks = group.tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          style: {
            ...t.style,
            coverImg: imgUrl,
          },
        };
      }
      return t;
    });

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        return {
          ...g,
          tasks: updatedTasks,
        };
      }
      return g;
    });

    const updatedBoard = {
      ...board,
      groups: updatedGroups,
    };

    await dispatch(updateBoard(updatedBoard));
  }

  return (
    <div className="task-attachments">
      <div className="attachment-header details-grid">
        <RiAttachment2 className="attachment-icon" />
        <h2 className="attachment-title">Attachments</h2>
      </div>
      {attachments ? (
        <ul>
          {attachments.map((attachment) => (
            <li className="attachment-container" key={attachment.id}>
              <img src={`${attachment.imgUrl}`} className="attachment-img" />
              <div className="attachment-detail-container">
                <span className="attachment-thumbnail-name">{attachment.imageName}</span>
                <div className="attachment-btn-container">
                  <span className="attachment-date">{utilService.formatDateAttachment(attachment.uploadedAt)}</span>
                  {/* <button className="attachment-button">Comment</button> */}
                  <button className="attachment-button" onClick={() => deleteImg(attachment.id)}>
                    Delete
                  </button>
                  <span className="dot-seperator">·</span>
                  <button className="attachment-button" ref={buttonRef} onClick={() => openActionModal('Edit Attachment', attachment.id)}>
                    Edit
                  </button>
                  <span className="dot-seperator">·</span>
                </div>
                <button className="attachment-button" onClick={() => handleCoverClick(attachment.id, attachment.imgUrl)}>
                  {task.style.coverImg === attachment.imgUrl ? 'Remove cover' : 'Make cover'}
                </button>
              </div>
            </li>
          ))}
          {selectedAction && (
            <ActionModal
              action={selectedAction}
              onClose={closeActionModal}
              board={board}
              attachmentId={selectedAttachmentId}
              task={task}
              group={group}
              triggerRef={buttonRef}
            />
          )}
        </ul>
      ) : (
        <p>No attachments</p>
      )}
    </div>
  );
}
