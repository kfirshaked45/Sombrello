import React from "react"
import { IoPersonOutline } from "react-icons/io5"
import { BsTag } from "react-icons/bs"
import { AiOutlineClockCircle } from "react-icons/ai"
import { RiAttachment2 } from "react-icons/ri"

export function TaskSidebar() {
  const compsToDoLater = [
    { id: 1, name: "Members", icon: <IoPersonOutline /> },
    { id: 2, name: "Labels", icon: <BsTag /> },
    { id: 3, name: "Dates", icon: <AiOutlineClockCircle /> },
    { id: 4, name: "Attachments", icon: <RiAttachment2 /> },
  ]

  return (
    <div className="task-sidebar">
      <ul className="sidebar-list">
        {compsToDoLater.map((comp) => (
          <li key={comp.id} className="sidebar-item">
            <span className="sidebar-icon">{comp.icon}</span>
            <span className="sidebar-title">{comp.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
