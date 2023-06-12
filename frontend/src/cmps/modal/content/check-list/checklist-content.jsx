import { useState, useRef, useEffect } from 'react'

import { updateTask } from '../../../../store/board.actions'
import { utilService } from '../../../../services/util.service'

// pass task, groupId & boardId to these cmps from dynamic action modal
export function ChecklistContent({ task, boardId, groupId, onCloseModal }) {
  const [title, setTitle] = useState('Checklist')
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
    console.log(groupId, boardId)
  }, [])

  function handleChange({ target }) {
    if (target.name === 'title') {
      setTitle(target.value)
    }
  }

  async function onAddChecklist(ev) {
    ev.preventDefault()
    const checklist = {
      id: utilService.makeId(),
      title,
      todos: [],
    }
    const updatedTask = JSON.parse(JSON.stringify(task))
    if (!updatedTask.checklists) updatedTask.checklists = []
    updatedTask.checklists.push(checklist)
    await updateTask(updatedTask, boardId, groupId)
    onCloseModal()
  }

  return (
    <section className="checklist-content">
      <form onSubmit={onAddChecklist}>
        <label htmlFor="checklist-title">Title</label>
        <input
          value={title}
          onChange={handleChange}
          ref={inputRef}
          type="text"
          name="title"
          id="checklist-title"
        />
        <button>Add</button>
      </form>
    </section>
  )
}
