import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export function BoardHeader({ board }) {
  return (
    <div className="border-header">
      <div>
        {board.title}
        <button>
          {/* <i class="fa-regular fa-star"></i> */}
          <FontAwesomeIcon icon={faStar} />
        </button>
        {/* <button>People Icon</button> */}
        <button> Board</button>
      </div>
      <div>
        <button>Filter</button>
      </div>
    </div>
  );
}
