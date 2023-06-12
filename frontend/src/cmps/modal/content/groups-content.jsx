import { useState } from 'react';
import { updateBoard } from '../../../store/board.actions';
import { utilService } from '../../../services/util.service';

export function GroupsContent({ group, board, dispatch }) {
  const [showCopyListModal, setShowCopyListModal] = useState(false);
  const [groupSortOrder, setGroupSortOrder] = useState({ [group.id]: 'asc' });

  async function deleteGroup() {
    const updatedGroups = board.groups.filter((currentGroup) => currentGroup.id !== group.id);
    const updatedBoard = { ...board, groups: updatedGroups };

    await dispatch(updateBoard(updatedBoard));
  }

  async function copyList() {
    const newListName = document.getElementById('newListNameInput').value;

    const newList = { ...group, id: utilService.makeId(), title: newListName };

    const updatedBoard = { ...board, groups: [...board.groups, newList] };

    await dispatch(updateBoard(updatedBoard));

    setShowCopyListModal(false);
  }

  function sortByTaskTitle(groupId) {
    const currentSortOrder = groupSortOrder[groupId];
    const newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    setGroupSortOrder((prevGroupSortOrder) => ({
      ...prevGroupSortOrder,
      [groupId]: newSortOrder,
    }));

    const sortedGroups = board.groups.map((group) => {
      if (group.id === groupId) {
        const sortedTasks = [...group.tasks];
        sortedTasks.sort((a, b) => {
          const taskTitleA = a.title.toLowerCase();
          const taskTitleB = b.title.toLowerCase();
          if (groupSortOrder[groupId] === 'asc') {
            return taskTitleA.localeCompare(taskTitleB);
          } else {
            return taskTitleB.localeCompare(taskTitleA);
          }
        });
        return { ...group, tasks: sortedTasks };
      }
      return group;
    });

    const updatedBoard = { ...board, groups: sortedGroups };
    dispatch(updateBoard(updatedBoard));
  }

  return (
    <div className="group-edit-modal pop-over-content">
      <div className="group-modal-top">
        <button onClick={() => setShowCopyListModal(true)}>Copy list...</button>
        {/* <button>Add card...</button>
        <button>Move list...</button> */}
        {/* <button>Watch</button> */}
      </div>
      <button onClick={() => sortByTaskTitle(group.id)}>Sort by Task Title</button>

      <button onClick={deleteGroup}>Delete this list</button>

      {showCopyListModal && (
        <div>
          <hr></hr>
          <h3>Copy List</h3>
          <input type="text" id="newListNameInput" placeholder="Enter list name" />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="general-btn-styling" onClick={copyList}>
              Copy
            </button>
            <button className="general-btn-styling" onClick={() => setShowCopyListModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
