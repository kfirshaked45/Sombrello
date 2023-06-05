export function TaskDates({ dates }) {
  if (!dates) return;
  return (
    <div className="task-dates">
      <h3>Due Dates</h3>
      <div>
        {dates.startDate && <p>Start Date: {dates.startDate}</p>}
        {dates.endDate && <p>Due Date: {dates.endDate}</p>}
      </div>
    </div>
  );
}
