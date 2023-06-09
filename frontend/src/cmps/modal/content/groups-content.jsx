import { useState } from 'react'
import { updateBoard } from '../../../store/board.actions'
import { utilService } from '../../../services/util.service'

export function GroupsContent({ group, board, dispatch }) {
  const [showCopyListModal, setShowCopyListModal] = useState(false)

  async function deleteGroup() {
    const updatedGroups = board.groups.filter((g) => g.id !== group.id)
    const updatedBoard = { ...board, groups: updatedGroups }

    await dispatch(updateBoard(updatedBoard))
  }

  async function copyList() {
    const newListName = document.getElementById('newListNameInput').value

    const newList = { ...group, id: utilService.makeId(), title: newListName }

    const updatedBoard = { ...board, groups: [...board.groups, newList] }

    await dispatch(updateBoard(updatedBoard))

    setShowCopyListModal(false)
  }

  return (
    <div className="group-edit-modal">
      <div className="group-modal-top">
        <button onClick={() => setShowCopyListModal(true)}>Copy list...</button>
        <button>Add card...</button>
        <button>Move list...</button>
        <button>Watch</button>
      </div>
      <button>Sort by</button>
      <button onClick={deleteGroup}>Delete this list</button>
      <button>Add card...</button>

      {showCopyListModal && (
        <div className="copy-list-modal">
          <h3>Copy List</h3>
          <input
            type="text"
            id="newListNameInput"
            placeholder="Enter list name"
          />
          <button onClick={copyList}>Copy</button>
          <button onClick={() => setShowCopyListModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  )
}
