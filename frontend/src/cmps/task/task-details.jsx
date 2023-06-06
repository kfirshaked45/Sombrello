import { useEffect, useState, Fragment, useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import 'animate.css'
import { boardService } from '../../services/board.service.local'
import { TaskCover } from './task-cover'
import { TaskAttachments } from './details/task-attachments'
import { TaskSidebar } from './task-sidebar'
import { MemberModal } from '../modal/member-modal'

import { IoIosCard } from 'react-icons/io'
import { TfiAlignLeft } from 'react-icons/tfi'
import { useSelector } from 'react-redux'
import { BsPlus } from 'react-icons/bs'
import { RxActivityLog } from 'react-icons/rx'
import { TaskLabels } from './details/task-labels'
import { TaskDescription } from './task-description'
import { loadBoards } from '../../store/board.actions'
import { BoardDetails } from '../../pages/board-details'
import { TaskDates } from './details/task-dates'
import { TaskProps } from './details/task-props'

export function TaskDetails() {
  const { boardId, groupId, taskId } = useParams()
  const boards = useSelector((state) => state.boardModule.boards)
  const board = boards.find((b) => b._id === boardId)
  const group = board.groups.find((g) => g.id === groupId)
  const task = group.tasks.find((t) => t.id === taskId)
  const members = task?.members ?? null
  const hasAttachments = task?.attachments?.length > 0

  const screenRef = useRef()
  const [selectedMember, setSelectedMember] = useState(null)
  if (!task) return <div>'NO TASK FOUND'</div>

  const onGoBack = (ev) => {
    Navigate(-1)
  }

  return (
    <Fragment>
      <BoardDetails />
      <section className="screen">
        <div onClick={onGoBack} className="backdrop"></div>
        <section className="task-details">
          <section
            ref={screenRef}
            className="task-details"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div className="task-details">
              <TaskCover className="cover-component" />
              <header className="div-task-title">
                <IoIosCard className="icon-title" />
                {task ? (
                  <h2 className="task title">{task.title}</h2>
                ) : (
                  'Loading'
                )}
                <div className="group-id">
                  <p>in list: {group.title}</p>
                </div>
              </header>
              <TaskProps
                members={members}
                selectedMember={selectedMember}
                task={task}
              />

              <div className="task-grid">
                <div className="task-column">
                  <TaskDescription description={task?.description} />

                  <div className="attachments-section">
                    <TaskAttachments attachments={task.attachments} />
                  </div>

                  <div className="div-activity">
                    <div className="activity">
                      <div className="icon">
                        <RxActivityLog />
                      </div>
                      <h2>Activity</h2>
                    </div>
                    <input
                      className="input-task-activity"
                      placeholder="Write a comment..."
                    />
                  </div>
                </div>
                <div className="task-sidebar">
                  <TaskSidebar
                    board={board}
                    group={group}
                    task={task}
                    hasAttachments={task?.attachments?.length > 0}
                    width={hasAttachments ? '100px' : '165px'}
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </Fragment>
  )
}
