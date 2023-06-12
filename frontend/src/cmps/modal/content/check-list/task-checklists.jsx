import { TaskSublist } from './task-sublist'

export function TaskChecklists({ task, boardId, groupId }) {
  // task.checklists (array)
  if (!task.checklists.length) return <></>
  return (
    <section className="task-details-checklists">
      {task.checklists.length &&
        task.checklists.map((checklist) => (
          <div key={checklist.id} className="task-checklist">
            <TaskSublist
              checklist={checklist}
              task={task}
              boardId={boardId}
              groupId={groupId}
            />
          </div>
        ))}
    </section>
  )
}
