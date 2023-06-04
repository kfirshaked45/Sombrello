import React from 'react';

function ActionContent({ action }) {
  if (action === 'Members') {
    return <div>Members Content</div>;
  } else if (action === 'Labels') {
    return <div>Labels Content</div>;
  } else if (action === 'Dates') {
    return <div>Dates Content</div>;
  } else if (action === 'Attachments') {
    return <div>Attachments Content</div>;
  } else {
    return <div>Invalid action.</div>;
  }
}

export function ActionModal({ action, onClose }) {
  return (
    <div>
      <div className="action-header">{action}</div>
      <ActionContent action={action} />
      <button onClick={onClose}>Close</button>
    </div>
  );
}
