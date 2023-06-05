import React from "react"
import { IoIosCard } from "react-icons/io"

export const TaskTitle = ({ task, group }) => {
  return (
    <>
      <IoIosCard className="icon-title" />
      <div className="div-task-title">
        {task ? <h2>{task.title}</h2> : "Loading"}
        <p className="group-id">in list: {group.title}</p>
      </div>
    </>
  )
}