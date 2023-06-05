export function TaskPreview({ groupId, task }) {
  if (!task.attachments) return;
  const imageUrl = task.attachments[0];

  return (
    <div className="task-preview">
      {imageUrl && <img src={imageUrl} alt="Task Image" className="task-image" />}
      <span className="task-item-title">{task.title}</span>
    </div>
  );
}
