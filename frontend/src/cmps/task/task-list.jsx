import { TaskPreview } from "./task-preview"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { updateBoard } from "../../store/board.actions"
import { Link } from "react-router-dom"
import { TaskAdd } from "./task-add"

export function TaskList({ board, group }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const dispatch = useDispatch()

  const handleMouseEnter = (index) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <Droppable droppableId={`${group.id}`} type="TASK">
      {(provided) => (
        <ul
          className="task-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {group.tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <li
                  className="task-list-item"
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to={`${group.id}/${task.id}`}>
                    <TaskPreview groupId={group.id} task={task} />
                  </Link>
                  {hoveredIndex === index && (
                    <FontAwesomeIcon icon={faPen} className="task-pen" />
                  )}
                </li>
              )}
            </Draggable>
          ))}
          <TaskAdd board={board} group={group} />
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
}
