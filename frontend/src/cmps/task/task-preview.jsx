import { utilService } from '../../services/util.service';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../store/board.actions';
import { RiAttachment2 } from 'react-icons/ri';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TfiAlignLeft } from 'react-icons/tfi';
import { GoComment } from 'react-icons/go';
import { TaskDueDate } from './task-due-date';
import { useParams } from 'react-router';
import { boardService } from '../../services/board.service.local';

export function TaskPreview({ board, groupId, task }) {
  const imageDetails = task.attachments && task.attachments[0];
  const labels = task.labels;
  const color = task.style && task.style.coverColor;
  const description = task.desc;

  const dispatch = useDispatch();

  function toggleIsDone(ev) {
    ev.stopPropagation(); // Stop event propagation

    const updatedDueDate = { ...task.dueDate, isDone: !task.dueDate.isDone };
    const updatedTask = { ...task, dueDate: updatedDueDate };
    const updatedGroups = board.groups.map((group) => {
      if (group.id === groupId) {
        const updatedGroup = {
          ...group,
          tasks: group.tasks.map((currTask) => (currTask.id === task.id ? updatedTask : currTask)),
        };
        return updatedGroup;
      }
      return group;
    });
    const updatedBoard = { ...board, groups: updatedGroups };
    dispatch(updateBoard(updatedBoard));
  }

  const taskLabels = labels ? labels.map((label) => board.labels.find((l) => l.id === label.id)) : [];

  return (
    <div className="cover-img-section">
      {/* ... */}
      <div className="task-preview">
        {taskLabels.length !== 0 && (
          <div className="task-preview-labels">
            {taskLabels.map((label, index) => {
              if (!label || !label.color) return null; // Skip rendering if label or color is undefined
              return <button key={index} style={{ backgroundColor: label.color }} className="group-label"></button>;
            })}
          </div>
        )}

        <span className="task-item-title">{task.title}</span>
        {task.dueDate &&
          task.dueDate.timeStamp &&
          (description ||
            (task.comments && task.comments.length !== 0) ||
            (task.attachments && task.attachments.length !== 0) ||
            (task.members && task.members.length !== 0)) && (
            <section className="task-item-footer">
              <div className="props-icons" onClick={toggleIsDone}>
                {task.dueDate && <TaskDueDate dueDate={task.dueDate} toggleIsDone={toggleIsDone} />}

                {description && (
                  <section className="description-icon">
                    <TfiAlignLeft />
                  </section>
                )}

                {task.comments && task.comments.length !== 0 && (
                  <section className="comments-icon">
                    <GoComment />
                    <span className="comments-count">{task.comments.length}</span>
                  </section>
                )}

                {task.attachments && task.attachments.length !== 0 && (
                  <section className="attachments-icon">
                    <RiAttachment2 />
                    <span className="attachments-count">{task.attachments.length}</span>
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
          )}
      </div>
    </div>
  );
}
