import { utilService } from '../../../services/util.service';
import { useState } from 'react';
import { ReactComponent as ArrowDownIcon } from '../../../assets/img/task/arrow-down-icon.svg';
export function TaskDates({ dates, onClickPlus }) {
  const [isChecked, setIsChecked] = useState(false);
  if (!dates) return null;

  return (
    <div className="task-dates">
      <h5>Dates</h5>
      <div className="date-wrapper">
        <input
          type="checkbox"
          onClick={() => {
            setIsChecked((prevState) => !prevState);
          }}
        />
        {dates.startDate && (
          <p className="dates-container general-btn-styling">
            {utilService.formatDate(dates.startDate)}
            {dates.endDate && ` - ${utilService.formatDate(dates.endDate)}`}
            {isChecked && <div className="date-completed">complete</div>}
            <span onClick={() => onClickPlus('Dates')}>
              <ArrowDownIcon className="arrow-down-icon" />
            </span>
          </p>
        )}
        {!dates.startDate && dates.endDate && (
          <p className="dates-container general-btn-styling">
            {utilService.formatDate(dates.endDate)}
            {isChecked && <div className="date-completed">complete</div>}
          </p>
        )}
      </div>
    </div>
  );
}
