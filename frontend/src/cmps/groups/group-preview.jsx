import { TaskList } from '../task/task-list';
// import { GroupTask } from './group-task';

export function GroupPreview({ boardId, group }) {
  return (
    <div>
      <div className="group-list-header">
        <p>{group.title} </p>
        <p>...</p>
      </div>

      <TaskList boardId={boardId} groupId={group.id} tasks={group.tasks}></TaskList>
    </div>
  )
}
