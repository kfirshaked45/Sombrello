export function GroupTask({ task }) {
  return (
    <div className="group-task">
      <textarea value={task.title}></textarea>
      {/* <p>{task.status}</p>
      <p>{task.priority}</p> */}
      {/* <p>{task.byMember.fullname}</p> */}
    </div>
  );
}
