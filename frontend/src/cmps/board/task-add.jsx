import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons'
import { utilService } from '../../services/util.service'
import { updateBoard } from '../../store/board.actions'

export function TaskAdd({ board, group, tasks }) {
  const [isEditable, setIsEditable] = useState(false)
  const dispatch = useDispatch()
  const taskInputRef = useRef(null)
  const [task, setTask] = useState('')

  useEffect(() => {
    setTask('')
  }, [group])

  function handleChange(ev) {
    setTask(ev.target.value)
  }

  function handleSubmit() {
    const taskTitle = task.trim()
    if (!taskTitle) return

    const newTask = {
      id: utilService.makeId(),
      title: taskTitle,
      style: {},
    }

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        return {
          ...g,
          tasks: [...g.tasks, newTask],
        }
      }
      return g
    })

    const updatedBoard = { ...board, groups: updatedGroups }
    dispatch(updateBoard(updatedBoard))

    setIsEditable(false)
    setTask('')
  }

  function handleAddCard() {
    setIsEditable(true)
    setTask('')
    setTimeout(() => {
      taskInputRef.current.focus()
    }, 0)
  }

  function handleKeyDown(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      handleSubmit()
    } else if (ev.key === 'Escape') {
      setIsEditable(false)
      setTask('')
    }
  }

  return (
    <div>
      {isEditable ? (
        <div className="card-composer">
          <div className="card-composer-textarea-container">
            <textarea
              ref={taskInputRef}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={task}
              placeholder="Enter a title for this card..."
              className="card-composer-textarea"
            ></textarea>
          </div>
          <div className="card-composer-buttons">
            <button onClick={handleSubmit} className="card-composer-add-btn">
              Add card
            </button>
            <button onClick={() => setIsEditable(false)}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <button className="open-card-composer-btn" onClick={handleAddCard}>
            <FontAwesomeIcon icon={faPlus} className="open-card-plus" />
            Add a card
          </button>
        </div>
      )}
    </div>
  )
}
