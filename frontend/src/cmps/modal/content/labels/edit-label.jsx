import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../../../store/board.actions';

export function EditLabel({ board, task, group, labelId }) {
  const dispatch = useDispatch();
  const colors = [
    '#baf3db',
    '#f8e6a0',
    '#ffe2bd',
    '#ffd2cc',
    '#dfd8fd',
    '#4bce97',
    '#e2b203',
    '#faa53d',
    '#f87462',
    '#9f8fef',
    '#1f845a',
    '#946f00',
    '#b65c02',
    '#ca3521',
    '#6e5dc6',
    '#cce0ff',
    '#c1f0f5',
    '#d3f1a7',
    '#fdd0ec',
    '#dcdfe4',
    '#579dff',
    '#60c6d2',
    '#94c748',
    '#e774bb',
    '#8590a2',
    '#0c66e4',
    '#1d7f8c',
    '#5b7f24',
    '#ae4787',
    '#626f86',
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [title, setTitle] = useState('');

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = () => {
    const updatedTask = { ...task };
    const labelIndex = updatedTask.labels.findIndex((label) => label.id === labelId);
    if (labelIndex !== -1) {
      updatedTask.labels[labelIndex] = {
        ...updatedTask.labels[labelIndex],
        title: title || updatedTask.labels[labelIndex].title,
        color: selectedColor || updatedTask.labels[labelIndex].color,
      };

      const updatedGroups = board.groups.map((g) => {
        if (g.id === group.id) {
          return {
            ...g,
            tasks: g.tasks.map((t) => (t.id === task.id ? updatedTask : t)),
          };
        }
        return g;
      });

      const updatedBoard = { ...board, groups: updatedGroups };
      dispatch(updateBoard(updatedBoard));
    }
  };

  const handleDelete = () => {
    // Handle delete logic here
  };

  return (
    <div className="pop-over-content">
      {/* Display the label with the current color and text */}
      <div className="current-label" style={{ backgroundColor: selectedColor }}>
        {title}
      </div>
      {/* Title input */}
      <div>
        <span className="edit-label-text"> Title</span>

        <input type="text" value={title} onChange={handleTitleChange} style={{ width: '100%' }} />
      </div>
      {/* Select a color */}
      <span className="edit-label-text"> Select a color</span>

      <div className="label-colors-container">
        {colors.map((color) => (
          <div
            key={color}
            className={`color-container ${selectedColor === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
      {/* Remove color button */}
      <button className="create-label remove-color-btn">
        <span style={{ marginRight: '8px' }}>X</span> Remove color
      </button>
      {/* Save and Delete buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleSave} className="card-composer-add-btn">
          Save
        </button>
        <button onClick={handleDelete} className="card-composer-add-btn delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}
