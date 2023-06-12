import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateBoard } from '../../../../store/board.actions';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const fixedMembers = [
  {
    _id: 'u101',
    fullname: 'Kfir Shaked',
    imgUrl: 'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
  },
  {
    _id: 'u102',
    fullname: 'Ofek Rashti',
    imgUrl: 'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
  },
  {
    _id: 'u103',
    fullname: 'Omer Hassin',
    imgUrl: 'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
  },
];

export function MemberContent({ board, task, group, dispatch, createActivity }) {
  function addMember(member) {
    if (!task.members) {
      task.members = [member];
    } else {
      const alreadyMemberIndex = task.members.findIndex((currentMember) => currentMember._id === member._id);
      if (alreadyMemberIndex !== -1) {
        task.members.splice(alreadyMemberIndex, 1);
      } else {
        task.members.push(member);
      }
    }

    const activityText = task.members.includes(member)
      ? `Added ${member.fullname} to the task "${task.title}"`
      : `Removed ${member.fullname} from the task "${task.title}"`;
    const activity = createActivity(activityText);

    const updatedGroups = board.groups.map((currentGroup) => {
      if (currentGroup.id === group.id) {
        const updatedTasks = currentGroup.tasks.map((currentTask) => {
          if (currentTask.id === task.id) {
            return {
              ...currentTask,
              members: task.members || [],
            };
          }
          return currentTask;
        });

        return {
          ...currentGroup,
          tasks: updatedTasks,
        };
      }
      return currentGroup;
    });

    const updatedBoard = {
      ...board,
      groups: updatedGroups,
      activities: [...board.activities, activity],
    };

    dispatch(updateBoard(updatedBoard));
  }

  const boardMembers = board.members || [];
  const renderMembers = [...fixedMembers, ...boardMembers].reduce((uniqueMembers, member) => {
    const isMemberDuplicate = uniqueMembers.some((m) => m._id === member._id);
    if (!isMemberDuplicate) {
      uniqueMembers.push(member);
    }
    return uniqueMembers;
  }, []);

  function isAlreadyAMember(member, task) {
    return task.members?.find((m) => m._id === member._id);
  }

  return (
    <div className="action-modal-content">
      <input type="text" placeholder="Search members" className="search-members-input" />
      <ul className="action-member-list">
        <h4>Board members</h4>
        {renderMembers.map((member) => (
          <li key={member._id}>
            <button
              className="action-member"
              onClick={() => {
                addMember(member);
              }}
            >
              <img src={`${member.imgUrl}`} alt="picture" />
              {member.fullname}
              {isAlreadyAMember(member, task) && <FontAwesomeIcon icon={faCheck} className="member-check-icon" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
