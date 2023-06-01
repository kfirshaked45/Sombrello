import { Link } from 'react-router-dom';
import { TaskDetails } from './task-details';

export function TaskPreview({ boardId, groupId, task }) {
  return (
    <div className="task-preview">
      <Link to={`${groupId}/${task.id}`} task={task}>
        <h2>{task.title}</h2>
      </Link>
    </div>
  );
}
