import { useEffect, useRef, useState } from 'react';
import { utilService } from '../../../../services/util.service';
import { updateBoard } from '../../../../store/board.actions';
import { useDispatch } from 'react-redux';

// renders the todos + add , toggle todo
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
    const updatedTask = { ...task };
    const checklistIndex = updatedTask.checklists.findIndex((c) => c.id === checklist.id);
    if (checklistIndex !== -1) {
      updatedTask.checklists[checklistIndex].todos.push(todo);
    }

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              checklists: updatedTask.checklists,
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
    setIsEditable(true); // Keep input box open
    inputRef.current.focus(); // Auto focus to input field after adding todo
    dispatch(updateBoard(updatedBoard));
  }

  // async function handleCheckboxChange(todoId) {
  //   const updatedTask = { ...task };
  //   const checklistIndex = updatedTask.checklists.findIndex((c) => c.id === checklist.id);
  //   if (checklistIndex !== -1) {
  //     const todoIndex = updatedTask.checklists[checklistIndex].todos.findIndex((t) => t.id === todoId);
  //     if (todoIndex !== -1) {
  //       updatedTask.checklists[checklistIndex].todos[todoIndex].isDone = !updatedTask.checklists[checklistIndex].todos[todoIndex].isDone;
  //       try {
  //         await updateTask(updatedTask, board.id, group.id);
  //       } catch (err) {
  //         console.error('Failed to update todo', err);
  //       }
  //     }
  //   }
  // }

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

  // async function handleTodoDelete(todoId) {
  //   const updatedTask = { ...task };
  //   const checklistIndex = updatedTask.checklists.findIndex((c) => c.id === checklist.id);
  //   if (checklistIndex !== -1) {
  //     updatedTask.checklists[checklistIndex].todos = updatedTask.checklists[checklistIndex].todos.filter((t) => t.id !== todoId);
  //     try {
  //       await updateTask(updatedTask, board.id, group.id);
  //     } catch (err) {
  //       console.error('Failed to delete todo', err);
  //     }
  //   }
  // }

  // async function handleDelete() {
  //   const updatedTask = { ...task }
  //   updatedTask.checklists = updatedTask.checklists.filter(
  //     (c) => c.id !== checklist.id
  //   )
  //   try {
  //     await updateTask(updatedTask, boardId, groupId)
  //   } catch (err) {
  //     console.error('Failed to delete checklist', err)
  //   }
  // }

  // function calculateProgress() {
  //   const doneTodos = checklist.todos.filter((todo) => todo.isDone).length
  //   const totalTodos = checklist.todos.length
  //   return totalTodos === 0 ? 0 : (doneTodos / totalTodos) * 100
  // }

  // <img src={ChecklistIcon} />
  return (
    <div>
      <div className="div-activity details-grid ">
        <div className="icon">Icon</div>
        <h2 className="align-text">
          {checklist.title}
          <button>DELETE</button>
        </h2>
      </div>
      <div className="grid-details-margin">
        <div>Progress bar</div>
        CHECKLIST
        <button className="add-item-btn" onClick={() => setIsEditable(true)}>
          Add an item
        </button>
        {isEditable && (
          <section>
            <form className="add-new-item-container" onSubmit={handleSubmit}>
              <input
                onBlur={handleBlur}
                autoFocus={true}
                onKeyDown={handleKeyDown}
                placeholder="Add an item"
                type="text"
                ref={inputRef}
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
              />
              <div>
                <button type="submit">Add</button>
                <button onClick={() => setIsEditable(false)}>Cancel</button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
    // <section className="task-details-sublist">
    //   <div className="sublist-header">
    //     <h3>
    //       {<BsCheck2Square />} {checklist.title}
    //     </h3>
    //     <button onClick={handleDelete}>Delete</button>
    //   </div>

    //   <div className="checklist-progress">
    //     <div className="progress-percent">
    //       {calculateProgress().toFixed(0)}%
    //     </div>
    //     <div className="sublist-progress-bar">
    //       <div
    //         className="progress-bar-foreground"
    //         style={{
    //           width: `${calculateProgress()}%`,
    //           backgroundColor:
    //             calculateProgress() === 100 ? '#1F845A' : '#579DFF',
    //           borderRadius: '4px',
    //         }}
    //       ></div>
    //     </div>
    //   </div>

    //   <div className="sublist-todos">
    //     {checklist.todos.map((todo, idx) => (
    //       <div
    //         key={todo.id}
    //         onMouseEnter={() => setIsHovered(todo.id)}
    //         onMouseLeave={() => setIsHovered(null)}
    //       >
    //         <input
    //           type="checkbox"
    //           checked={todo.isDone}
    //           onChange={() => handleCheckboxChange(todo.id)}
    //         />
    //         <span className={todo.isDone ? 'strikethrough' : ''}>
    //           {todo.title}
    //         </span>
    //         {isHovered === todo.id && (
    //           <button onClick={() => handleTodoDelete(todo.id)}>
    //             <BsTrash />
    //           </button>
    //         )}
    //       </div>
    //     ))}
    //   </div>

    //   {!isEditable && (
    //     <button className="add-item-btn" onClick={() => setIsEditable(true)}>
    //       Add an item
    //     </button>
    //   )}
    //   {isEditable && (
    //     <section>
    //       <form className="add-new-item-container" onSubmit={handleSubmit}>
    //         <input
    //           onBlur={handleBlur}
    //           autoFocus={true}
    //           onKeyDown={handleKeyDown}
    //           placeholder="Add an item"
    //           type="text"
    //           ref={inputRef}
    //           value={todoTitle}
    //           onChange={(e) => setTodoTitle(e.target.value)}
    //         />
    //         <div>
    //           <button>Add</button>
    //           <button onClick={() => setIsEditable(false)}>Cancel</button>
    //         </div>
    //       </form>
    //     </section>
    //   )}
    // </section>
  );
}
