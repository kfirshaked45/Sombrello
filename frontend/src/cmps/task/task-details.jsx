import { useState, Fragment, useRef } from 'react'
import { useParams } from 'react-router-dom'
import 'animate.css'
import { TaskCover } from './details-components/task-cover'
import { BoardDetails } from '../../pages/board-details'
import { TaskGrid } from './details-components/task-grid'
import { useSelector } from 'react-redux'
import { TaskTitleEdit } from './details-components/task-title-edit'

export function TaskDetails() {
  const { boardId, groupId, taskId } = useParams()

  const boards = useSelector((state) => state.boardModule.boards)
  const board = boards.find((b) => b._id === boardId)
  const group = board.groups.find((g) => g.id === groupId)
  const task = group.tasks.find((t) => t.id === taskId)
  const members = task?.members ?? null
  const hasAttachments = task?.attachments?.length > 0

  const screenRef = useRef()

  const [coverImg, setCoverImg] = useState(null)
  if (!task) return <div>'NO TASK FOUND'</div>

  return (
    <Fragment>
      <BoardDetails />
      <section className="screen">
        <section
          ref={screenRef}
          className="task-details"
          onClick={(ev) => ev.stopPropagation()}
          aria-label={task.title}
        >
          <div className="task-details">
            <TaskCover
              className="cover-component"
              style={task.style}
              board={board}
              group={group}
              task={task}
            />
            <TaskTitleEdit
              task={task}
              board={board}
              taskId={taskId}
              group={group}
            />
            <TaskGrid
              members={members}
              task={task}
              board={board}
              group={group}
              hasAttachments={hasAttachments}
              setCoverImg={setCoverImg}
              coverImg={coverImg}
            />
          </div>
        </section>
      </section>
    </Fragment>
  )
}
