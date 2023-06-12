import { useState } from 'react'
import { GrClose } from 'react-icons/gr'

export const EditTodo = ({ todo, editTodo, toggleIsEditOpen }) => {
  const [title, setTitle] = useState(todo.title)

  const handleChange = ({ target }) => {
    setTitle(target.value)
  }

  const onEditTodo = (ev) => {
    if (ev) ev.preventDefault()
    todo.title = title
    editTodo(todo)
    toggleIsEditOpen()
  }

  const handleUserKeyPress = (ev) => {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      onEditTodo()
    }
  }

  return (
    <section className="edit-todo">
      <form onSubmit={onEditTodo}>
        <textarea
          type="text"
          className="input"
          value={title}
          onChange={handleChange}
          onKeyDown={handleUserKeyPress}
        ></textarea>
        <section className="options">
          <button className="btn blue">Save</button>
          <GrClose onClick={toggleIsEditOpen} />
        </section>
      </form>
    </section>
  )
}
