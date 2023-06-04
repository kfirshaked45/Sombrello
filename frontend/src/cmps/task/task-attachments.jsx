import React from "react"
import { RiAttachment2 } from "react-icons/ri"

export function TaskAttachments() {
  // demo attachment data
  const attachments = [
    { id: 1, name: "Attachment 1" },
    { id: 2, name: "Attachment 2" },
    { id: 3, name: "Attachment 3" },
  ]

  return (
    <div className="task-attachments">
      <div className="attachment-header">
        <RiAttachment2 className="attachment-icon" />
        <h2 className="attachment-title">Attachments</h2>
      </div>
      {attachments.length > 0 ? (
        <ul>
          {attachments.map((attachment) => (
            <li key={attachment.id}>{attachment.name}</li>
          ))}
        </ul>
      ) : (
        <p>No attachments</p>
      )}
    </div>
  )
}
