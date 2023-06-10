export function TaskActivityComments({ comments }) {
  if (!comments || comments.length === 0) return;
  const getTextFromHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  // Sort comments by createdAt in descending order
  const sortedComments = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="activity-comments grid-details-margin">
      {sortedComments.map((comment) => (
        <div className=" activity-comment" key={comment.id} dangerouslySetInnerHTML={{ __html: comment.text }} />
      ))}
    </div>
  );
}
