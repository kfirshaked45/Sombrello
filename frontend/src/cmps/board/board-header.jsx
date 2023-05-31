export function BoardHeader({ board }) {
  return (
    <div className="border-header">
      <div>
        {board.title} <button>Star Icon</button> <button>People Icon</button> <button> Board</button>
      </div>
      <div>
        <button>Filter</button>
      </div>
    </div>
  );
}
