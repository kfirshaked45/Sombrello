import React from "react"
import { AiOutlineClose } from "react-icons/ai"
import { MdCallToAction } from "react-icons/md"

export function TaskCover() {
  return (
    <div className="task-cover">
      <div className="call-to-action">
        <MdCallToAction className="cta-icon" />
        <span className="cta-text">Cover</span>
      </div>
      <div className="close-task-details-btn">
        <AiOutlineClose />
      </div>
    </div>
  )
}
