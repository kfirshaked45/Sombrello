import { TodoPreview } from './todo-preview'

export const TodoList = ({ todos, checkListId, updateTodo, removeTodo }) => {
  return (
    <section className="todo-list">
      {todos.map((todo) => (
        <TodoPreview
          key={todo.id}
          todo={todo}
          checkListId={checkListId}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
        />
      ))}
    </section>
  )
}
