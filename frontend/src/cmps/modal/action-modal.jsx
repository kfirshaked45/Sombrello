import { ReactComponent as XIcon } from '../../assets/img/board/x-icon.svg';
import { utilService } from '../../services/util.service';
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { ActionContent } from './content/action-content';

export function ActionModal({ action, onClose, board, task, group, triggerRef, attachmentId, labelId }) {
  const [modalTopPos, setModalTopPos] = useState(null);
  const modalRef = useRef(null);

  useLayoutEffect(() => {
    if (triggerRef.current && triggerRef) {
      setModalTopPos(null); // Reset the position state
      const { top, left, marginLeft } = utilService.getModalPosition(action, triggerRef);
      setModalTopPos({ top, left, marginLeft }); // Update the position state
    }
  }, [action, triggerRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="action-modal" style={modalTopPos} ref={modalRef} onClick={(ev) => ev.stopPropagation()}>
      <div className="action-header">
        <div>{action}</div>
        <XIcon onClick={onClose} className="action-modal-x" />
      </div>
      <ActionContent
        action={action}
        board={board}
        task={task}
        group={group}
        attachmentId={attachmentId}
        onClose={onClose}
        labelId={labelId}
        modalRef={modalRef}
      />
    </div>
  );
}
