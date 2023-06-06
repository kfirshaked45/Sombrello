import { ReactComponent as XIcon } from '../../assets/img/board/x-icon.svg';

import { useDispatch } from 'react-redux';
import { Calendar, DateRange } from 'react-date-range';
import { utilService } from '../../services/util.service';
import React, { useState, useRef, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ActionContent } from './content/action-content';

export function ActionModal({ action, onClose, board, task, group, triggerRef }) {
  const modalRef = useRef(null);
  const modalTopPos = useRef({ top: '', left: '', marginLeft: '' });

  useEffect(() => {
    if (triggerRef.current && modalRef.current) {
      modalTopPos.current = utilService.getModalPosition(action, triggerRef);
      console.log(modalTopPos);
      modalRef.current.style.top = modalTopPos.current.top;
      modalRef.current.style.left = modalTopPos.current.left;
      modalRef.current.style.marginLeft = modalTopPos.current.marginLeft;
    }
  }, [action, triggerRef]);

  return (
    <div className="action-modal" ref={modalRef} style={{ top: modalTopPos.current.top }}>
      <div className="action-header">
        <div>{action}</div>
        <XIcon onClick={onClose} className="action-modal-x" />
      </div>
      <ActionContent action={action} board={board} task={task} group={group} />
    </div>
  );
}
