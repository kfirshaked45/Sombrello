import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function BoardHeader({ board }) {
  return (
    <div className="border-header">
      <div>
        {board.title} <FontAwesomeIcon icon="fa-brands fa-twitter" />
        <button>Star Icon</button> <button>People Icon</button> <button> Board</button>
      </div>
      <div>
        <button>Filter</button>
      </div>
    </div>
  );
}
