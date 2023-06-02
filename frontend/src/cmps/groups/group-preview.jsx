import { TaskList } from '../task/task-list';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../store/board.actions';
import { boardService } from '../../services/board.service.local';

export function GroupPreview({ board, group, provided }) {
  const [title, setTitle] = useState(group.title);
  const dispatch = useDispatch();

  function handleChange(ev) {
    setTitle(ev.target.value);
  }

  function handleBlur() {
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
        <div className="group-list-header">
          <textarea value={title} className="list-header-name" onChange={handleChange} onBlur={handleBlur}></textarea>
          <button className="list-header-extras-menu">
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      </div>

      <TaskList board={board} groupId={group.id} tasks={group.tasks}></TaskList>
    </div>
  );
}
