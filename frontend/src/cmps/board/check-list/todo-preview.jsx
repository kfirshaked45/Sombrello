import { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { EditTitle } from '../../general/edit-title'

export const TodoPreview = ({ todo, checkListId, updateTodo, removeTodo }) => {
  const [isEditTitleOpen, setIsEditTitleOpen] = useState(false)

  const toggleTitleEdit = () => {
    setIsEditTitleOpen(!isEditTitleOpen)
  }

  const onChangeTodoDone = () => {
    todo.isDone = !todo.isDone
    updateTodo(todo, checkListId)
  }

  const editTitle = (title) => {
    todo.title = title
    updateTodo(todo, checkListId)
  }

  const onRemoveTodo = (ev) => {
    ev.stopPropagation()
    removeTodo(todo.id, checkListId)
  }

  return (
    <section className="todo-preview">
      <label htmlFor={todo.id} className="checkbox-container">
        <input
          className="checkbox"
          id={todo.id}
          type="checkbox"
          checked={todo.isDone}
          onChange={onChangeTodoDone}
        />
        <span className="checkmark"></span>
      </label>

      {isEditTitleOpen ? (
        <EditTitle
          itemTitle={todo.title}
          editTitle={editTitle}
          toggleTitleEdit={toggleTitleEdit}
        />
      ) : (
        <section className="title" onClick={toggleTitleEdit}>
          <p className={todo.isDone ? 'crossed-out' : ''}>{todo.title}</p>
          <button className="close-btn" onClick={onRemoveTodo}>
            <BsThreeDots />
          </button>
        </section>
      )}
    </section>
  )
}
