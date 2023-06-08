import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router'
import { removeBoard } from '../../../store/board.actions'
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import '../../../assets/styles/cmps/board/_confirm-alert.scss'
import 'react-confirm-alert/src/react-confirm-alert.css'

export const SideMenuMainDisplay = ({ onChangeTitle }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false) // Track if confirmation dialog is open

  const match = useMatch('/board/:boardId')
  const boardId = match?.params?.boardId
  const boards = useSelector((state) => state.boardModule.boards)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemoveBoard = async (boardId) => {
    setIsConfirmationOpen(true) // Open the confirmation dialog

    confirmAlert({
      title: 'Confirm Removal',
      message:
        'Are you sure you want to remove this board? All of your data will be lost',
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
            setIsConfirmationOpen(false) // Close the confirmation dialog if user clicks "No"
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
