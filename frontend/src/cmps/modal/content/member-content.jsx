import { updateBoard } from '../../../store/board.actions'

export function MemberContent({ board, task, group, dispatch }) {
  const addMember = (member) => {
    if (!task.members) {
      task.members = [member]
    } else {
      const alreadyMemberIndex = task.members.findIndex(
        (m) => m._id === member._id
      )
      if (alreadyMemberIndex !== -1) {
        task.members.splice(alreadyMemberIndex, 1)
      } else {
        task.members.push(member)
      }
    }

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              members: task.members || [],
            }
          }
          return t
        })

        return {
          ...g,
          tasks: updatedTasks,
        }
      }
      return g
    })
    const updatedBoard = { ...board, groups: updatedGroups }
    dispatch(updateBoard(updatedBoard))
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
        {board.members &&
          board.members.map((member) => (
            <li key={member._id}>
              <button
                className="action-member"
                onClick={() => {
                  addMember(member)
                }}
              >
                <img src={`${member.imgUrl}`} alt="picture" />
                {member.fullname}
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
