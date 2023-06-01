import { TaskList } from '../task/task-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
// import { GroupTask } from './group-task';

export function GroupPreview({ boardId, group }) {
  return (
    <div>
      <div className="group-list-header">
        <textarea value={group.title} className="list-header-name"></textarea>
        <button className="list-header-extras-menu">
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </div>

      <TaskList boardId={boardId} groupId={group.id} tasks={group.tasks}></TaskList>
    </div>
  );
}
