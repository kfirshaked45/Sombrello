import React from "react"

export function TaskAttachments() {
  // demo attachment data
  const attachments = [
    { id: 1, name: "Attachment 1" },
    { id: 2, name: "Attachment 2" },
    { id: 3, name: "Attachment 3" },
  ]

  return (
    <div className="task-attachments">
      <h3>Attachments</h3>
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
