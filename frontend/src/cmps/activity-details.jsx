import { RxActivityLog } from 'react-icons/rx'

export function ActivityDetails({ board }) {
  function formatCreatedAt(createdAt) {
    const now = new Date()
    const createdDate = new Date(createdAt)

    const diff = now.getTime() - createdDate.getTime()
    const diffMinutes = Math.floor(diff / (1000 * 60))
    const diffHours = Math.floor(diff / (1000 * 60 * 60))
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (diffMinutes < 1) {
      return 'Right now'
    } else if (diffMinutes < 60) {
      return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''} ago`
    } else if (diffHours < 24) {
      return `an hour${diffHours !== 1 ? 's' : ''} ago`
    } else if (diffDays === 1) {
      return `yesterday at ${createdDate.getHours()}:${createdDate.getMinutes()}`
    } else if (now.getFullYear() === createdDate.getFullYear()) {
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      const month = monthNames[createdDate.getMonth()]
      const day = createdDate.getDate()
      const hour = createdDate.getHours()
      const minutes = createdDate.getMinutes()
      return `${month} ${day} at ${hour}:${minutes}`
    } else {
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      const month = monthNames[createdDate.getMonth()]
      const day = createdDate.getDate()
      const hour = createdDate.getHours()
      const minutes = createdDate.getMinutes()
      return `${month} ${day}, ${createdDate.getFullYear()} at ${hour}:${minutes}`
    }
  }

  const sortedActivities = [...board.activities].sort(
    (a, b) => b.createdAt - a.createdAt
  )

  return (
    <div className="activity-details">
      <button className="activity-top-container">
        <span className="activity-icon">
          <RxActivityLog />
        </span>
        <span className="activity-top-text">Activity</span>
      </button>
      <div className="activities-container">
        {sortedActivities.length > 0 &&
          sortedActivities.map((activity) => {
            if (typeof activity.text !== 'string') {
              return null
            }
            const replacedText = activity.text.replace(
              /group g(\d+)/g,
              (match, groupId) => {
                const group = board.groups.find((g) => g.id === `g${groupId}`)
                return group ? `${group.title} group` : match
              }
            )

            return (
              <div key={activity.id} className="activity-user-container">
                <img
                  src={activity.byMember.imgUrl}
                  alt="user-img"
                  className="activity-user-img"
                />
                <div className="activity-user-text-container">
                  <span className="activity-username">
                    {activity.byMember.username}
                  </span>
                  <span className="activity-text">{replacedText} </span>
                </div>
                <div className="activity-created-at">
                  {formatCreatedAt(activity.createdAt)}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
