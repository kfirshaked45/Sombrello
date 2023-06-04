import React from "react"

import { useNavigate } from "react-router-dom"

import { AiOutlineClose } from "react-icons/ai"
import { MdCallToAction } from "react-icons/md"


export function TaskCover() {
  const navigate = useNavigate()
  
  function onTaskClose() {
    navigate(-1)
  }
  
  return (
    <div className="task-cover">
      <div className="call-to-action">
        <MdCallToAction className="cta-icon" />
        <span className="cta-text">Cover</span>
      </div>
      <div className="close-task-details-btn" onClick={() => onTaskClose()}>
        <AiOutlineClose />
      </div>
    </div>
  )
}
