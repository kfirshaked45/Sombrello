import React from "react"

export function TaskSidebar() {
  // demo list of components to do later
  const compsToDoLater = [
    { id: 1, name: "Component 1" },
    { id: 2, name: "Component 2" },
    { id: 3, name: "Component 3" },
  ]

  return (
    <div className="task-sidebar">
      <h3>To Do Later</h3>
      {compsToDoLater.length > 0 ? (
        <ul>
          {compsToDoLater.map((comp) => (
            <li key={comp.id}>{comp.name}</li>
          ))}
        </ul>
      ) : (
        <p>No components to do later</p>
      )}
    </div>
  )
}
