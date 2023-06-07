import { showErrorMsg } from '../services/event-bus.service'
import { BoardHeader } from '../cmps/board/board-header'
import { GroupList } from '../cmps/groups/group-list'
import { boardService } from '../services/board.service.local'
import { loadBoards, updateBoard } from '../store/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export function BoardDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const boards = useSelector((state) => state.boardModule.boards)
  const board = boards.find((b) => b._id === boardId)

  useEffect(() => {
    dispatch(loadBoards())
  }, [dispatch])

  if (!board) return <div>Loading...</div>

  const getBoardStyle = () => {
    if (!board) return
    if (board?.style.background)
      return {
        background: `url('${board.style.background}') center center / cover`,
      }
    else if (board?.style.backgroundColor)
      return { backgroundColor: `${board.style.backgroundColor}` }
    // In case there are no background image and color
    return { backgroundColor: `pink` }
  }

  const boardStyle = getBoardStyle()

  const changeBackground = ({ background, backgroundColor, thumbnail }) => {
    board.style = { background, backgroundColor, thumbnail }
    dispatch(updateBoard(board))
  }

  return (
    <main className="board" style={boardStyle}>
      <BoardHeader board={board} changeBackground={changeBackground} />
      <div className="board-details">
        <GroupList board={board} />
      </div>
    </main>
  )
}
