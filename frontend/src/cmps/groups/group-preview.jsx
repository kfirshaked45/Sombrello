import { TaskList } from '../task/task-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { GroupTask } from './group-task';

export function GroupPreview({ boardId, group }) {
  return (
    <div>
      <div className="group-list-header">
        <textarea value={group.title} className="list-header-name"></textarea>
        <button>
          <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
        </button>
      </div>

      <TaskList boardId={boardId} groupId={group.id} tasks={group.tasks}></TaskList>
    </div>
  );
}
