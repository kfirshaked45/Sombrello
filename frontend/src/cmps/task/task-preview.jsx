import { Link } from 'react-router-dom';
import { TaskDetails } from './task-details';

export function TaskPreview({ groupId, task }) {
  console.log('task: ', task);
  return (
    <div className="task-preview">
      <Link
        to={{
          pathname: `${groupId}/${task.id}`,
          state: { task },
        }}
      >
        <span className="task-item-title">{task.title}</span>
      </Link>
    </div>
  );
}
