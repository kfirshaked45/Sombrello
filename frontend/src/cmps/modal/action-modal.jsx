import { ReactComponent as XIcon } from '../../assets/img/board/x-icon.svg';
import { utilService } from '../../services/util.service';
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { ActionContent } from './content/action-content';

export function ActionModal({ action, onClose, board, task, group, triggerRef }) {
  const [modalTopPos, setModalTopPos] = useState(null);
  const modalRef = useRef(null);

  useLayoutEffect(() => {
    if (triggerRef.current && triggerRef) {
      const { top, left, marginLeft } = utilService.getModalPosition(action, triggerRef);
      setModalTopPos({ top, left, marginLeft });
    }
  }, [action]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.classList.contains('action-modal-x')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="action-modal" style={modalTopPos} ref={modalRef}>
      <div className="action-header">
        <div>{action}</div>
        <XIcon onClick={onClose} className="action-modal-x" />
      </div>
      <ActionContent action={action} board={board} task={task} group={group} />
    </div>
  );
}
