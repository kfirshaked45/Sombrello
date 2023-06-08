import React, { useState } from "react"
import { BsStop } from "react-icons/bs"
import { AiOutlineClockCircle } from "react-icons/ai"
import { utilService } from "../../services/util.service"

export function TaskDueDate({ dueDate, toggleIsDone }) {
  const [isHover, setIsHover] = useState(false)

  function getIsDoneClass() {
    if (dueDate.isDone) return "complete"
    if (utilService.hasTimestampPassed(dueDate.timeStamp)) return "overdue"
    return "due-soon"
  }

  function toggleDate(ev) {
    ev.stopPropagation()
    toggleIsDone(ev)
  }

  const isDoneClass = getIsDoneClass()

  if (dueDate.timeStamp === "") return null

  return (
    <div
      className={`indicator-due-date ${isDoneClass}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={(ev) => toggleDate(ev)}
    >
      <span className="flex">
        {isHover ? (
          <BsStop className="indicator-icon square" />
        ) : (
          <AiOutlineClockCircle className="indicator-icon clock" />
        )}
        <label>{utilService.formatDate(dueDate.timeStamp)}</label>
      </span>
    </div>
  )
}
