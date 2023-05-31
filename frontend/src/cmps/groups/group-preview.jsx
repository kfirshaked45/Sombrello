import { GroupTask } from './group-task';

export function GroupPreview({ group }) {
  return (
    <div>
      <div className="group-list-header">
        <p>{group.title} </p>
        <p>...</p>
      </div>

      {group.tasks.map((task) => (
        <GroupTask task={task} />
      ))}
    </div>
  );
}
