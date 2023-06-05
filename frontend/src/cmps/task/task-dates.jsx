export function TaskDates({ dates }) {
  const endDate = new Date(dates.endDate);
  const startDate = new Date(dates.startDate);

  return (
    <div className="task-dates">
      <h3>Due Dates</h3>
      <div key={dates.id}>
        {dates.startDate && <p>Start Date: {startDate.toLocaleString()}</p>}
        {dates.endDate && <p>Due Date: {endDate.toLocaleString()}</p>}
      </div>
    </div>
  );
}
