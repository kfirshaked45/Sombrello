import { showErrorMsg } from '../services/event-bus.service'
import { BoardHeader } from '../cmps/board/board-header'
import { GroupList } from '../cmps/groups/group-list'
import { boardService } from '../services/board.service.local'
import {
  getActionUpdateBoard,
  loadBoards,
  updateBoard,
} from '../store/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { socketService } from '../services/socket.service.js'

export function BoardDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const boards = useSelector((state) => state.boardModule.boards)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const board = boards.find((b) => b._id === boardId)
  const [socketConnected, setSocketConnected] = useState(false)

  useEffect(() => {
    dispatch(loadBoards())
    socketService.setup() // Call the setup function before connecting

    socketService.on('connect', () => {
      setSocketConnected(true)
      socketService.emit('join-board', boardId) // Join the specific board room
    })

    socketService.on('disconnect', () => {
      setSocketConnected(false)
    })

    socketService.on('update-board', (updatedBoard) => {
      console.log(
        '🚀 ~ file: board-details.jsx:40 ~ socketService.on ~ updatedBoard:',
        updatedBoard
      )
      dispatch(getActionUpdateBoard(updatedBoard))
    })

    return () => {
      socketService.disconnect()
    }
  }, [boardId, dispatch])

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
    socketService.emit('update-board', board)
  }

  return (
    <main className="board" style={boardStyle}>
      <BoardHeader board={board} changeBackground={changeBackground} />
      <div className="board-details">
        <GroupList board={board} loggedInUser={loggedInUser} />
      </div>
      {socketConnected ? (
        <div>Socket connected</div>
      ) : (
        <div>Socket disconnected</div>
      )}
    </main>
  )
}
