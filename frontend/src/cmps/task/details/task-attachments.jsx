import React from 'react';
import { RiAttachment2 } from 'react-icons/ri';

export function TaskAttachments({ attachments }) {
  return (
    <div className="task-attachments">
      <div className="attachment-header details-grid">
        <RiAttachment2 className="attachment-icon" />
        <h2 className="attachment-title">Attachments</h2>
      </div>
      {attachments ? (
        <ul>
          {attachments.map((attachment) => (
            <li>
              <img src={`${attachment}`} className="attachment-img" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No attachments</p>
      )}
    </div>
  );
}
