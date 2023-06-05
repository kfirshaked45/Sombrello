import React from 'react';
import { RiAttachment2 } from 'react-icons/ri';

export function TaskAttachments({ attachments }) {
  console.log(attachments);
  // demo attachment data

  return (
    <div className="task-attachments">
      <div className="attachment-header">
        <RiAttachment2 className="attachment-icon" />
        <h2 className="attachment-title">Attachments</h2>
      </div>
      {attachments ? (
        <ul>
          {attachments.map((attachment) => (
            <li>{attachment}</li>
          ))}
        </ul>
      ) : (
        <p>No attachments</p>
      )}
    </div>
  );
}
