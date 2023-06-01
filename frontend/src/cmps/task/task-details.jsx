import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

export function TaskDetails({ task }) {
const { boardId, groupId, taskId } = useParams()
console.log("dfgdfg");
//   const [title, setTitle] = useState(task.title)

//   const handleTitleChange = (event) => {
//     const newTitle = event.target.textContent
//     setTitle(newTitle)
//     // Update the task title using the newTitle value
//   }

  return (
    <div>
      <h1>Task Details</h1>
      {/* <h1>task._id</h1> */}
      <p>Board ID: {boardId}</p>
      <p>Group ID: {groupId}</p>
      <p>Task ID: {taskId}</p>
    </div>
  )
}
