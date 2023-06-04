import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { boardService } from "../../services/board.service.local"
import { TaskCover } from "./task-cover"
import { TaskAttachments } from "./task-attachments"
import { TaskSidebar } from "./task-sidebar"
import { MemberModal } from "../board/member-modal"

import { IoIosCard } from "react-icons/io"
import { BsPlus } from "react-icons/bs"
import { RxActivityLog } from "react-icons/rx"
import { TaskLabels } from "./task-labels"



export function TaskDetails() {
  const { boardId, groupId, taskId } = useParams()

  const [board, setBoard] = useState()
  const [group, setGroup] = useState(null)
  const [task, setTask] = useState(null)

  useEffect(() => {
    loadTask()
  }, [])

  const members = board?.members
  const [selectedMember, setSelectedMember] = useState(null)



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
  console.log(task.labels);


  return (
    <section className="task-details">
      <TaskCover className="cover-component"></TaskCover>
      <section className="task-props">
        {
          <div className="members-wrapper">
            <h5>Members</h5>
            <div className="members">
              <div className="members-img">
                {members.map((member) => (
                  <div key={member._id}>
                    <img src={member.imgUrl} alt="Member" />
                  </div>
                ))}
              </div>
              {selectedMember && (
                <MemberModal member={selectedMember}/>
              )}
              <button className="add-member">
                <BsPlus />
              </button>
            </div>
          </div>
        }

        {
          <div className="labels-wrapper">
            <h5>Labels</h5>
            <div className="labels">
              {/* <TaskLabels labels={task?.labels}/> */}
              <button className="add-label">
                <BsPlus />
              </button>
            </div>
          </div>
        }
      </section>

      <div className="task-grid">
        <div className="task-column">
          <header className="div-task-title">
            <IoIosCard className="icon-title" />
            {task ? <h2 className="task title">{task.title}</h2> : "Loading"}
            <div className="group-id">
              <p>in list: {group.title}</p>
            </div>
          </header>

          <div className="attachments-section">
            <TaskAttachments></TaskAttachments>
          </div>

          <div className="div-activity">
          <RxActivityLog/>
            <h2>Activity</h2>
            <input
              className="input-task-activity"
              placeholder="Write a comment..."
            ></input>
          </div>
        </div>
        <div className="task-sidebar">
          <TaskSidebar></TaskSidebar>
        </div>
      </div>
    </section>
  )
}
