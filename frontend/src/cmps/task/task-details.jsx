import { useParams, useLocation } from "react-router-dom"

export function TaskDetails() {
  const { boardId, groupId, taskId } = useParams()
  const location = useLocation()
  const { task } = location.state || {} // Provide a default value for task if it is null

  return (
    <div>
      <h1>Task Details</h1>
      {task && (
        <div>
          <h1>{task.id}</h1>
          <p>Task ID: {taskId}</p>
          <p>Group ID: {groupId}</p>
          <p>Board ID: {boardId}</p>
        </div>
      )}
    </div>
  )
}
