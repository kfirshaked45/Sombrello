import { useRef, useState, useEffect } from 'react'
import { BoardPreview } from './board-preview'
import { CreateBoard } from './create-board'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../../services/board.service.local'
import { loadBoards } from '../../store/board.actions'

export const BoardList = ({
  boards,
  onToggleStarred,
  newBoardPlaceholder,
  onOpenActionModal,
  handleBoardClick,
}) => {
  const board = useSelector((state) => state.boardModule.board)
  const dispatch = useDispatch()

  useEffect(() => {
    boardService.createDemoBoard()
    if (board) dispatch({ type: 'SET_BOARD', boardId: null })
    dispatch(loadBoards())
  }, [])
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
      {boards.map((board) => (
        <BoardPreview
          key={board._id}
          board={board}
          onToggleStarred={onToggleStarred}
        />
      ))}
      {newBoardPlaceholder && (
        <div onClick={handleCreateBoardClick} className="new-board">
          Create new board
        </div>
      )}
      {showCreateBoard && (
        <CreateBoard setActionModal={handleCreateBoardClose} />
      )}
    </section>
  )
}
