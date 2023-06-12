import { useEffect, useRef, useState } from 'react';
import { utilService } from '../../../../services/util.service';
import { updateBoard } from '../../../../store/board.actions';
import { useDispatch } from 'react-redux';

export function Checklist({ checklist, task, board, group }) {
  console.log(checklist);
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const [todoTitle, setTodoTitle] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const todo = {
      id: utilService.makeId(),
      title: todoTitle,
      isDone: isDone,
    };

    const updatedChecklist = { ...checklist };
    updatedChecklist.todos.push(todo);

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            const updatedChecklists = t.checklists.map((c) => {
              if (c.id === checklist.id) {
                return updatedChecklist;
              }
              return c;
            });
            return {
              ...t,
              checklists: updatedChecklists,
            };
          }
          return t;
        });

        return {
          ...g,
          tasks: updatedTasks,
        };
      }
      return g;
    });

    const updatedBoard = { ...board, groups: updatedGroups };
    setTodoTitle('');
    setIsEditable(true);
    inputRef.current.focus();
    dispatch(updateBoard(updatedBoard));
  }

  async function handleCheckboxChange(todoId) {
    const updatedBoard = { ...board };
    const groupIndex = updatedBoard.groups.findIndex((g) => g.id === group.id);
    if (groupIndex !== -1) {
      const taskIndex = updatedBoard.groups[groupIndex].tasks.findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        const checklistIndex = updatedBoard.groups[groupIndex].tasks[taskIndex].checklists.findIndex((c) => c.id === checklist.id);
        if (checklistIndex !== -1) {
          const todoIndex = updatedBoard.groups[groupIndex].tasks[taskIndex].checklists[checklistIndex].todos.findIndex(
            (t) => t.id === todoId
          );
          if (todoIndex !== -1) {
            updatedBoard.groups[groupIndex].tasks[taskIndex].checklists[checklistIndex].todos[todoIndex].isDone =
              !updatedBoard.groups[groupIndex].tasks[taskIndex].checklists[checklistIndex].todos[todoIndex].isDone;
            dispatch(updateBoard(updatedBoard));
          }
        }
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !todoTitle.trim()) {
      e.preventDefault();
    }
  }

  function handleBlur(ev) {
    ev.preventDefault();
    setTodoTitle('');
    setIsEditable(false);
  }

  async function handleTodoDelete(todoId) {
    const updatedBoard = { ...board };
    const groupIndex = updatedBoard.groups.findIndex((g) => g.id === group.id);
    if (groupIndex !== -1) {
      const taskIndex = updatedBoard.groups[groupIndex].tasks.findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        const checklistIndex = updatedBoard.groups[groupIndex].tasks[taskIndex].checklists.findIndex((c) => c.id === checklist.id);
        if (checklistIndex !== -1) {
          updatedBoard.groups[groupIndex].tasks[taskIndex].checklists[checklistIndex].todos = updatedBoard.groups[groupIndex].tasks[
            taskIndex
          ].checklists[checklistIndex].todos.filter((t) => t.id !== todoId);
          dispatch(updateBoard(updatedBoard));
        }
      }
    }
  }

  async function handleDelete() {
    const updatedBoard = { ...board };
    const groupIndex = updatedBoard.groups.findIndex((g) => g.id === group.id);
    if (groupIndex !== -1) {
      const taskIndex = updatedBoard.groups[groupIndex].tasks.findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        updatedBoard.groups[groupIndex].tasks[taskIndex].checklists = updatedBoard.groups[groupIndex].tasks[taskIndex].checklists.filter(
          (c) => c.id !== checklist.id
        );
        dispatch(updateBoard(updatedBoard));
      }
    }
  }

  function calculateProgress() {
    const doneTodos = checklist.todos.filter((todo) => todo.isDone).length;
    const totalTodos = checklist.todos.length;
    return totalTodos === 0 ? 0 : (doneTodos / totalTodos) * 100;
  }
  return (
    <div>
      <div className="div-activity details-grid">
        <div className="icon">Icon</div>
        <h2 className="align-text">
          {checklist.title}
          <button onClick={handleDelete}>DELETE</button>
        </h2>
        <div className="progress-percent">{calculateProgress().toFixed(0)}%</div>

        <div
          className="sublist-progress-bar"
          style={{
            width: `${calculateProgress()}%`,
            backgroundColor: calculateProgress() === 100 ? '#1F845A' : '#579DFF',
            borderRadius: '4px',
            height: '20px',
          }}
        ></div>
        <div className="grid-details-margin"></div>
      </div>
      <section className="task-details-sublist ">
        <div className="sublist-todos">
          {checklist.todos.map((todo, idx) => (
            <div key={todo.id} onMouseEnter={() => setIsHovered(todo.id)} onMouseLeave={() => setIsHovered(null)}>
              <input type="checkbox" checked={todo.isDone} onChange={() => handleCheckboxChange(todo.id)} />
              <span>{todo.title}</span>
              {isHovered === todo.id && <button onClick={() => handleTodoDelete(todo.id)}>Delete</button>}
            </div>
          ))}
        </div>

        {isEditable ? (
          <section>
            <div className="add-new-item-container">
              <input
                // onBlur={handleBlur}
                autoFocus={true}
                // onKeyDown={handleKeyDown}
                placeholder="Add an item"
                type="text"
                ref={inputRef}
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
              />
              <div>
                <button onClick={(ev) => handleSubmit(ev)}>Add</button>
                <button onClick={() => setIsEditable(false)}>Cancel</button>
              </div>
            </div>
          </section>
        ) : (
          <button className="add-item-btn" onClick={() => setIsEditable(true)}>
            Add an item
          </button>
        )}
      </section>
    </div>
  );
}
