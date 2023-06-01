import { TaskPreview } from './task-preview'

export function TaskList({ boardId, groupId, tasks }) {
  
  return (
      <ul className="task-list">
        {tasks.map((task) => (
          <li className="task-list-item" key={task.id}>
            <TaskPreview boardId={boardId} groupId={groupId} task={task} />
          </li>
        ))}
      </ul>
  )
}