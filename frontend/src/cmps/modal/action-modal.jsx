import { ReactComponent as XIcon } from '../../assets/img/board/x-icon.svg';
import { utilService } from '../../services/util.service';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { ActionContent } from './content/action-content';

export function ActionModal({ action, onClose, board, task, group, triggerRef }) {
  const [modalTopPos, setModalTopPos] = useState(null);
  console.log(triggerRef, action);
  useLayoutEffect(() => {
    if (triggerRef.current && triggerRef) {
      const { top, left, marginLeft } = utilService.getModalPosition(action, triggerRef);
      setModalTopPos({ top, left, marginLeft });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [action]);
  // if (!modalTopPos) return;
  return (
    <div className="action-modal" style={modalTopPos}>
      <div className="action-header">
        <div>{action}</div>
        <XIcon onClick={onClose} className="action-modal-x" />
      </div>
      <ActionContent action={action} board={board} task={task} group={group} />
    </div>
  );
}
