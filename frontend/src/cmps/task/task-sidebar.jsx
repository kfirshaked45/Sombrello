import { useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { BsTag } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { RiAttachment2 } from 'react-icons/ri';
import { ActionModal } from '../modal/action-modal';

export function TaskSidebar({ board }) {
  const [selectedAction, setSelectedAction] = useState(null);
  const compsToDoLater = [
    { id: 1, name: 'Members', icon: <IoPersonOutline /> },
    { id: 2, name: 'Labels', icon: <BsTag /> },
    { id: 3, name: 'Dates', icon: <AiOutlineClockCircle /> },
    { id: 4, name: 'Attachments', icon: <RiAttachment2 /> },
  ];
  const openActionModal = (action) => {
    setSelectedAction(action);
  };
  console.log(selectedAction);
  const closeActionModal = () => {
    setSelectedAction(null);
  };
  return (
    <div className="task-sidebar">
      <ul className="sidebar-list">
        {compsToDoLater.map((comp) => (
          <li
            key={comp.id}
            className="sidebar-item"
            onClick={() => {
              openActionModal(comp.name);
            }}
          >
            <span className="sidebar-icon">{comp.icon}</span>
            <span className="sidebar-title">{comp.name}</span>
          </li>
        ))}
        {selectedAction && <ActionModal action={selectedAction} onClose={closeActionModal} board={board} />}
      </ul>
    </div>
  );
}
