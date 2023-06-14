import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateBoard } from '../../../../store/board.actions'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const fixedMembers = [
  {
    _id: 'u101',
    fullname: 'Kfir Shaked',
    imgUrl:
      'https://res.cloudinary.com/dcaqp34xm/image/upload/v1686731130/kfirImg_ekhawt.jpg',
  },
  {
    _id: 'u102',
    fullname: 'Ofek Rashti',
    imgUrl:
      'https://res.cloudinary.com/dcaqp34xm/image/upload/v1686731130/user-img1_efdss2.jpg',
  },
  {
    _id: 'u103',
    fullname: 'Omer Hassin',
    imgUrl:
      'https://res.cloudinary.com/dcaqp34xm/image/upload/v1686731130/omer-img_lf2bdx.jpg',
  },
  {
    _id: 'u104',
    fullname: 'Batel Katiei',
    userName: 'Batel',
    password: 'batel123',
    imgUrl:
      'https://res.cloudinary.com/dcaqp34xm/image/upload/v1686731130/batelImg_f9evg0.jpg',
  },
  {
    _id: 'u105',
    fullname: 'Daniel Shaked',
    userName: 'Daniel',
    password: 'daniel123',
    imgUrl:
      'https://res.cloudinary.com/dcaqp34xm/image/upload/v1686731130/danielImg_pyvfbh.png',
  },
  {
    _id: 'u106',
    fullname: 'Tommy Irmia',
    userName: 'Tommy',
    password: 'tommy123',
    imgUrl:
      'https://res.cloudinary.com/dcaqp34xm/image/upload/v1686731130/tommyImg_y0eq3l.jpg',
  },
]

export function MemberContent({
  board,
  task,
  group,
  dispatch,
  createActivity,
}) {
  function addMember(member) {
    if (!task.members) {
      task.members = [member]
    } else {
      const alreadyMemberIndex = task.members.findIndex(
        (currentMember) => currentMember._id === member._id
      )
      if (alreadyMemberIndex !== -1) {
        task.members.splice(alreadyMemberIndex, 1)
      } else {
        task.members.push(member)
      }
    }

    const activityText = task.members.includes(member)
      ? `Added ${member.fullname} to the task "${task.title}"`
      : `Removed ${member.fullname} from the task "${task.title}"`
    const activity = createActivity(activityText)

    const updatedGroups = board.groups.map((currentGroup) => {
      if (currentGroup.id === group.id) {
        const updatedTasks = currentGroup.tasks.map((currentTask) => {
          if (currentTask.id === task.id) {
            return {
              ...currentTask,
              members: task.members || [],
            }
          }
          return currentTask
        })

        return {
          ...currentGroup,
          tasks: updatedTasks,
        }
      }
      return currentGroup
    })

    const updatedBoard = {
      ...board,
      groups: updatedGroups,
      activities: [...board.activities, activity],
    }

    dispatch(updateBoard(updatedBoard))
  }

  const boardMembers = board.members || []
  const renderMembers = [...fixedMembers, ...boardMembers].reduce(
    (uniqueMembers, member) => {
      const isMemberDuplicate = uniqueMembers.some((m) => m._id === member._id)
      if (!isMemberDuplicate) {
        uniqueMembers.push(member)
      }
      return uniqueMembers
    },
    []
  )

  function isAlreadyAMember(member, task) {
    return task.members?.find((m) => m._id === member._id)
  }

  return (
    <div className="action-modal-content">
      <input
        type="text"
        placeholder="Search members"
        className="search-members-input"
      />
      <ul className="action-member-list">
        <h4>Board members</h4>
        {renderMembers.map((member) => (
          <li key={member._id}>
            <button
              className="action-member"
              onClick={() => {
                addMember(member)
              }}
            >
              <img src={member.imgUrl} alt="picture" />
              {member.fullname}
              {isAlreadyAMember(member, task) && (
                <FontAwesomeIcon icon={faCheck} className="member-check-icon" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
