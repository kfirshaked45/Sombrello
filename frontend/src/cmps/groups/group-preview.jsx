import { TaskList } from '../task/task-list';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../store/board.actions';
import { boardService } from '../../services/board.service.local';

export function GroupPreview({ board, group, provided }) {
  const [title, setTitle] = useState(group.title);
  const [isEditable, setIsEditable] = useState(false);
  const textAreaInput = useRef(null);
  const dispatch = useDispatch();

  function handleChange(ev) {
    setTitle(ev.target.value);
  }
  function handleHeaderClick() {
    setIsEditable(true);
    textAreaInput.current.focus();
    textAreaInput.current.select();
  }
  function handleExitKeys(ev) {
    if (ev.key === 'Escape' || ev.key === 'Enter') {
      textAreaInput.current.blur();
    }
  }
  function handleBlur() {
    setIsEditable(false);
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
      boardService.updateBoard(updatedBoard);
    }
  }

  return (
    <div>
      <div className="drag-handle" {...provided.dragHandleProps}>
        <div className="group-list-header" onClick={handleHeaderClick}>
          <textarea
            value={title}
            className="list-header-name"
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ pointerEvents: isEditable ? 'auto' : 'none' }}
            ref={textAreaInput}
            onKeyDown={handleExitKeys}
          ></textarea>
          <button className="list-header-extras-menu">
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      </div>
      <TaskList board={board} group={group} tasks={group.tasks}></TaskList>
      <button>Add Card</button>
    </div>
  );
}
