import { TaskList } from '../task/task-list';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../store/board.actions';

import { boardService } from '../../services/board.service.local';
import { TaskAdd } from '../task/task-add';
import { ActionModal } from '../modal/action-modal.jsx';

export function GroupPreview({ board, group, provided }) {
  const [title, setTitle] = useState(group.title);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [modalValue, setModalValue] = useState(null);

  const textAreaInput = useRef(null);
  const dispatch = useDispatch();

  function handleChange(ev) {
    setTitle(ev.target.value);
  }

  function handleHeaderClick() {
    setIsTitleEditable(true);
    textAreaInput.current.focus();
    textAreaInput.current.select();
  }

  function handleExitKeys(ev) {
    if (ev.key === 'Escape' || ev.key === 'Enter') {
      textAreaInput.current.blur();
    }
  }

  function handleBlur() {
    setIsTitleEditable(false);
    if (title !== group.title) {
      const updatedGroup = { ...group, title: title };
      const updatedGroups = board.groups.map((g) => {
        if (g.id === group.id) {
          return updatedGroup;
        }
        return g;
      });

      const updatedBoard = { ...board, groups: updatedGroups };

      dispatch(updateBoard(updatedBoard));
      // boardService.updateBoard(updatedBoard);
    }
  }

  const openEditModal = (action, ev) => {
    ev.stopPropagation();
    setModalValue(action);
  };

  const closeEditModal = () => {
    setModalValue(null);
  };

  return (
    <div className="group-preview-container">
      <div className="group-list-header" onClick={handleHeaderClick} {...provided.dragHandleProps}>
        <textarea
          value={title}
          className="list-header-name"
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ pointerEvents: isTitleEditable ? 'auto' : 'none' }}
          ref={textAreaInput}
          onKeyDown={handleExitKeys}
        ></textarea>

        <button
          className="list-header-extras-menu"
          onClick={(ev) => {
            openEditModal('Group', ev);
          }}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </div>
      <TaskList board={board} group={group} tasks={group.tasks}></TaskList>
      {modalValue && <ActionModal action={modalValue} onClose={closeEditModal} board={board} group={group} triggerRef={textAreaInput} />}
    </div>
  );
}
