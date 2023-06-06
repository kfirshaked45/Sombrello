import { updateBoard } from '../../../store/board.actions';

export function GroupsContent({ group, board, dispatch }) {
  async function deleteGroup() {
    const updatedGroups = board.groups.filter((g) => g.id !== group.id);
    const updatedBoard = { ...board, groups: updatedGroups };

    await dispatch(updateBoard(updatedBoard));
  }

  return (
    <div className="group-edit-modal">
      <div className="group-modal-top">
        <button>Copy list...</button>
        <button>Add card...</button>
        <button>Move list...</button>
        <button>Watch</button>
      </div>
      {/* <div> */}

      <button>Sort by</button>
      {/* </div> */}
      <button onClick={deleteGroup}>Delete this list</button>
      <button>Add card...</button>
    </div>
  );
}
