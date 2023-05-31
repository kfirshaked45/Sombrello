export function GroupTask({ task }) {
    
  console.log(task);
  return (
    <div className="group-task">
      <p>{task.title}</p>
      {/* <p>{task.status}</p>
      <p>{task.priority}</p> */}
      {/* <p>{task.byMember.fullname}</p> */}
    </div>
  );
}
