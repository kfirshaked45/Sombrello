import React, { useState } from "react"
import { BsStop } from "react-icons/bs"
import { AiOutlineClockCircle } from "react-icons/ai"
import { utilService } from "../../services/util.service"

export function TaskDueDate({ dueDate }) {
  const [isHovered, setIsHovered] = useState(false)

  const getIndicatorClass = () => {
    if (dueDate.isDone) return "complete"
    if (utilService.hasTimestampPassed(dueDate.timeStamp)) return "overdue"
    return "due-soon"
  }

  const indicatorClass = getIndicatorClass()

  if (dueDate.timeStamp === "") return null

  return (
    <li
      className={`indicator-due-date ${indicatorClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="flex">
        {isHovered ? (
          <BsStop className="indicator-icon square" />
        ) : (
          <AiOutlineClockCircle className="indicator-icon clock" />
        )}
        <label>{utilService.formatDate(dueDate.timeStamp)}</label>
      </span>
    </li>
  )
}
