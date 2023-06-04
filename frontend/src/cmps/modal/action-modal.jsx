import React from 'react';

function ActionContent({ action, board }) {
  if (action === 'Members') {
    console.log(board.members);

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
    return <div>Labels Content</div>;
  } else if (action === 'Dates') {
    return <div>Dates Content</div>;
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
        <span onClick={onClose}>X</span>
      </div>

      <ActionContent action={action} board={board} />
    </div>
  );
}
