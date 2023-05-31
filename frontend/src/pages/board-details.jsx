import { BoardHeader } from '../cmps/board/board-header';
import { GroupList } from '../cmps/groups/group-list';

export function BoardDetails() {
  // need top header for board
  // map all the groups(notes) into the div

  return (
    <div>
      <BoardHeader />
      <div>
        <GroupList />
      </div>
    </div>
  );
}
