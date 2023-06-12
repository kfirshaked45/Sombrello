import { useState, useRef } from 'react'
import { IoPersonOutline } from 'react-icons/io5'
import { BsTag, BsCheck2Square } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { RiAttachment2 } from 'react-icons/ri'
import { AiOutlineDelete } from 'react-icons/ai'
import { ActionModal } from '../../modal/action-modal'
import { updateBoard } from '../../../store/board.actions'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { browserHistory } from 'react-router'
import { MdCallToAction } from 'react-icons/md'

export function TaskSidebar({ board, task, group, hasAttachments, width }) {
  console.log(task)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedAction, setSelectedAction] = useState(null)
  const actionButtonRef = useRef(null)

  const sideBarChoices = [
    { id: 1, name: 'Members', icon: <IoPersonOutline /> },
    { id: 2, name: 'Labels', icon: <BsTag /> },
    { id: 3, name: 'Checklist', icon: <BsCheck2Square /> },
    { id: 4, name: 'Dates', icon: <AiOutlineClockCircle /> },
    { id: 5, name: 'Attachments', icon: <RiAttachment2 /> },
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

    navigate(`/board/${board._id}`)
    await dispatch(updateBoard(updatedBoard))
  }

  return (
    <div className={`task-sidebar ${hasAttachments ? 'has-attachments' : ''}`}>
      <ul className="sidebar-list">
        <p> Add to card</p>
        {sideBarChoices.map((comp, index) => (
          <li
            key={comp.id}
            className="sidebar-item"
            style={{ width: width }}
            onClick={() => {
              openActionModal(comp.name)
            }}
            ref={actionButtonRef}
            tabIndex={0}
          >
            <span className="sidebar-icon">{comp.icon}</span>
            <span className="sidebar-title">{comp.name}</span>
          </li>
        ))}

        {Object.keys(task.style).length === 0 && (
          <button
            className="sidebar-item"
            onClick={() => {
              openActionModal('Cover')
            }}
          >
            <span className="sidebar-icon">
              <MdCallToAction className="cta-icon" />
            </span>
            <span className="sidebar-title" ref={actionButtonRef}>
              Cover
            </span>
          </button>
        )}

        <p>Actions</p>
        <button
          className="sidebar-item delete-task-btn general-btn-styling"
          style={{ width: width }}
          onClick={() => {
            deleteTask()
          }}
        >
          <AiOutlineDelete className="sidebar-icon" />
          Delete
        </button>
      </ul>
      {selectedAction && (
        <ActionModal
          action={selectedAction}
          onClose={closeActionModal}
          board={board}
          task={task}
          group={group}
          triggerRef={actionButtonRef}
        />
      )}
    </div>
  )
}
