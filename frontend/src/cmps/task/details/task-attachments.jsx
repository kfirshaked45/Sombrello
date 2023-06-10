import React, { useRef, useState } from 'react';
import { RiAttachment2 } from 'react-icons/ri';
import { utilService } from '../../../services/util.service';
import { updateBoard } from '../../../store/board.actions';
import { useDispatch } from 'react-redux';
import { ActionModal } from '../../modal/action-modal';

export function TaskAttachments({ attachments, task, board, group, setCoverImg, coverImg }) {
  const [selectedAction, setSelectedAction] = useState(null);
  console.log(attachments, coverImg);
  const buttonRef = useRef(null);
  const openActionModal = (action) => {
    setSelectedAction(action);
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
  function handleCoverClick(imgUrl) {
    if (coverImg === imgUrl) {
      setCoverImg(null); // Remove cover image from state
    } else {
      setCoverImg(imgUrl); // Set current image as cover
    }
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
                  <button className="attachment-button">Comment</button>
                  <button className="attachment-button" onClick={() => deleteImg(attachment.id)}>
                    Delete
                  </button>
                  <button className="attachment-button" ref={buttonRef} onClick={() => openActionModal('Edit Attachment')}>
                    Edit
                  </button>
                </div>
                <button className="attachment-button" onClick={() => handleCoverClick(attachment.imgUrl)}>
                  {coverImg === attachment.imgUrl ? 'Remove Cover' : 'Make Cover'}
                </button>
              </div>
            </li>
          ))}
          {selectedAction && (
            <ActionModal
              action={selectedAction}
              onClose={closeActionModal}
              board={board}
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
