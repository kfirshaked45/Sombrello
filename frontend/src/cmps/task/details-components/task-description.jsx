import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useState } from 'react';
import { TfiAlignLeft } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../../store/board.actions';

export function TaskDescription({ description, task, group, board }) {
  const [isEditing, setIsEditing] = useState(false);
  const descriptionRef = useRef(null);
  const dispatch = useDispatch();
  const [editorValue, setEditorValue] = useState(description);

  const handleTextareaClick = () => {
    setIsEditing(true);
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };
  function handleExitKey(ev) {
    if (ev.key === 'Escape') {
      descriptionRef.current.blur();
      setIsEditing(false);
    }
  }
  const handleEditorBlur = () => {
    setIsEditing(false);
  };
  const handleSave = () => {
    setIsEditing(false);
    handleBlur();
  };
  function handleBlur() {
    if (editorValue !== task.desc) {
      const updatedTask = { ...task, desc: editorValue }; // Create an updatedTask object with the new description

      const updatedGroup = {
        ...group,
        tasks: group.tasks.map((t) => (t.id === task.id ? updatedTask : t)), // Replace the current task with the updatedTask
      };

      const updatedGroups = board.groups.map((g) => {
        if (g.id === group.id) {
          return updatedGroup;
        }
        return g;
      });

      const updatedBoard = { ...board, groups: updatedGroups };

      dispatch(updateBoard(updatedBoard)); // Dispatch the updateBoard action with the updatedBoard object
    }
  }

  // Utility function to extract plain text from HTML content
  const getTextFromHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <div className="description">
      <div className="description-title-container details-grid">
        <TfiAlignLeft className="icon-description" />

        <h3 className="description-title">
          Description
          {!isEditing && (
            <button className="description-edit-btn general-btn-styling" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </h3>
      </div>
      {isEditing ? (
        <div>
          <ReactQuill
            className="quill-container show-description-value u-fancy-scrollbar"
            onKeyDown={handleExitKey}
            ref={descriptionRef}
            value={editorValue}
            onChange={handleEditorChange}
            onBlur={handleBlur}
          />

          <div className="quill-btns-container">
            <button className="quill-save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="quill-cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {editorValue ? (
            <div
              dangerouslySetInnerHTML={{ __html: editorValue }}
              className="grid-details-margin show-description-value"
              onClick={() => setIsEditing(true)}
            />
          ) : (
            <div>
              <textarea
                onClick={handleTextareaClick}
                placeholder={description ? description : 'Add a more detailed description..'}
                className="main-content-text-area"
                value={getTextFromHtml(editorValue)} // Extract plain text from HTML content
                readOnly
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
