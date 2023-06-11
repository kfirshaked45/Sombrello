import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../../../store/board.actions';
import { utilService } from '../../../../services/util.service';

export function CreateLabel({ board }) {
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

  const handleCreate = () => {
    const newLabel = {
      id: utilService.makeId(), // You can implement your own logic to generate a new label ID
      title,
      color: selectedColor,
    };

    const updatedBoard = {
      ...board,
      labels: [...board.labels, newLabel],
    };
    dispatch(updateBoard(updatedBoard));
    setTitle('');
  };

  return (
    <div className="pop-over-content">
      {/* Preview section */}
      <div className="current-label-container">
        <div className="current-label" style={{ backgroundColor: selectedColor }}>
          {title}
        </div>
      </div>

      {/* Title input */}
      <div>
        <span className="edit-label-text">Title</span>
        <input type="text" value={title} onChange={handleTitleChange} style={{ width: '100%' }} />
      </div>

      {/* Select a color */}
      <span className="edit-label-text">Select a color</span>
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

      {/* Create button */}
      <button onClick={handleCreate} className="card-composer-add-btn">
        Create
      </button>
    </div>
  );
}
