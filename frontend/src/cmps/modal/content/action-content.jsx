import React from 'react';
import { MemberContent } from './members/member-content';
import { useDispatch } from 'react-redux';
import { LabelsContent } from './labels/labels-content';
import { DateContent } from './dates/date-content';
import { AttachmentsContent } from './attachment/attachments-content';
import { GroupsContent } from './groups-content';
import { EditAttachment } from './attachment/edit-attachment';
import { CoverContent } from './cover-content';
import { EditLabel } from './labels/edit-label';

const actionComponents = {
  Members: MemberContent,
  'Members ': MemberContent,
  Labels: LabelsContent,
  Dates: DateContent,
  Attachments: AttachmentsContent,
  Group: GroupsContent,
  'Edit Attachment': EditAttachment,
  Cover: CoverContent,
  'Edit Label': EditLabel,
};

export function ActionContent({ action, board, task, group, attachmentId, onClose, labelId }) {
  const dispatch = useDispatch();
  const ContentComponent = actionComponents[action] || null;

  return ContentComponent ? (
    <ContentComponent
      board={board}
      task={task}
      group={group}
      dispatch={dispatch}
      attachmentId={attachmentId}
      onClose={onClose}
      labelId={labelId}
    />
  ) : null;
}
