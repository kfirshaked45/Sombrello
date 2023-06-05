import { useState } from 'react'
import { IoPersonOutline } from 'react-icons/io5'
import { BsTag } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { RiAttachment2 } from 'react-icons/ri'
import { ActionModal } from '../modal/action-modal'
import { updateBoard } from '../../store/board.actions'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { browserHistory } from 'react-router'

export function TaskSidebar({ board, task, group, hasAttachments, width }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedAction, setSelectedAction] = useState(null)
  const compsToDoLater = [
    { id: 1, name: 'Members', icon: <IoPersonOutline /> },
    { id: 2, name: 'Labels', icon: <BsTag /> },
    { id: 3, name: 'Dates', icon: <AiOutlineClockCircle /> },
    { id: 4, name: 'Attachments', icon: <RiAttachment2 /> },
  ]
  const openActionModal = (action) => {
    setSelectedAction(action)
  }
  const closeActionModal = () => {
    setSelectedAction(null)
  }
  async function deleteTask() {
    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.filter((t) => t.id !== task.id)
        return {
          ...g,
          tasks: updatedTasks,
        }
      }
      return g
    })

    const updatedBoard = { ...board, groups: updatedGroups }

    await dispatch(updateBoard(updatedBoard))
    navigate(`/board/${board._id}`)
  }

  return (
    <div className={`task-sidebar ${hasAttachments ? 'has-attachments' : ''}`}>
      <ul className="sidebar-list">
        {compsToDoLater.map((comp) => (
          <li
            key={comp.id}
            className="sidebar-item"
            style={{ width: width }}
            onClick={() => {
              openActionModal(comp.name)
            }}
          >
            <span className="sidebar-icon">{comp.icon}</span>
            <span className="sidebar-title">{comp.name}</span>
          </li>
        ))}
        {selectedAction && (
          <ActionModal
            action={selectedAction}
            onClose={closeActionModal}
            board={board}
            task={task}
            group={group}
          />
        )}

        <button
          className="sidebar-item"
          style={{ width: width }}
          onClick={() => {
            deleteTask()
          }}
        >
          Delete Task
        </button>
      </ul>
    </div>
  )
}
