import { Link } from 'react-router-dom'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export const BoardPreview = ({ board, onToggleStarred }) => {
  const getBoardStyle = () => {
    if (!board) return
    if (board?.style.background)
      return {
        background: `url('${board.style.thumbnail}') center center / cover`,
      }
    else if (board?.style.backgroundColor)
      return { backgroundColor: `${board.style.backgroundColor}` }
    return { backgroundColor: `blue` }
  }

  const boardStyle = getBoardStyle()
  return (
    <Link key={board._id} to={`/board/${board._id}`}>
      <section className="board-preview" style={boardStyle}>
        <span className="board-hover">
          <div className="board-preview-details">
            <h3>{board.title}</h3>
            <div className={`board-star ${board.isStarred ? 'starred' : ''}`}>
              {board.isStarred ? (
                <AiFillStar onClick={(ev) => onToggleStarred(ev, board._id)} />
              ) : (
                <AiOutlineStar
                  onClick={(ev) => onToggleStarred(ev, board._id)}
                />
              )}
            </div>
          </div>
        </span>
      </section>
    </Link>
  )
}
