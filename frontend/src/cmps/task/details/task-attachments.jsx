import React from 'react';
import { RiAttachment2 } from 'react-icons/ri';
import { utilService } from '../../../services/util.service';

export function TaskAttachments({ attachments }) {
  console.log(attachments);
  if (attachments.length === 0) return;
  return (
    <div className="task-attachments">
      <div className="attachment-header details-grid">
        <RiAttachment2 className="attachment-icon" />
        <h2 className="attachment-title">Attachments</h2>
      </div>
      {attachments ? (
        <ul>
          {attachments.map((attachment) => (
            <li className="attachment-container" key={attachment.id}>
              <img src={`${attachment.imgUrl}`} className="attachment-img" />
              <div className="attachment-detail-container">
                <span className="attachment-thumbnail-name">{attachment.imageName}</span>
                <div className="attachment-btn-container">
                  <span className="attachment-date">{utilService.formatDateAttachment(attachment.uploadedAt)}</span>
                  <button className="attachment-button">Comment</button>
                  <button className="attachment-button">Delete</button>
                  <button className="attachment-button">Edit</button>
                </div>
                <button className="attachment-button">Make cover</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No attachments</p>
      )}
    </div>
  );
}
