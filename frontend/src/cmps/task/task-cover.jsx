import React from "react"
import { AiOutlineClose } from "react-icons/ai"

export function TaskCover() {
  return (
    <div className="task-cover">
      <div className="content">Task Cover Content</div>
      <div className="close-task-details-btn">
        <AiOutlineClose />
      </div>
    </div>
  )
}
