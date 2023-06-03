import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEllipsis } from '@fortawesome/free-solid-svg-icons';

export function BoardHeader({ board }) {
  const members = board.members;
  console.log(members);
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
        <button>Filter</button>
        <div className="members-img">
          {members.map((member) => (
            <img src={`${member.imgUrl}`} alt="alter" />
          ))}
        </div>
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
    </div>
  );
}
