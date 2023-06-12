import { Checklist } from './checklist';

export function TaskChecklists({ task, board, group }) {
  if (!task.checklists && task.checklists) return;
  return (
    <section className="task-details-checklists">
      {task.checklists.length &&
        task.checklists.map((checklist) => (
          <div key={checklist.id} className="task-checklist">
            <Checklist checklist={checklist} task={task} board={board} group={group} />
          </div>
        ))}
    </section>
  );
}
