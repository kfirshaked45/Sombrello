import React, { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AiOutlineClose } from 'react-icons/ai';
import { MdCallToAction } from 'react-icons/md';
import { utilService } from '../../../services/util.service';
import { ActionModal } from '../../modal/action-modal';

export function TaskCover({ style, task, group, board }) {
  const [selectedAction, setSelectedAction] = useState();

  const buttonRef = useRef();
  const navigate = useNavigate();
  // const coverImgBackgroundColor = coverImg ? utilService.getDominantColorFromImage(coverImg) : null;
  // console.log(coverImgBackgroundColor);

  const backgroundColor = style?.coverColor ?? null;

  function onTaskClose(ev) {
    ev.stopPropagation();
    navigate(-1);
  }
  const openActionModal = (action) => {
    setSelectedAction(action);
  };

  const closeActionModal = () => {
    setSelectedAction(null);
  };

  return (
    <div
      className="task-cover"
      style={{
        backgroundColor: backgroundColor,
        height: !backgroundColor && 0,
        // backgroundImage: `url(${coverImg})`,
        // Center the background image horizontally and vertically
      }}
    >
      <div className="call-to-action general-btn-styling" onClick={() => openActionModal('Cover')} ref={buttonRef}>
        <MdCallToAction className="cta-icon" />
        <span className="cta-text">Cover</span>
      </div>
      <div className="close-task-details-btn" onClick={(ev) => onTaskClose(ev)}>
        <AiOutlineClose />
      </div>
      {selectedAction && (
        <ActionModal action={selectedAction} onClose={closeActionModal} board={board} task={task} group={group} triggerRef={buttonRef} />
      )}
    </div>
  );
}
