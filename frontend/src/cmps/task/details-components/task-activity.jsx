import { RxActivityLog } from 'react-icons/rx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { TfiAlignLeft } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../../store/board.actions';
import { TaskActivityComments } from './task-activity-comments';

export function TaskActivity({ task, group, board }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [editorValue, setEditorValue] = useState('');
  const handleTextareaClick = () => {
    setIsEditing(true);
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleEditorBlur = () => {
    setIsEditing(false);
  };
  const handleSave = () => {
    setIsEditing(false);
    handleSubmit();
  };
  function handleSubmit() {
    if (editorValue) {
      const newComment = {
        // Generate a unique ID for the comment (you can use any unique identifier method)
        text: editorValue,
        createdAt: new Date().toISOString(),
      };

      const updatedTask = {
        ...task,
        comments: [...task.comments, newComment],
      };

      const updatedGroup = {
        ...group,
        tasks: group.tasks.map((t) => (t.id === task.id ? updatedTask : t)),
      };

      const updatedGroups = board.groups.map((g) => (g.id === group.id ? updatedGroup : g));

      const updatedBoard = {
        ...board,
        groups: updatedGroups,
      };
      setEditorValue('');
      dispatch(updateBoard(updatedBoard));
    }
  }

  // Utility function to extract plain text from HTML content

  return (
    <div>
      <div className="div-activity details-grid ">
        <div className="icon">
          <RxActivityLog />
        </div>
        <h2 className="align-text">Activity</h2>
      </div>

      {isEditing ? (
        <div>
          <ReactQuill className="quill-container" value={editorValue} onChange={handleEditorChange} />

          <div className="quill-btns-container">
            <button className="quill-save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <input className="input-task-activity grid-details-margin" placeholder="Write a comment..." onClick={handleTextareaClick} />
      )}
      <TaskActivityComments comments={task.comments} />
    </div>
  );
}
