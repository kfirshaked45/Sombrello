import { utilService } from '../../services/util.service';

import { RiAttachment2 } from 'react-icons/ri';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TfiAlignLeft } from 'react-icons/tfi';
import { GoComment } from 'react-icons/go';

export function TaskPreview({ groupId, task }) {
  const imageUrl = task.attachments && task.attachments[0];
  const labels = task.labels;
  const color = task.style && task.style.coverColor;
  const description = task.desc;
  const dueDate = task.dueDate;

  function getDateClass(task) {
    if (!task || !task.dueDate) {
      return null;
    }

    var then = new Date(dueDate);
    var now = new Date();
    var msBetweenDates = then.getTime() - now.getTime();
    var hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    if (hoursBetweenDates < 0) {
      return 'overdue';
    } else if (hoursBetweenDates < 24) {
      return 'duesoon';
    } else {
      return null;
    }
  }

  return (
    <div className="cover-img-section">
      {color && !imageUrl && <div className="task-list-cover" style={{ backgroundColor: color }}></div>}
      {imageUrl && <img src={imageUrl} alt="Task Image" className="task-image" />}
      <div className="task-preview">
        {labels && labels.length !== 0 && (
          <div className="task-preview-labels">
            {labels.map((label, index) => (
              <button key={index} style={{ backgroundColor: label.color }} className="group-label"></button>
            ))}
          </div>
        )}

        <span className="task-item-title">{task.title}</span>

        <section className="task-item-footer">
          <div className="props-icons">
            {dueDate && (
              <section className={`date-container ${getDateClass(task)}`}>
                <span className="clock-icon">
                  <AiOutlineClockCircle />
                </span>
                <span>{utilService.dueDateFormat(dueDate)}</span>
              </section>
            )}

            {description && (
              <section className="description-icon">
                <TfiAlignLeft />
              </section>
            )}

            {task.comments && task.comments.length !== 0 && (
              <section className={`comments-icon`}>
                <GoComment />
                <span>{task.comments.length}</span>
              </section>
            )}

            {task.attachments && task.attachments.length !== 0 && (
              <section className="attachments-icon">
                <RiAttachment2 />
                {task.attachments.length}
              </section>
            )}
          </div>
          <div className="members-icons">
            {task.members && task.members.length !== 0 && (
              <section className="members-img">
                {task.members.map((member) => (
                  <div className="member-img" key={member._id}>
                    <img src={member.imgUrl} alt="" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </section>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
