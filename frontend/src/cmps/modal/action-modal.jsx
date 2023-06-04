import React from 'react';
import { ReactComponent as XIcon } from '../../assets/img/board/x-icon.svg';
import { ReactComponent as PenIcon } from '../../assets/img/board/pen-icon.svg';

function ActionContent({ action, board }) {
  if (action === 'Members') {
    return (
      <div className="action-modal-content">
        <input type="text" placeholder="Search members" className="search-members-input" />
        <ul className="action-member-list">
          <h4>Board members</h4>
          {board.members.map((member) => (
            <li key={member._id}>
              <button className="action-member">
                <img src={`${member.imgUrl}`} alt="picture" />
                {member.fullname}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (action === 'Labels') {
    console.log(board);
    return (
      <div>
        <input type="text" placeholder="Search members" className="search-labels-input" />
        <div>
          {board.labels.map((label) => (
            <div className="action-label-container">
              <input type="checkbox" />
              <div key={label.id} style={{ backgroundColor: label.color }}>
                {label.title}
              </div>
              <PenIcon />
            </div>
          ))}
        </div>
        <button>Create a new label</button>
      </div>
    );
  } else if (action === 'Dates') {
    return (
      <div className="action-modal-content">
        <input type="date" className="date-input" />
      </div>
    );
  } else if (action === 'Attachments') {
    return <div>Attachments Content</div>;
  } else {
    return <div>Invalid action.</div>;
  }
}

export function ActionModal({ action, onClose, board }) {
  return (
    <div className="action-modal">
      <div className="action-header">
        <div>{action}</div>

        <XIcon onClick={onClose} className="action-modal-x" />
      </div>

      <ActionContent action={action} board={board} />
    </div>
  );
}
