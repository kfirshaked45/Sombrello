import React from 'react';
import { MemberContent } from './member-content';
import { useDispatch } from 'react-redux';
import { LabelsContent } from './labels-content';
import { DateContent } from './date-content';
import { AttachmentsContent } from './attachments-content';
import { GroupsContent } from './groups-content';
import { EditAttachment } from './edit-attachment';
import { CoverContent } from './cover-content';

const actionComponents = {
  Members: MemberContent,
  'Members ': MemberContent,
  Labels: LabelsContent,
  Dates: DateContent,
  Attachments: AttachmentsContent,
  Group: GroupsContent,
  'Edit Attachment': EditAttachment,
  Cover: CoverContent,
};

export function ActionContent({ action, board, task, group }) {
  const dispatch = useDispatch();
  const ContentComponent = actionComponents[action] || null;

  return ContentComponent ? <ContentComponent board={board} task={task} group={group} dispatch={dispatch} /> : null;
}
