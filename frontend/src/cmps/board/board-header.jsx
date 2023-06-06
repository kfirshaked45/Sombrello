import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faEllipsis,
  faSliders,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { ReactComponent as BoardIcon } from '../../assets/img/board/board-icon.svg'
import { ReactComponent as FilterIcon } from '../../assets/img/board/filter-icon.svg'
import { ReactComponent as EmptyStarIcon } from '../../assets/img/board/empty-star.svg'
import { ReactComponent as Member } from '../../assets/img/board/member-icon.svg'
import { ReactComponent as MembersIcon } from '../../assets/img/board/members-icon.svg'
import { ReactComponent as Pen } from '../../assets/img/board/pen-icon.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/board/share-icon.svg'
import { MemberModal } from '../modal/member-modal'

export function BoardHeader({ board }) {
  const members = board.members
  const [selectedMember, setSelectedMember] = useState(null)

  const openModal = (member) => {
    setSelectedMember(member)
  }

  const closeModal = () => {
    setSelectedMember(null)
  }
  return (
    <div className="board-header">
      <div className="board-header-left">
        {board.title}
        <button>
          <EmptyStarIcon />
        </button>
        <button>
          <MembersIcon />
        </button>
        <button>
          <BoardIcon /> Board
        </button>
      </div>
      <div className="board-header-right-container">
        <button className="filter-button">
          <FilterIcon />
          <span>Filter</span>
        </button>
        <div className="members-img">
          {members &&
            members.map((member) => (
              <div key={member._id} onClick={() => openModal(member)}>
                <img src={member.imgUrl} alt="Member" />
              </div>
            ))}
        </div>
        {selectedMember && (
          <MemberModal member={selectedMember} onClose={closeModal} />
        )}
        <button className="share-btn">
          <ShareIcon />
          Share
        </button>
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
    </div>
  )
}
