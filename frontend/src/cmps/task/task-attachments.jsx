import React from "react"
import { GrAttachment } from 'react-icons/gr'
import { AttachmentPreview } from './attachment-preview'

export const TaskAttachments = ({ task, groupId }) => {
  const { attachments } = task

  return (
    <section className="task-attachments">
      <div className="attachments-header">
        <GrAttachment />
        <h3>Attachments</h3>
      </div>

      <div className="attachments-body">
        {attachments &&
          attachments.map((attachment) => (
            <AttachmentPreview key={attachment.id} task={task} attachment={attachment} groupId={groupId} />
          ))}
      </div>
    </section>
  )
}