import { useRef, useState } from 'react'
import { BoardPreview } from './board-preview'
import { CreateBoard } from './create-board'

export const BoardList = ({
  boards,
  onToggleStarred,
  newBoardPlaceholder,
  onOpenActionModal,
}) => {
  const btnAddBoardRef = useRef()
  const [showCreateBoard, setShowCreateBoard] = useState(false)

  const handleCreateBoardClick = () => {
    setShowCreateBoard(true)
  }

  const handleCreateBoardClose = () => {
    setShowCreateBoard(false)
  }

  return (
    <section className="board-list">
      {newBoardPlaceholder && (
        <div onClick={handleCreateBoardClick} className="new-board">
          Create new board
        </div>
      )}
      {showCreateBoard && (
        <CreateBoard setActionModal={handleCreateBoardClose} />
      )}
      {boards.map((board) => (
        <BoardPreview
          key={board._id}
          board={board}
          onToggleStarred={onToggleStarred}
        />
      ))}
    </section>
  )
}
