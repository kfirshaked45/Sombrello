import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { boardService } from "../../services/board.service.local"
import { TaskCover } from "./task-cover"
import { TaskAttachments } from "./task-attachments"
import { TaskSidebar } from "./task-sidebar"

import { IoIosCard } from "react-icons/io"

export function TaskDetails() {
  const { boardId, groupId, taskId } = useParams()

  const [board, setBoard] = useState()
  const [group, setGroup] = useState(null)
  const [task, setTask] = useState(null)

  useEffect(() => {
    loadTask()
  }, [])

  async function loadTask() {
    const loadedBoard = await boardService.getById(boardId)
    setBoard(loadedBoard)
    const loadedGroup = loadedBoard.groups.find((group) => group.id === groupId)
    setGroup(loadedGroup)
    const loadedTask = loadedGroup.tasks?.find((task) => task.id === taskId)
    setTask(loadedTask)
  }

  if (!task) {
    return (
      <div className="loading-text">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <section className="task-details">
      <TaskCover className="cover-component"></TaskCover>
      <div className="task-grid">
        <div className="task-column">
          
          <div className="div-task-title">
            <IoIosCard className="icon-title" />
            {task ? <h2>{task.title}</h2> : "Loading"}
            <div className="group-id">
              <p>in list: {group.title}</p>
            </div>
          </div>

          <div className="attachments-section">
            <TaskAttachments></TaskAttachments>
          </div>
        </div>
        <div className="task-sidebar">
          <TaskSidebar></TaskSidebar>
        </div>
      </div>
    </section>
  )
}
