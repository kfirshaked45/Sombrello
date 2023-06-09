import { BsPlus, BsPlusLg } from 'react-icons/bs';
// import { MemberModal } from '../../modal/member-modal';
import { TaskLabels } from './task-labels';
import { TaskDates } from './task-dates';
import { useRef, useState } from 'react';
import { ActionModal } from '../../modal/action-modal';

export function TaskProps({ members, selectedMember, task, board, group }) {

  const [selectedAction, setSelectedAction] = useState(null);
  const addButtonRef = useRef(null);
  const openActionModal = (action) => {
    setSelectedAction(action);
  };

  const closeActionModal = () => {
    setSelectedAction(null);
  };

  return (
    <section className="task-props">
      {members && members.length > 0 && (
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
            {/* {selectedMember && <MemberModal member={selectedMember} />} */}
            <button className="add-member" ref={addButtonRef} onClick={() => openActionModal('Members ')}>
              <BsPlusLg />
            </button>
          </div>
        </div>
      )}
      {task.labels && task.labels.length > 0 && (
        <div className="labels-wrapper">
          <h5>Labels</h5>
          <div className="labels">
            <TaskLabels labels={task?.labels} />
            <button className="add-label" onClick={() => openActionModal('Labels')}>
              <BsPlusLg />
            </button>
          </div>
        </div>
      )}

      <div className="dates-wrapper">
        <TaskDates dates={task?.dates} onClickPlus={openActionModal} />
      </div>
      {selectedAction && (
        <ActionModal action={selectedAction} onClose={closeActionModal} board={board} task={task} group={group} triggerRef={addButtonRef} />
      )}
    </section>
  );
}
