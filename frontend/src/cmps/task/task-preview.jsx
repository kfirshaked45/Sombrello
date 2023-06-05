export function TaskPreview({ groupId, task }) {
  const imageUrl = task.attachments && task.attachments[0];
  const labels = task.labels;

  return (
    <div className="task-preview">
      <div className="task-preview-labels">
        {labels && labels.map((label) => <button style={{ backgroundColor: label.color }} className="group-label"></button>)}
      </div>
      <span className="task-item-title">{task.title}</span>
      {imageUrl && <img src={imageUrl} alt="Task Image" className="task-image" />}
    </div>
  );
}
