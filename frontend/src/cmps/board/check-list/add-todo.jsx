import { useEffect, useRef, useState } from 'react'

export const AddTodo = ({ addTodo, checkListId, closeModal }) => {
  const [title, setTitle] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleChange = ({ target }) => {
    setTitle(target.value)
  }

  const onAddTodo = (ev) => {
    ev.preventDefault()
    addTodo(title, checkListId)
    setTitle('')
    inputRef.current.focus()
  }

  return (
    <section className="add-todo ">
      <form onSubmit={onAddTodo}>
        <input
          className="input"
          placeholder="Add an item"
          value={title}
          onChange={handleChange}
          ref={inputRef}
        />
        <section className="options">
          <button className="btn blue" type="submit">
            Add
          </button>
          <button className="btn" onClick={closeModal}>
            Cancel
          </button>
        </section>
      </form>
    </section>
  )
}
