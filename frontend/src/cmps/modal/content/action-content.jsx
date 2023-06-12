import React from 'react'
import { MemberContent } from './members/member-content'
import { CheckList } from '../../board/check-list/check-list'
import { useDispatch, useSelector } from 'react-redux'
import { LabelsContent } from './labels/labels-content'
import { DateContent } from './dates/date-content'
import { AttachmentsContent } from './attachment/attachments-content'
import { GroupsContent } from './groups-content'
import { EditAttachment } from './attachment/edit-attachment'
import { CoverContent } from './cover-content'
import { EditLabel } from './labels/edit-label'
import { CreateLabel } from './labels/create-label'
import { utilService } from '../../../services/util.service'

const actionComponents = {
  Members: MemberContent,
  'Members ': MemberContent,
  Labels: LabelsContent,
  Checklist: CheckList,
  Dates: DateContent,
  Attachments: AttachmentsContent,
  Group: GroupsContent,
  'Edit Attachment': EditAttachment,
  Cover: CoverContent,
  'Edit Label': EditLabel,
  'Create Label': CreateLabel,
}

export function ActionContent({
  action,
  board,
  task,
  group,
  attachmentId,
  onClose,
  labelId,
  modalRef,
}) {
  const dispatch = useDispatch()
  const ContentComponent = actionComponents[action] || null
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  function createActivity(text) {
    return {
      id: utilService.makeId(),
      text,
      createdAt: Date.now(),
      byMember: loggedInUser,
    }
  }

  return ContentComponent ? (
    <ContentComponent
      board={board}
      task={task}
      group={group}
      dispatch={dispatch}
      attachmentId={attachmentId}
      onClose={onClose}
      labelId={labelId}
      modalRef={modalRef}
      createActivity={createActivity}
    />
  ) : null
}
