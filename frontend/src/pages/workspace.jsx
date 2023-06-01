// workspace.jsx

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards } from '../store/board.actions'
import { BsFillPersonFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { BoardIndex } from './board-index'

export function Workspace() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadBoards())
  }, [])

  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`)
  }

  return (
    <section className="workspace">
      <section className="all-boards">
        <div className="title">
          <BsFillPersonFill className="title-icon" />
          <h3>Your boards</h3>
        </div>
        <div className="boards-container">
          <BoardIndex handleBoardClick={handleBoardClick} />
        </div>
      </section>
    </section>
  )
}
