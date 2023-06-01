import { GroupPreview } from './group-preview';

export function GroupList({ board }) {
  const groups = board.groups;

  return (
    <div className="board-group-previews">
      <ul className="group-list">
        {groups.map((group) => (
          <li className="group-list-item" key={group.id}>
            {/* <Link to={group._id}> */}
            <GroupPreview boardId={board._id} group={group} />
            {/* </Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
