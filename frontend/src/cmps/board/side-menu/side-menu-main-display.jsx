import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router'
import { removeBoard } from '../../../store/board.actions'
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import '../../../assets/styles/cmps/board/_confirm-alert.scss'
import 'react-confirm-alert/src/react-confirm-alert.css'

export const SideMenuMainDisplay = ({ onChangeTitle }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  const match = useMatch('/board/:boardId')
  const boardId = match?.params?.boardId
  const boards = useSelector((state) => state.boardModule.boards)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemoveBoard = async (boardId) => {
    setIsConfirmationOpen(true)

    confirmAlert({
      title: 'Confirm Removal',
      message:
        'Are you absolutely sure you want to delete this board? Please note that this action cannot be undone, and all of your data will be permanently lost.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await dispatch(removeBoard(boardId))
              console.log('Board removed successfully')
              navigate('/workspace')
            } catch (err) {
              console.log('Error removing board:', err)
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
            setIsConfirmationOpen(false)
          },
        },
      ],
      // Custom callback function to handle closing the confirmation dialog
      // and enabling user interface elements
      closeOnClickOutside: false,
      onClose: () => {
        setIsConfirmationOpen(false)
      },
    })
  }

  return (
    <section className="side-menu-main-display">
      <section className="board-menu-content-frame">
        <button onClick={() => onChangeTitle('Change background')}>
          Change background
        </button>
        {boards.map((board) => (
          <div key={board._id}>
            {board._id === boardId && (
              <button
                onClick={() => handleRemoveBoard(board._id)}
                disabled={isConfirmationOpen}
              >
                Remove Board
              </button>
            )}
          </div>
        ))}
      </section>
    </section>
  )
}
