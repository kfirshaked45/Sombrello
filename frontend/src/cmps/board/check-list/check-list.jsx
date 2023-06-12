import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addChecklist } from '../../../store/board.actions'
import { Loader } from '../../general/loader'

export const CheckList = () => {
  const [title, setTitle] = useState('Checklist')
  const [isAdding, setIsAdding] = useState(false)
  const params = useParams()
  const dispatch = useDispatch()

  const handleChange = ({ target }) => {
    const { value } = target
    setTitle(value)
  }

  const onAddChecklist = (ev) => {
    ev.preventDefault()
    setIsAdding(true)
    dispatch(addChecklist(title, params.taskId, params.groupId))
  }

  return (
    <section className="check-list">
      {isAdding ? (
        <Loader />
      ) : (
        <div className="input-container">
          <form onSubmit={onAddChecklist}>
            <label htmlFor="addTitle">Title</label>
            <input
              autoFocus={window.innerWidth >= 1200}
              id="addTitle"
              type="text"
              value={title}
              onChange={handleChange}
            />
            <button className="blue btn">Add</button>
          </form>
        </div>
      )}
    </section>
  )
}
