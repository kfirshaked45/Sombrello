import { BsPlus } from 'react-icons/bs';
import { MemberModal } from '../../modal/member-modal';
import { TaskLabels } from './task-labels';
import { TaskDates } from './task-dates';

export function TaskProps({ members, selectedMember, task }) {
  return (
    <section className="task-props">
      {members && (
        <div className="members-wrapper">
          <h5>Members</h5>
          <div className="members">
            <div className="members-img">
              {members.map((member) => (
                <div key={member._id}>
                  <img src={member.imgUrl} alt="Member" />
                </div>
              ))}
            </div>
            {selectedMember && <MemberModal member={selectedMember} />}
            <button className="add-member">
              <BsPlus />
            </button>
          </div>
        </div>
      )}

      <div className="labels-wrapper">
        <h5>Labels</h5>
        <div className="labels">
          <TaskLabels labels={task?.labels} />
          <button className="add-label">
            <BsPlus />
          </button>
        </div>
      </div>
      <div className="dates-wrapper">
        <div className="dates">
          <TaskDates dates={task?.dates} />
        </div>
      </div>
    </section>
  );
}
