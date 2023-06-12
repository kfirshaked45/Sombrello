import { useState, useRef, useEffect } from 'react';
import { updateBoard } from '../../../../store/board.actions';
import { utilService } from '../../../../services/util.service';
import { useDispatch } from 'react-redux';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ChecklistContent({ task, board, group, onClose, createActivity }) {
  const [title, setTitle] = useState('Checklist');
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleChange({ target }) {
    if (target.name === 'title') {
      setTitle(target.value);
    }
  }

  async function onAddChecklist(ev) {
    ev.preventDefault();
    const checklist = {
      id: utilService.makeId(),
      title,
      todos: [],
    };

    const updatedTask = { ...task }; // Create a shallow copy of the task object

    if (!updatedTask.checklists) {
      updatedTask.checklists = []; // If checklists array doesn't exist, create it
    }

    updatedTask.checklists.push(checklist); // Push the new checklist to the checklists array

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              checklists: updatedTask.checklists || [],
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

    const updatedBoard = {
      ...board,
      groups: updatedGroups,
    };

    dispatch(updateBoard(updatedBoard));

    onClose(); // Close the modal (assuming you have a function for that)
  }

  return (
    <section className="checklist-content">
      <form onSubmit={onAddChecklist}>
        <label htmlFor="checklist-title">Title</label>
        <input value={title} onChange={handleChange} ref={inputRef} type="text" name="title" id="checklist-title" />
        <button>Add</button>
      </form>
    </section>
  );
}
