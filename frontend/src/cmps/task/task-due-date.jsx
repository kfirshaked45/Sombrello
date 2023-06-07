import React, { useState } from "react"
import { BsStop } from "react-icons/bs"
import { AiOutlineClockCircle } from "react-icons/ai"
import { utilService } from "../../services/util.service"

export function TaskDueDate({ dueDate }) {
  const [isHovered, setIsHovered] = useState(false)
  let indicatorClass
  if (dueDate.isDone) {
    indicatorClass = "complete"
  } else if (utilService.hasTimestampPassed(dueDate.timeStamp)) {
    indicatorClass = "overdue"
  } else{
    indicatorClass = "due-soon"
  }

  console.log(indicatorClass);

  return (
    dueDate.timeStamp !== "" && (
      <li
        className={`indicator-due-date ${indicatorClass}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="flex">
          {isHovered && <BsStop className="indicator-icon square" />}
          {!isHovered && (
            <AiOutlineClockCircle className="indicator-icon clock" />
          )}
          <label>{utilService.formatDate(dueDate.timeStamp)}</label>
        </span>
      </li>
    )
  )
}
