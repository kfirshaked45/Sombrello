import { useState } from 'react'
import { BsCheck2Square } from 'react-icons/bs'
import { AddTodo } from './add-todo'
import { EditTitle } from '../global/edit-title'
import { TodoList } from './todo-list'

export const ChecklistPreview = ({
  checkList,
  updateTodo,
  removeChecklist,
  addTodo,
  updateChecklist,
  removeTodo,
}) => {
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false)
  const [isEditTitleOpen, setIsEditTitleOpen] = useState(false)

  const onAddTodo = () => {
    setIsAddTodoOpen(!isAddTodoOpen)
  }

  const editTitle = (title) => {
    checkList.title = title
    updateChecklist(checkList)
  }

  const toggleTitleEdit = () => {
    setIsEditTitleOpen(!isEditTitleOpen)
  }

  const getCompletionPercentage = () => {
    const todosLength = checkList.todos.length
    if (todosLength === 0) return 0
    const completedTodosLength = checkList.todos.filter(
      (todo) => todo.isDone
    ).length

    return ((completedTodosLength * 100) / todosLength).toFixed(0)
  }

  const completionPercentage = getCompletionPercentage()

  return (
    <section className="checklist-preview">
      <section className="checklist-header">
        <section className="left">
          <BsCheck2Square />
          {isEditTitleOpen ? (
            <EditTitle
              editTitle={editTitle}
              itemTitle={checkList.title}
              toggleTitleEdit={toggleTitleEdit}
            />
          ) : (
            <h3 onClick={toggleTitleEdit}>{checkList.title}</h3>
          )}
        </section>
        {!isEditTitleOpen && (
          <section className="right">
            <button
              className="button-link"
              onClick={() => removeChecklist(checkList.id)}
            >
              Delete
            </button>
          </section>
        )}
      </section>
      <section className="checklist-status">
        <p>{`${completionPercentage}%`}</p>
        <div className="completion-bar">
          <div
            className={`percentage-bar ${
              completionPercentage === '100' ? 'done' : ''
            }`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </section>
      {checkList.todos && checkList.todos.length > 0 && (
        <TodoList
          todos={checkList.todos}
          checkListId={checkList.id}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
        />
      )}
      <section className="add-todo-option">
        {isAddTodoOpen ? (
          <AddTodo
            addTodo={addTodo}
            checkListId={checkList.id}
            closeModal={onAddTodo}
          />
        ) : (
          <button className="add-todo-button" onClick={onAddTodo}>
            Add an item
          </button>
        )}
      </section>
    </section>
  )
}
