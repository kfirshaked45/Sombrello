import { useDispatch } from 'react-redux'
import { updateTask, addNewTodo } from '../../../store/board.actions'
import { ChecklistPreview } from './check-list-preview'

export const CheckListList = ({ task, groupId }) => {
  const dispatch = useDispatch()

  const removeChecklist = (checklistId) => {
    const checklistTitle = task.checklists.find(
      (checklist) => checklist.id === checklistId
    ).title
    const taskTitle = task.title
    task.checklists = task.checklists.filter(
      (checklist) => checklist.id !== checklistId
    )
    dispatch(
      updateTask(groupId, task, `removed ${checklistTitle} from ${taskTitle}`)
    )
  }

  const updateChecklist = (editedChecklist) => {
    task.checklists = task.checklists.filter((checklist) =>
      checklist.id === editedChecklist.id ? editedChecklist : checklist
    )
    dispatch(updateTask(groupId, task))
  }

  const addTodo = (title, checkListId) => {
    dispatch(addNewTodo(title, checkListId, task.id, groupId))
  }

  const updateTodo = (editedTodo, checkListId) => {
    const checkList = task.checklists.find(
      (checkList) => checkList.id === checkListId
    )
    checkList.todos = checkList.todos.filter((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    )
    dispatch(updateTask(groupId, task))
  }

  const removeTodo = (todoId, checkListId) => {
    const checkList = task.checklists.find(
      (checkList) => checkList.id === checkListId
    )
    checkList.todos = checkList.todos.filter((todo) => todo.id !== todoId)
    dispatch(updateTask(groupId, task))
  }

  return (
    <section className="checklist-list">
      {task.checklists.map((checkList) => (
        <ChecklistPreview
          key={checkList.id}
          checkList={checkList}
          updateTodo={updateTodo}
          addTodo={addTodo}
          removeChecklist={removeChecklist}
          updateChecklist={updateChecklist}
          removeTodo={removeTodo}
        />
      ))}
    </section>
  )
}
