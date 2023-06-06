import { RiAttachment2 } from 'react-icons/ri';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TfiAlignLeft } from "react-icons/tfi";
import { GoComment } from "react-icons/go"; 


export function TaskPreview({ groupId, task }) {
  console.log(task);
  const imageUrl = task.attachments && task.attachments[0];
  const labels = task.labels;
  const color = task.style && task.style.coverColor;
  const description = task.desc;
  const dueDate = task.dueDate;
  const comments = task.comments && task.comments[0];

  return (
    <div className="cover-img-section">
      {color && !imageUrl && <div className="task-list-cover" style={{ backgroundColor: color }}></div>}
      {imageUrl && <img src={imageUrl} alt="Task Image" className="task-image" />}
      <div className="task-preview">
        {labels && labels.length !== 0 && (
          <div className="task-preview-labels">
            {labels && labels.map((label, index) => <button key={index} style={{ backgroundColor: label.color }} className="group-label"></button>)}
          </div>
        )}
        <span className="task-item-title">{task.title}</span>
        <div className='task-item-footer'>
          {dueDate && <AiOutlineClockCircle/>}
          {description && <TfiAlignLeft/>}
          {comments && <GoComment/>}
          {imageUrl && <RiAttachment2/>}
        </div>
      </div>
    </div>
  );
}
