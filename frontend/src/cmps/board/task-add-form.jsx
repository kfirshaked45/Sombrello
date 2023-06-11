import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { utilService } from '../../services/util.service';
import { updateBoard } from '../../store/board.actions';
import { useEffect } from 'react';

export function TaskAddForm({ board, group, handleCancel, createActivity }) {
  const dispatch = useDispatch();
  const taskInputRef = useRef(null);
  const [task, setTask] = useState('');
  useEffect(() => {
    taskInputRef.current.focus();
  }, []);
  function handleChange(ev) {
    setTask(ev.target.value);
  }

  function handleSubmit() {
    const taskTitle = task.trim();
    if (!taskTitle) return;

    const newTask = {
      id: utilService.makeId(),
      title: taskTitle,
      style: {},
      desc: '',
    };

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedGroup = {
          ...g,
          tasks: [...g.tasks, newTask],
        };

        return updatedGroup;
      }
      return g;
    });

    const activity = createActivity(`Added task "${newTask.title}" to group ${group.title}`);
    const updatedBoard = { ...board, groups: updatedGroups, activities: [...board.activities, activity] };
    setTask('');

    dispatch(updateBoard(updatedBoard));
  }

  function handleKeyDown(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      handleSubmit();
    } else if (ev.key === 'Escape') {
      setTask('');
    }
  }

  return (
    <div className="card-composer">
      <div className="card-composer-textarea-container">
        <textarea
          ref={taskInputRef}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={task}
          placeholder="Enter a title for this card..."
          className="card-composer-textarea"
        ></textarea>
      </div>
      <div className="card-composer-buttons">
        <button onClick={handleSubmit} className="card-composer-add-btn">
          Add card
        </button>
        <button onClick={() => handleCancel()} className="x-icon-card">
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    </div>
  );
}
