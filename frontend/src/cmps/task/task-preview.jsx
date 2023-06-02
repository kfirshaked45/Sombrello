// import { TaskDetails } from './task-details
export function TaskPreview({ groupId, task }) {
  return (
    <div className="task-preview">
      <span className="task-item-title">{task.title}</span>
    </div>
  );
}
