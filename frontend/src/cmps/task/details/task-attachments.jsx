import React from 'react'
import { RiAttachment2 } from 'react-icons/ri'
import { utilService } from '../../../services/util.service'

export function TaskAttachments({ attachments }) {
  console.log(attachments)
  if (!attachments || attachments.length === 0) {
    return (
      <div className="task-attachments">
        <div className="attachment-header details-grid">
          <RiAttachment2 className="attachment-icon" />
          <h2 className="attachment-title">Attachments</h2>
        </div>
        <p>No attachments</p>
      </div>
    )
  }

  return (
    <div className="task-attachments">
      <div className="attachment-header details-grid">
        <RiAttachment2 className="attachment-icon" />
        <h2 className="attachment-title">Attachments</h2>
      </div>
      <ul>
        {attachments.map((attachment) => (
          <li key={attachment.id}>
            <img
              src={`${attachment.imgUrl}`}
              className="attachment-img"
              alt="Attachment"
            />
            <div>
              <span className="attachment-thumbnail-name">
                {attachment.imageName}
              </span>
              <div>
                <span>
                  {utilService.formatDateAttachment(attachment.uploadedAt)}
                </span>
                <button>Comment</button>
                <button>Delete</button>
                <button>Edit</button>
              </div>
              <button>Make cover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
