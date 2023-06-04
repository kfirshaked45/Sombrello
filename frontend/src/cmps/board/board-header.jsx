import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEllipsis, faSliders } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { MemberModal } from './member-modal';

export function BoardHeader({ board }) {
  const members = board.members;
  const [selectedMember, setSelectedMember] = useState(null);

  const openModal = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };
  return (
    <div className="board-header">
      <div>
        {board.title}
        <button>
          {/* <i class="fa-regular fa-star"></i> */}
          <FontAwesomeIcon icon={faStar} />
        </button>
        {/* <button>People Icon</button> */}
        <button> Board</button>
      </div>
      <div className="board-header-right-container">
        <button className="filter-button">
          <FontAwesomeIcon icon={faSliders} />
          <span>Filter</span>
        </button>
        <div className="members-img">
          {members.map((member) => (
            <div key={member._id} onClick={() => openModal(member)}>
              <img src={member.imgUrl} alt="Member" />
            </div>
          ))}
        </div>
        {selectedMember && <MemberModal member={selectedMember} onClose={closeModal} />}
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
    </div>
  );
}
