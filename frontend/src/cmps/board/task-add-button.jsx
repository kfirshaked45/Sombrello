import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export function TaskAddButton({ onAddCard }) {
  return (
    <div style={{ display: 'flex' }}>
      <button className="open-card-composer-btn" onClick={onAddCard}>
        <FontAwesomeIcon icon={faPlus} className="open-card-plus" />
        Add a card
      </button>
    </div>
  )
}
