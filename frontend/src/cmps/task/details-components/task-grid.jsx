import { RxActivityLog } from 'react-icons/rx';
import { TaskAttachments } from '../details/task-attachments';
import { TaskProps } from '../details/task-props';
import { TaskDescription } from './task-description';
import { TaskSidebar } from './task-sidebar';
import { TaskActivity } from './task-activity';

export function TaskGrid({ members, selectedMember, task, board, group, hasAttachments }) {
  return (
    <div className="task-grid ">
      <div className="task-column">
        <TaskProps members={members} selectedMember={selectedMember} task={task} />
        <TaskDescription description={task?.desc} task={task} board={board} group={group} />

        <div className="attachments-section">
          <TaskAttachments attachments={task.attachments} />
        </div>
        <TaskActivity task={task} board={board} group={group} />
      </div>
      <div className="task-sidebar">
        <TaskSidebar
          board={board}
          group={group}
          task={task}
          hasAttachments={task?.attachments?.length > 0}
          width={hasAttachments ? '100px' : '165px'}
        />
      </div>
    </div>
  );
}
