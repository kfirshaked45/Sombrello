import { RxActivityLog } from 'react-icons/rx';

export function ActivityDetails({ board }) {
  // activitiy - byMember - id - createdAt , text -
  // by member - fullname, username,imgUrl , _id
  //
  //
  function formatCreatedAt(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);

    const diff = now.getTime() - createdDate.getTime();
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hr${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
      return `Yesterday, ${createdDate.getHours()}:00`;
    } else if (now.getFullYear() === createdDate.getFullYear()) {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[createdDate.getMonth()];
      const day = createdDate.getDate();
      const hour = createdDate.getHours();
      return `${month} ${day}, ${hour}:00`;
    } else {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[createdDate.getMonth()];
      const day = createdDate.getDate();
      const hour = createdDate.getHours();
      return `${month} ${day}, ${createdDate.getFullYear()}, ${hour}:00`;
    }
  }

  return (
    <div className="activity-details">
      <button className="activity-top-container">
        <span className="activity-icon">
          <RxActivityLog />
        </span>
        <span className="activity-top-text">Activity</span>
      </button>
      <div className="activities-container">
        {board.activities.map((activity) => (
          <div key={activity.id} className="activity-user-container">
            <img src={activity.byMember.imgUrl} alt="user-img" className="activity-user-img" />
            <div className="activity-user-text-container">
              <span className="activity-username">{activity.byMember.username}</span>
              <span className="activity-text">{activity.text} </span>
            </div>
            <div className="activity-created-at">{formatCreatedAt(activity.createdAt)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
